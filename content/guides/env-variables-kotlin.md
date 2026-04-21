---
title: "Managing environment variables in Kotlin with ease and type safety"
description: Environment variables are always needed when developing some sort of api. This is why I built my own small script to manage and retrieve…
date: 2024-04-23
project: index
tags: [kotlin, backend]
---
Environment variables are always needed when developing some sort of api. This is why I built my own small script to manage and retrieve them with ease, while also keeping type safety.

#### Features
✅ Configuration variables split across Kotlin objects  
✅ Automatic type safety by defining your custom parser  
✅ Support for optional and default values  
✅ Template .env file generation based on Kotlin defined variables  

## Adding dependencies
- [dotenv kotlin](https://github.com/cdimascio/dotenv-kotlin)
- [reflections](https://github.com/ronmamo/reflections)
- [ktor-utils-jvm](https://mvnrepository.com/artifact/io.ktor/ktor-utils-jvm)
- [optional] A logger, I recommend [KotlinLogging](https://github.com/oshai/kotlin-logging)

## Creating the required annotations
We are gonna use reflections to detect the environment variables that need to be read.  
To make life easier we are gonna create our own annotations for that.  

 The first one will be used to annotate the Kotlin objects that contain the variables, it accepts a prefix string which we'll use later:  
```kotlin
@Target(AnnotationTarget.CLASS)
annotation class Configuration(
    val prefix: String,
)
```

While the second is for the actual variables, it accepts a name and whether that variable can be considered optional:
```kotlin
@Target(AnnotationTarget.PROPERTY)
annotation class ConfigurationProperty(
    val name: String,
    val optional: Boolean = false,
)
```

Here are a couple of configuration objects that use those annotations:
```kotlin
@Configuration("api")
object ApiConfig {
    @ConfigurationProperty("port")
    var port: Int = 8080

    @ConfigurationProperty("cookie.secure")
    var cookieSecure: Boolean = true

    @ConfigurationProperty("session.max.age.in.seconds")
    var sessionMaxAgeInSeconds: Long = 2592000 // 30 days by default

    @ConfigurationProperty("admin.key")
    lateinit var adminKey: String
}
```
```kotlin
@Configuration("application")
object ApplicationConfig {
    @ConfigurationProperty("log.level")
    var logLevel: Level = Level.INFO
}
```

As you can see we can use Kotlin types directly and even assign default values to these properties. If you don't wanna assign a default value you can also make it lateinit.

## Creating the environment reader
We do need to read enviornment variables somehow. In my case I used the dotenv library mentioned in the dependencies, but the good part is that you are free to use anything else.  
What's important is that you provide a function that conforms to the required signature, which is the following:
```kotlin
val configurationReader: (key: String, clazz: KClass<*>) -> Any?
```
The function we need to create receives a key for the env variable we are looking for and a `KClass` that indicates the type of the variables we are excepting.  

Let's fullfil this real quick, first lets create our dotenv instance, which by default looks for a `.env` file and fallsback to the System env vars:
```kotlin
private val dotenv: Dotenv? =
    try {
        dotenv()
    } catch (_: DotenvException) {
        log.info { ".env file not found, using System environment variables" }
        null
    }
```

Now the actual function:
```kotlin
/**
  * Reads a value with the specified [key] from the environment, according to the [type]
  */
fun read(key: String, type: KClass<*>, ): Any? {
    val value: String? = dotenv?.get(key) ?: System.getenv(key)

    return try {
        when (type) {
            String::class -> value
            Int::class -> value?.toInt()
            Long::class -> value?.toLong()
            Boolean::class -> value?.toBoolean()
            Level::class -> {
                try {
                    value?.uppercase()?.let { Level.valueOf(it) }
                } catch (_: IllegalArgumentException) {
                    throw IllegalArgumentException(
                        "Tried to read a value of type 'Level' for key '$key' but casting failed, value: $value",
                    )
                }
            }
            else -> throw UnsupportedOperationException(
                "Configuration reader required to read a value of type $type for key '$key' but no casting is implemented for that type",
            )
        }
    } catch (e: NumberFormatException) {
        log.error { "Could not cast a value with key '$key' in configuration reader, see following exception" }
        throw e
    }
}
```
As you can see we read the value using dotenv and then parse it depending on the received `type` parameter!

## Creating the bridge to our Kotlin objects
<script src="https://gist.github.com/Giuliopime/6c1809c6dbc244d85f44350d704d2892.js"></script>

This class receives two parameters:
- the package that contains out Kotlin configuration objects
- the function used to read values from the environment

It then provides two functions:
- `listConfigurations` that gives back all the detected configuration variables and their info
- `initialize` which actually reads values and loads them into our objects

The code is commented so I'll limit the explanation here but the bullet points regarding how it functions are:
- initialize the reflections library using the provided package name
- read all classes (objects in our case) annotated with the `Configuration` annotation
- validate the object
- read all its properties and for each
    - filter only the ones annotated with `ConfigurationProperty` (warn in case it's missing)
    - throw if any is declared as immutable
    - create the key to pass to our reader function by combining the `Configuration` `prefix` value and the `ConfigurationProperty` `name`.
    - detect the `KClass` of the variable
    - pass the ball to our reader function and get back the read value, if that returns null we try to use the default value of the variable if existing
    - if we got a null value and the variable isn't marked as nullable we throw or return depending on the `optional` property.
    - type check
    - set the value on the Kotlin object

## Putting it together
Where we start out application we simply need to put the following now:
```kotlin
val configInitializer = ConfigurationManager(
    packageName = ConfigurationManager.DEFAULT_CONFIG_PACKAGE,
    configurationReader = ConfigurationReader::read
)

configInitializer.initialize()
```
(`ConfigurationReader` is an object that contains my reader function)

We can now freely use our env variables like so:
```kotlin
println(ApiConfig.port)
```
✅ type safety  
✅ auto completion  
✅ globally accessible  
✅ DX happiness  

## Automatically generating our .env file
Let's take this one step further. We don't wanna double our jobs and have to create both our Kotlin objects and .env file. Let's generate the .env file automatically!  

Here is a small script (you can put this in a separate module) that does this for us:
```kotlin
/**
 * Script that generates a template .env file based on the declared @Configuration objects
 */
fun main() {
    val configs = ConfigurationManager(
        packageName = ConfigurationManager.DEFAULT_CONFIG_PACKAGE,
        configurationReader = ConfigurationReader::read
    ).listConfigurations()

    val folder = createScriptOutputsFolderIfNotExisting()
    val file = File(folder, ".env.template")
    file.writeText(configs.joinToString("\n") { it.toString() } )
}
```
If we run this we get the following `.env.template` file:
```
# Level
APPLICATION_LOG_LEVEL=INFO
API_ADMIN_KEY=
# Boolean
API_COOKIE_SECURE=true
# Int
API_PORT=8080
# Long
API_SESSION_MAX_AGE_IN_SECONDS=2592000
```

## Sources and mentions
You can find a full sample [in my repo](https://github.com/Giuliopime/do-too/tree/main/do-too-api/src/main/kotlin/app/dotoo/config)!  


Feel free to also checkout the new Apple Pkl library which seems quite handy and powerful too https://pkl-lang.org/index.html ^^  

*Originally made for [Index](https://index-it.app)*