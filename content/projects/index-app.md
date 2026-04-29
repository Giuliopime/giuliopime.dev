---
title: Index
description: yet another (native) lists & tasks iOS + web app
date: 2026-04-11
major: true
tags: [Ktor, RabbitMQ, SwiftUI, Firebase]
links: [
  {title: 'website', url: 'https://index-it.app'},
  {title: 'app_store', url: 'https://index-it.app/appstore'},
  {title: 'discord', url: 'https://index-it.app/discord'}
]
---

By far one of my most wide-scope project technical wise.  
It's an application to store your tasks & lists (yes I know there are hundreds) with a UI particularly inspired by [Actions](https://bonobolabs.com/actions/) (previously from Moleskine, now independent).  

I really loved the UI/UX of that app, but it didn't feel fully as I wanted, so I built a lists app that worked for me specifically.  
The original plan was to have it **everywhere**: web, iOS, Android, browser extension, Discord bot, and whatever else comes up to your mind.  
Then after spending months building the Android app natively with Jetpack Compose new, flagship, full-of-beta-warnings-and-opt-ins, framework, I realized the amount of time that a properly done todo app requires.  

I managed to ship an early Android app on the Play Store, back to when I was still on Android, which meant that I also built a backend API in Kotlin.  

While the Android app was straight forward as it followed latest Google best-practices, the backend was a combination of services that came out really well:
- [ktor](https://ktor.io) rest APIs, fully OpenApi documented
- Postgres as the main DB
- Redis for caching hot data such as authentication (I built my own auth system from scratch too)
- RabbitMQ to create a scalable system of real-time data for the app using websockets 
- Sendblue to send auth-related emails (password reset / forgotten flows)
- RevenueCat to manage the user subscription
- Google Cloud Tasks and Firebase for todo reminder's notifications
- BigQuery for statistics

I then setup CircleCI to automatically build the docker image on every commit, and then I have an IaC ArgoCD-compatible repo that deployed all the services needed to my kubernetes cluster (including Postgres and Redis).  


After a bit of time though I switched to an iPhone (the 13 mini, 'cause I don't stand big phones, wishing Apple will make another one in the future) so I started building a native iOS app too.  
That is now complete and available on the App Store, I built it fully using SwiftUI, and it has:
- extensive integration with the iOS system:
  - Siri support
  - Widgets
  - Shortcuts
  - Share Sheet extension
- offline-read support
- real-time updates via websockets, useful for shared lists
- yes shared lists too


I'm now onto building a minimal web-app, but I don't know how long that'll take as I got a bit burned out with this particular project, it required a lot of effort and seen the current market for those kind of apps, not a lot of feedback from the end users.  
Maybe it will be my playground for agentic coding who knows.  

I encountered a lot of complex challenges though with this project, from backend stuff such as the auth system to building a UI for the recurring reminders.  
I often write about them in my guides.