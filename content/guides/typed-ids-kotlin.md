---
title: Never pass the wrong ID again, typed IDs in Kotlin
description: Ever debugged some features in your app, got to query the database or cache only to find out you were passing the wrong ID to some function or logic. Well you can drastically reduce the occurrence of this situation with typed IDs, and here is how I implemented them for my app backend in Kotlin.
date: 2026-05-12
project: index
tags: [kotlin, backend]
---

Ever debugged some features in your app, got to query the database or cache only to find out you were passing the wrong ID to some function or logic?  
Well you can drastically reduce the occurrence of this situation with typed IDs, and here is how I implemented them for my app backend in Kotlin.

### creating the type

It's actually quite symple, we first need a Kotlin type that can identify an ID.  
In my case I used UUIDs in my app, so I implemented typed IDs with UUID values, but you can modify them to support any kind of ID values (for this I highly suggest [this article](https://brandur.org/nanoglyphs/026-ids) by [brandur](https://brandur.org)).  

Let's jump in the code:
```kotlin
// you could technically skip declaring this ID interface
interface Id<T> {}

// this class is our ID type.
// it's called IxId because the app name is Index
data class IxId<T>(val id: UUID) : Id<T> {
    constructor(id: String) : this(UUID.fromString(id))

    override fun toString(): String {
        return id.toString()
    }
}
```

this is just a wrapper type at the end, and using it is super straight forward:
```kotlin
@Serializable
data class TaskData(
    @Contextual val id: IxId<TaskData>,
    @Contextual val user_id: IxId<UserData>,
    @Contextual val item_id: IxId<ItemData>? = null,
    val name: String,
    ...
)
```

this class represent a todo that gets stored in the Postgres database of my app, and you can see how it requires a bunch of different IDs.  

then in my DAO I have methods related to that class that require different IDs depending on the end goal, for example:
```kotlin
suspend fun getAllCompleted(userId: IxId<UserData>): List<TaskData> {
    return taskDBI.getCompleted(userId)
}

suspend fun getAllConnectedToItem(itemId: IxId<ItemData>): List<TaskData> {
    return taskDBI.getConnectedToItem(itemId)
}
```

if we were not to use typed IDs, all function arguments would have been `String` or `UUID` and it would be super easy to pass the wrong ID to them, while in this way I get type checks by the LSP directly when calling that function:  
```kotlin
/**
 * Gets all the tasks of a user with an optional completion filter.
 *
 * Tag: tasks
 *
 * Security: session
 */
get<TasksRoute> {
    val userId = userIdFromSessionOrThrow()

    val tasks = when (it.completed) {
        true -> taskDao.getAllCompleted(userId)
        false -> taskDao.getAllUncompleted(userId)
        null -> taskDao.getAll(userId)
    }

    call.respond(tasks)
}
```

### making a generator
we need a way to generate those IDs though, so I made a small utility class for it.
```kotlin
class IxIdGenerator : IdGenerator {
    // the type of the ID itself
    override val idClass: KClass<out Id<*>> = IxId::class

    // the type of the value that the ID class wraps
    override val wrappedIdClass: KClass<out Any> = UUID::class

    override fun <T> generateNewId(): Id<T> = IxId(UUID.randomUUID())
}

interface IdGenerator {
    ...

    /**
     * Create a new id from its String representation.
     */
    fun create(s: String): Id<*> =
        idClass
            .constructors
            .firstOrNull { it.valueParameters.size == 1 && it.valueParameters.first().type.classifier == String::class }
            ?.call(s)
            ?: error("no constructor with a single string arg found for $idClass}")

    ...
}
```

you can see that I abstracted it using a generic `IdGenerator`.  
I use the `create()` method later on in the serializer, it might seem complicated at first but it simply:
1) gets the constructors of the ID class we provide it with
2) finds the first contructor that requires only 1 argument where its type is `String`
3) tries to instantiate the class using that constructor

you can also have utility functions if you want something simpler:
```kotlin
fun <T> newIxId() = IxId<T>(UUID.randomUUID())
```

or even a String extension for UUID IDs:
```kotlin
/**
 * @throws IllegalArgumentException if the string is not a valid UUID
 */
fun <T> String.toIxId() = IxId<T>(this)
```

### serialization
you might have noticed the `@Contextual` annotation on the ID fields in the data classes.  
that's because we need to serialize and deserialize them, since I'm serving a REST API.  

In my project I use [kotlinx-serialization](https://github.com/kotlin/kotlinx.serialization) so I created an extension module for it:
```kotlin
val IdKotlinXSerializationModule: SerializersModule by lazy {
    SerializersModule {
        contextual(IxId::class, IxIdSerializer())
    }
}

private class IxIdSerializer<T : IxId<*>> : KSerializer<T> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("IdSerializer", PrimitiveKind.STRING)

    @Suppress("UNCHECKED_CAST")
    override fun deserialize(decoder: Decoder): T = IxIdGenerator().create(decoder.decodeString()) as T

    override fun serialize(
        encoder: Encoder,
        value: T,
    ) {
        // this works because we override the toString() method in `IxId`
        encoder.encodeString(value.toString())
    }
}
```

I then registered the module in my Ktor plugin:
```kotlin
fun Application.configureSerialization() {
    install(ContentNegotiation) {
        json(
            Json {
                serializersModule = IdKotlinXSerializationModule
                ignoreUnknownKeys = true
                encodeDefaults = true
            },
        )
    }
}
```

just like that you can serialize and deserialize your ID types by appending a `@Contextual` annotation to them.  


hope that was useful to you, next up is making them display cleanly in OpenAPI spec and even further I would love to start using prefixed IDs like Stripe does.
