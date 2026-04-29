---
title: My experience building a desktop menu bar app with Kotlin multiplatform
description: Challenges and discoveries of building a native desktop app using Kotlin multiplatform
date: 2023-12-28
project: zenbreak
tags: [project, dev]
---
Not so much time ago, Jetbrains announced an interesting [contest for students](https://kotlinconf.com/contest/). The goal was to build a Kotlin multiplatform app and the winners would receive a trip to KotlinConf 2024!  
I thought that was a fantastic opportunity so here is how my attempt at it went.  

![captionless image](https://miro.medium.com/v2/resize:fit:3840/format:webp/1*_N1hPB0nuWr2HHvbPA7Epg.png)

The idea
--------

I was getting eye strain for coding too much late at night (I later found out I just needed glasses instead), so I looked up some desktop break timer apps and found that most of them were made in Electron, and since my laptop was pretty old I couldn’t afford having a whole Electron app running in the background all the time.  

So here comes my idea: **ZenBreak**, a break timer app.  
I basically wanted to create a similar app to [BreakTimer](https://breaktimer.app/) but native, yet multiplatform!  
The requirements were:  

*   having a settings window to edit the various settings, like frequency of the breaks, duration of them, the style of the break popup, etc…
*   having a popup window, that would show when the break starts

**The building process**
------------------------

I started off looking trough some examples and tutorials from the [Compose multiplatform](https://github.com/JetBrains/compose-multiplatform) library, choose a template, opened AndroidStudio and started coding!  
I created a shared-core module which would contain my shared logic of the app between all platforms. The most useful libraries that I used there were [koin](https://insert-koin.io) for DI and [multiplatform-settings](https://github.com/russhwolf/multiplatform-settings) for storing user settings.  

I initially thought I would be able to build everything with compose multiplatform and started working on the desktop app with that, but after playing around with window management I figured out it wasn’t powerful enough to make great looking popups on macOS.  

So, I split the shared-core module into multiple ones:  

*   shared-core: shared logic of the app
*   shared-compose-core: shared foundations for the compose ui
*   shared-compose-settings: compose ui for managing the app settings
*   shared-compose-popup: compose ui for the break window that pops up when a break starts

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*PkyYi_c2sGL44DYy97qgMg.png)

> I created those separate modules to make it future proof in case I wanted to build an Android app too

The desktop app now worked perfectly fine, at the end it just consisted of a few dependencies in the Gradle files to make it work.  
Here is how one of its windows looked:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ScpwNDejaEIQ_RPk8K8xIQ.png)

### Building the macOS app

It was time for the trickier part, using the Kotlin shared-core module from a Swift project.

I played around with it by building everything locally and developed the ui for the macOS app. One repo that helped me a lot was [TomatoBar](https://github.com/ivoronin/TomatoBar), an open source pomodoro timer app for macOS only, since I had no experience with Swift before this, it really got me going faster when doing window managment logic.  

The first issue I encountered was consuming kotlin state flows from swift, and after reading a bunch of articles from [John O’Reilly](https://johnoreilly.dev/) (thank you for those!) I ended up using [KMP-NativeCoroutines](https://github.com/rickclephas/KMP-NativeCoroutines)

A thing I had to do unfortunately was to create swift bindings myself for the various settings of the app, since I didn’t find a more concise way to achieve settings binding for the ui  

```swift
private var message: Binding<String> { Binding(
    get: {
        viewModel.settings.breakMessage
    },
    set: { message in
        viewModel.setBreakMessage(message: message)
    }
)}
```

Building the user interface with SwiftUI has really been a pleasure though and I finished it pretty quickly, here is what it looked like:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*_AhkpYXBvkaQsuI2fUxtQg.png)

CICD
----

This was the hardest part of building the app, and it’s still incomplete.

The most important thing was being able to publish the shared-core module as a swift package, and I did so using [KMMBridge](https://github.com/touchlab/KMMBridge).  
Basically I added the following in the build.gradle.kts file of the module after adding the dependency:

```kotlin
addGithubPackagesRepository()
kmmbridge {
    frameworkName.set("ZenBreakCoreKit")
    spm()
    mavenPublishArtifacts()
}
```

And then created a GitHub action that I could manually trigger to publish the Swift package on GitHub Packages:

```yaml
name: Release ZenBreakCoreKit
on: [workflow_dispatch]
jobs:
  call-kmmbridge-publish:
    permissions:
      contents: write
      packages: write
    uses: touchlab/KMMBridgeGithubWorkflow/.github/workflows/faktorybuildautoversion.yml@v1.0
    with:
      jvmVersion: 17
      versionBaseProperty: LIBRARY_VERSION
```

Touchlab really made a great tool, and thanks to that it was really easy in XCode to import that published package into the project!  

After that, I played around a lot, like… a lot, with fastlane to get a great publishing CICD for the desktop and macOS apps, but I couldn’t figure it out and didn’t have more time to spend on that, so that’s missing still!

Publishing
----------

It was finally time to publish the app, for the mac app it was pretty easy, I bought the Apple Developer licence, got onto the dashboard, created the store page, uploaded the app and after a few days it was already available in the App Store!  

For the desktop one, things were a little harder, as I wanted the app to be signed so that users didn’t get that annoying popup when installing telling them that the app was dangerous…  
I found out that the Microsoft Store automatically signed your app and so I went with that, I’ve setup [Conveyor](https://conveyor.hydraulic.dev/) which saved my life for packaging the app properly with a simple gradle dependency and a config file, and then hit upload on the Microsoft Store.  

That took much more time and received many rejections, unexpected ones like not being able to publish the app in China ’cause my support link for the app was a [Discord server](https://discord.gg/MunKMgKAJp), which is banned in that country… yikes  

But at the end the app got approved, wrote a [small website](https://zenbreak.app) using SvelteKit for the first time (let’s say I took some inspiration from the Jetbrains websites haha) did a few Reddit and X posts and… that was it!  
I built my first multiplatform desktop menu bar app using Kotlin multiplatform, and it felt like a big achievement!  

Considerations
--------------

It has been a bit though building the app with Kotlin multiplatform, not because of the tooling or libraries, but because of the documentation. Docs were basically missing and that made me spend a lot of time figuring things out by myself, attempt after attempt, and lets say that having a kotlin module [taking 15 minutes to compile](https://x.com/giuliopime/status/1700636171263475904?s=20) to native didn’t really help xD but I blame my old laptop for that :/  

I do love the modularity that kotlin offers though, being able to build exactly what you need in Kotlin and leaving the rest to native frameworks. That’s what makes Kotlin multiplatform shine to me!  

If you are interested in the app you can find it on [zenbreak.app](https://zenbreak.app), or on [GitHub](https://github.com/Giuliopime/ZenBreak).  

Unfortunately I wont be able to participate to the contest prize because Italy is excluded as a country :/  
I hope that in a future contest this will not be the case anymore as I would have loved to meet other Kotlin fans from all around the world!