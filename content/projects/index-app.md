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
It's an application to store your tasks & lists (yes I know there are hundreds) with a UI particularly inspired by [Actions](https://bonobolabs.com/actions/).  
I really loved the UI/UX of that app, but it didn't feel fully as I wanted, so I built a lists app that worked for me specifically.  

The original plan was to have it everywhere: web, iOS, Android, browser extension, Discord bot, and whatever else comes up to your mind.  
Then after spending months building the Android app natively with Jetpack Compose new, flagship, full-of-beta-warnings-and-opt-ins, framework, I realized the amount of time that a properly done todo app requires.  

I managed to ship an early Android app on the Play Store, back to when I was still on Android.  
The Android app architecture was pretty standard as it followed latest Google best-practice, here is the big picture:  
![index_android_architecture](/img/blog/index/android_architecture.png)  

And here are some screenshots:  
![index_android_screens_1](/img/blog/index/android_screens_1.png)
![index_android_screens_2](/img/blog/index/android_screens_2.png)  

Some UIs were pretty complicated to build too, for example this date recurrence picker:  
![index_android_recurrence_picker](/img/blog/index/android_date_recurrence_picker.png)  


The app also needed a backend, which resulted in a combination of services that came out really well:
- [ktor](https://ktor.io) rest APIs, fully OpenApi documented
- Postgres as the main DB
- Redis for caching hot data such as authentication (I built my own auth system from scratch too)
- RabbitMQ to create a scalable system of real-time data for the app using websockets 
- Brevo to send auth-related emails (password reset / forgotten flows)
- RevenueCat to manage the user subscription
- Google Cloud Tasks and Firebase for task reminder's notifications
- BigQuery for analytics and statistics

The backend was deployed via CI/CD, I used CircleCI to build a versioned docker image on every commit, and then I have an IaC ArgoCD-compatible [repo](https://github.com/index-it/infra) that deployes all the services needed to my kuberenetes cluster (including Postgres and Redis).  
![argocd_dashboard](/img/blog/index/argocd.png)  

After a bit of time though I switched to an iPhone (the 13 mini, 'cause I don't stand big phones, wishing Apple will make another one in the future) so I started building a native iOS app too.  
That is now complete and available on the [App Store](https://apps.apple.com/it/app/index-lists-tasks/id6743499824?l=en-GB), I built it fully using SwiftUI, and it has:
- extensive integration with the iOS system:
  - Siri support
  - Widgets
  - Shortcuts
  - Share Sheet extension
- offline-read support
- real-time updates via websockets, useful for shared lists
- yes shared lists too

Here are some screenshots and demos from the app:  
![index_ios_screens_1](/img/blog/index/ios_screens_1.png)
![index_ios_screens_2](/img/blog/index/ios_screens_2.png)

Data gets updated in real time on different devices and for different users:  
![websocket_sync_demo.gif](/img/blog/index/websocket_sync_demo.gif)  

And here are some widgets and shortcuts!  
![index_ios_lock_screen_widgets](/img/blog/index/lock_screen_widgets.png)
![index_ios_home_widgets](/img/blog/index/home_widgets.png)
![index_ios_shortcuts](/img/blog/index/shortcuts.png)

I'm now onto building a minimal web-app, but I don't know how long that'll take as I got a bit burned out with this particular project, it required a lot of effort and seen the current market for those kind of apps, not a lot of feedback from the end users.  
Maybe it will be my playground for agentic coding who knows.  

I encountered a lot of complex challenges though with this project, from backend stuff such as the auth system to building a UI for the recurring reminders.  
I often write about them in my guides.