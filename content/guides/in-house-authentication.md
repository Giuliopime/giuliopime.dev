---
title: Implementing user authentication for a Ktor backend
description: How I implemented user authentication for my service without third-party tools
date: 2024-11-15
project: index
tags: [kotlin, backend, ktor, authentication]
---

One of the first challenges I encountered when building [Index](https://index-it.app) was authentication.  
I saw lots of different services for it, but since I knew I was building a backend anyway, I choose to implement auth myself.  

After all, it's pretty simple, and in this article I'm sharing how I coded the following:
- auth session management
- email and password registration
- email verification
- email and password login
- password reset logic
- password forgotten logic

## Session management: cookies or JWT?
After a lot of research, I decided to use cookies to manage the authentication status of my users.  
Specifically, I use http-only secure cookies and only store a session ID inside them.  

This is the cookie format:
```kotlin
@Serializable
data class UserSessionCookie(
    @Contextual val session_id: DtId<UserAuthSessionData>,
    @Contextual val user_id: DtId<UserData>,
) : Principal
```
> where `DtId` is an ID wrapper, it's a simple string under the hood

The main advantage here is that it allows me to revoke specific sessions based on the criterias relevant to me, and it's also extremely fast since I store the basic auth info needed on most API calls in Redis, with the session ID as the key.  
Here is what I store in Redis:
```kotlin
@Serializable
data class UserAuthSessionData(
    @Contextual val id: DtId<UserAuthSessionData>,
    @Contextual val userId: DtId<UserData>,
    val iat: Long,
    val deviceName: String?,
    val ip: String,
) : Principal
```
The `id` is the `session_id` of the cookie, and it's used as a Redis key in combination with the `userId`, as follows `{userId}:{sessionId}`.  
This is really important because it allows me to delete specific sessions (for example when the user logs out) or to also delete all the sessions of the user, by calling delete in Redis with `{userId}:*` as key, so "wildcarding" all specific session ids.  

I do store the issued-at timestamp (`iat`), device name and ip because I plan to allow the user to see all the devices on which he is logged in, and to revoke specific logins.  

Authentication and authorization is made through Ktor.  
I first needed to configure the Sessions plugin:
```kotlin
install(Sessions) {
  cookie<UserSessionCookie>("user_session_id") {
    cookie.path = "/"
    cookie.maxAgeInSeconds = ApiConfig.sessionMaxAgeInSeconds
    cookie.secure = ApiConfig.cookieSecure
    cookie.httpOnly = true
    cookie.extensions["SameSite"] = "None"

    serializer = KotlinxSessionSerializer(
      Json {
        serializersModule = IdKotlinXSerializationModule
      },
    )
  }
}
```
> to be able to test locally I have an environment variable for the secure property of the cookie.

Then I created an authentication method for it:
```kotlin
session<UserSessionCookie>(AuthenticationMethods.USER_SESSION_AUTH) {
    validate { userSessionCookie ->
        val session = userSessionDao.get(userSessionCookie.user_id, userSessionCookie.session_id)

        // If there is no session or if it has expired
        if (session == null || (DatetimeUtils.currentMillis() - session.iat) >= (ApiConfig.sessionMaxAgeInSeconds * 1000)) {
            null
        } else {
            session
        }
    }
    challenge {
        call.respond(HttpStatusCode.Unauthorized)
    }
}
```
Here the `session` returned is the `UserAuthSessionData` shown before. I made a simple extention function so we can always access it after the user has been authenticated:
```kotlin
fun PipelineContext<Unit, ApplicationCall>.authSessionData(): UserAuthSessionData? = call.principal<UserAuthSessionData>()
fun PipelineContext<Unit, ApplicationCall>.authSessionDataOrThrow(): UserAuthSessionData = authSessionData() ?: throw AuthenticationException()
```

Here as an example, the logout route is protected through authentication:
```kotlin
fun Route.userRoutes() {
    authenticate(AuthenticationMethods.USER_SESSION_AUTH) {
        logoutRoutes()
    }
}

// where logoutRoutes is defined as
fun Route.logoutRoutes() {
    val userSessionDao by inject<UserSessionDao>()

    get<LogoutRoute> {
        val session = authSessionDataOrThrow()

        userSessionDao.delete(session.userId, session.id)

        call.sessions.clear<UserSessionCookie>()
        call.respond(HttpStatusCode.OK)
    }
}
```

## User registration
This is pretty straight forward:
- check if a user with that email already exists
- validate password strength
- create user
- send email verification

```kotlin
post<RegisterRoute> {
    val signupData = call.receive<RegistrationCredentials>()

    val existingUser = userDao.getFromEmail(signupData.email)

    if(existingUser != null) {
        if (UserAuthUseCase.isIncompleteAccountOutdated(existingUser)) {
            userDao.delete(existingUser.id)
        } else {
            call.respond(HttpStatusCode.Forbidden)
            return@post
        }
    }

    val hashedPassword = passwordEncoder.encode(signupData.password)
    val user = UserData(
        id = newDtId(),
        email = signupData.email,
        passwordHash = hashedPassword,
        emailVerified = false,
        creationTimestamp = DatetimeUtils.currentMillis()
    )

    userDao.create(user)

    val emailSent = EmailVerificationUseCase.createAndSend(user)

    if (emailSent) {
        // User will need to verify its email
        call.respond(HttpStatusCode.OK)
    } else {
        call.respond(HttpStatusCode.Created)
    }
}
```
The credentials are validate automatically thanks to our Ktor validation plugin, I use the following email and password regex with a check on the password length (must be between 8-100 chars range):
- email: `\w+@\w+\.\w+`
- password: `(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*`

When checking if a user with that email already exists, me delete the existing user if he didn't yet verify his email and more than 7 days are passed (this is done inside the `isIncompleteAccountOutdated` function).  

The most important step here is **password hashing**. We do not wanna store to plain password in our database!  
We also mark the user email as not-verified so we are able to deny login attempts until it's verified.  

The `passwordEncoder` used here is the following:
```kotlin
class PasswordEncoder {
    private val bcryptPasswordEncoder = BCryptPasswordEncoder()

    fun encode(password: String): String = bcryptPasswordEncoder.encode(password)

    fun matches(
        rawPassword: String,
        encodedPassword: String,
    ) = bcryptPasswordEncoder.matches(rawPassword, encodedPassword)
}
```
where `BCryptPasswordEncoder` is from the [Spring Security module](https://mvnrepository.com/artifact/org.springframework.security/spring-security-crypto).

## Email verification
I decided to use [Brevo](https://www.brevo.com) for this but there are many other transactional email services out there for you to choose.  
I wont go in details into the API calls needed to send emails via Brevo (which you can still see from the [source code on my GitHub](https://github.com/Giuliopime/do-too)), I will instead show the logical flow for the email verification to work.  

We first send an email containing a clickable link to our API with a token, something like `https://api.index-it.app/verify-email?token={url_encoded_token}`.  
We must also store that token to be able to perform verification when the user clicks that link, so we hash it and store it in the database, with a couple of other values:  
```kotlin
object EmailVerificationTable : IntIdTable() {
    val token = varchar("token", 100).uniqueIndex()
    val user = reference(
        name = "id_user",
        foreign = UsersTable,
        onDelete = ReferenceOption.CASCADE,
    ).index()
    val created_at = timestamp("created_at")
    val expires_at = timestamp("expires_at")
}
```

When the user clicks the link, our API gets called, and we get the token from the URL, hash it and get an entity from our database with that hashed token.  
Find the user with the id stored along the token, and mark its email as verified.  
You can see that I have some environment variables used to choose where to redirect the user when the verification is successful or not. This is needed to show a valid html page to the user after he clicks the link in the email (in Index I simply link to a specific page of the web-app that shows them a success / error screen).  
```kotlin
get<VerifyEmailRoute> { request ->
    // here the token gets hashed by the dao
    val emailVerificationDto = emailVerificationDao.get(request.token)
        ?: return@get call.respondRedirect(BrevoConfig.emailVerificationErrorUrl)

    val userDto = userDao.get(emailVerificationDto.userId)
        ?: return@get call.respond(HttpStatusCode.BadRequest)

    // Check if user is already verified
    if (userDto.emailVerified) {
        return@get call.respondRedirect(BrevoConfig.emailVerificationSuccessUrl)
    }

    userDao.verifyEmail(userDto.id)
    emailVerificationDao.deleteAllOfUser(userDto.id)
    call.respondRedirect(BrevoConfig.emailVerificationSuccessUrl)

}
```

I also have a couple other routes useful for my frontends, one to send a new verification email (which just repeats the process described previously) and another for checking whether the email has been verified.  
I will show their usage in a following frontend authentication article.  

## User login
Here is what my route looks like:
```kotlin
post<LoginRoute> {
    val loginData = call.receive<LoginCredentialsData>()
    val user = userDao.getFromEmail(loginData.email)
        ?: throw AuthenticationException()

    if (!passwordEncoder.matches(loginData.password, user.passwordHash)) {
        throw AuthenticationException()
    }

    if (!user.emailVerified) {
        return@post call.respond(HttpStatusCode.MethodNotAllowed)
    }

    val userSessionId = userSessionDao.create(
        userId = user.id,
        device = call.request.userAgent(),
        ip = call.request.origin.remoteAddress
    )

    call.sessions.set(userSessionId)
    call.respond(user.getResponseDto())
}
```
The user provides its email and password in the body of the request, and we get the user matching that email.  
We compare the hashed password stored in our database with the provided one, by hashing it too.  
We also make sure the user email has been verified before creating a session for it, which we send to him as a cookie (this is done by `sessions.set()` in Ktor).  

## Password forgotten
The password reset logic is really similar to the email verification, to initiate it the user requests a password reset via a simple API call.  

We then create a token, as we did for the email verification, and send an email with instructions on how to reset the password.  
I've put a clickable link in the email that sends the user to my web-app along with the token. The web-app prompts the user for a new password, and sends it to the backend with the token it received from the email.  
The backend then simply checks the token, db checks it, and stores the new password for the user.  

```kotlin
fun Route.passwordOperationRoutes() {
    val userDao by inject<UserDao>()
    val userSessionDao by inject<UserSessionDao>()
    val passwordResetDao by inject<PasswordResetDao>()
    val passwordEncoder by inject<PasswordEncoder>()
    val brevoClient by inject<BrevoClient>()

    get<PasswordForgottenRoute> { request ->
        val user = userDao.getFromEmail(request.email)
            ?: return@get call.respond(HttpStatusCode.NotFound)

        if (passwordResetDao.isUserRateLimited(user.id)) {
            return@get call.respond(HttpStatusCode.TooManyRequests)
        }

        val sentEmail = PasswordResetUseCase.createAndSend(user)

        if (sentEmail) {
            call.respond(HttpStatusCode.OK)
        } else {
            call.respond(HttpStatusCode.InternalServerError)
        }
    }

    post<ResetPasswordRoute> { request ->
        val passwordResetDto = passwordResetDao.get(request.token)
            ?: return@post call.respond(HttpStatusCode.NotFound)

        val user = userDao.get(passwordResetDto.userId)
            ?: return@post call.respond(HttpStatusCode.NotFound)

        val newPassword = call.receive<PasswordResetRequestBody>().password
        val newPasswordHashed = passwordEncoder.encode(newPassword)

        // If the user email wasn't verified before, now it can be considered verified
        userDao.resetPassword(
            id = passwordResetDto.userId,
            newPasswordHashed = newPasswordHashed,
            verifyEmail = true
        )

        // Invalidate all other user active sessions
        userSessionDao.deleteAllOfUser(passwordResetDto.userId)

        brevoClient.sendPasswordResetSuccessEmail(user.email)

        call.respond(HttpStatusCode.OK)
    }
}
```

A couple of side notes:
- when the user resets the password, we mark its email as verified as it's assured the user did the whole process by opening the email.
- we send an email indicating the password reset (good practice for security)
- we invalidate all existing auth sessions of the user

## Conclusions
It's for sure not simple and it takes a bunch of time to implement all of this yourself the first time you do it, but I think it's extremely useful to know how to implement auth yourself without third-party services.  
Plus, when you do it once, it's really simple to duplicate it on future projects.  

I hope this article was useful to you, here is a link at the source code of all of this:  
https://github.com/Giuliopime/do-too  

Happy coding!