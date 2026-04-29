---
title: ZenBreak
description: Kotlin Multiplatform desktop menu bar app that reminds you to take breaks (JetBrains contest)
date: 2023-04-11
major: false
tags: [Kotlin Multiplatform, SwiftUI, SvelteKit]
links: [
  {title: 'website', url: 'https://zenbreak.app'},
  {title: 'app_store', url: 'https://apps.apple.com/it/app/zenbreak-focus-timer/id6470151195?l=en-GB&mt=12'},
  {title: 'github', url: 'https://github.com/Giuliopime/zenbreak'}
]
---
This app simply reminds you to take a break from the screen, it has customisable behaviour and appearance to suit everyone needs.  
(*Check out the [website](https://zenbreak.app) for more screenshots*)


This is a [Kotlin Multiplatform](https://kotlinlang.org/docs/multiplatform.html) app, split into different re-usable modules, built for the [Jetbrains Contest](https://blog.jetbrains.com/kotlin/2022/10/join-the-kotlin-multiplatform-contest/) and for personal use!  
The resulting MacOS app is a native XCode project that uses the shared Kotlin-multiplaform data module and popup UI.  
Other than MacOS, the app gets built and made available for Windows and Linux.  

## Inspiration and resources
This project has been inspired by [BreakTimer](https://breaktimer.app).  
I didn't want a js runtime just for a simple menu bar app so I took the opportunity to build ZenBreak ^^  

I've found a few projects that really helped learning the technologies used in this project:
- [John O'Reilly](https://johnoreilly.dev/)  
  thank you so much for all the open source repos of your GitHub and the blog, helped a ton expecially with macOS related stuff!
- [Rick Clephas](https://github.com/rickclephas)  
  amazing Kotlin native libraries 🫶🏼
- [TomatoBar](https://github.com/ivoronin/TomatoBar)  
  great open source macOS menu bar app, gave me a solid base for the macOS app!
- [Conveyor](https://conveyor.hydraulic.dev/)  
  amazing tool to built desktop installers for your app, recommend 💯
- [Touchlab](https://touchlab.co/)  
  great tools for kotlin native, such as [KMMBridge](https://github.com/touchlab/KMMBridge)
- [Kotlin Community](https://kotlinlang.org/community/) of course :>
