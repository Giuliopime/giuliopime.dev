---
title: Astro
description: a Discord bot for temporary voice channels that serves 150k+ guilds
date: 2020-04-11
major: true
tags: [kotlin, spring-boot, k8s]
links: [
  {title: 'website', url: 'https://astro-bot.space'},
  {title: 'github', url: 'https://github.com/bot-astro'},
  {title: 'reviews', url: 'https://top.gg/bot/715621848489918495#reviews'}
]
---
Astro has been my first project, and unexpectedly also really successful.  

Currently used by ~10k users per day, this has been the project that thanks to its challenges teached me most of what I know about programming.  

It's a simple Discord bot that adds to your server temporary voice channels, which was a popular feature in TeakSpeak that Discord didn't copy for some reason.     

The current tech stack is composed of 4 microservices, all written in Kotlin, running on my kubernetes cluster:  
- the main bot application, uses [JDA](https://github.com/discord-jda/JDA) to interact with Discord and serves a small SpringBoot API to allow communication with the other services  
- the SpringBoot API which serves all the data needed by the frontend dashboard
- a small app which is deployed as a daily job
- another bot application, that helps me manage the [Support Server](https://astro-bot.space/support) of Astro

I have implemented CI/CD so that everytime I commit some code I get all the microservice images built and a simple button to deploy them to the cluster.  

The cluster is managed using Terraform thanks to the amazing [terraform-hcloud-kube-hetzner](https://github.com/mysticaltech/terraform-hcloud-kube-hetzner) project.  
I then have an IaC setup that installs ArgoCD, and sets up everything via that.  

Then there is the frontend dashboard, with which users can manage the settings of the bot for their server.  
That is built in Nuxt and I'm really proud of the UX/UI that I came up with (took inspiration from the [atlas bot](https://atlas.bot)).  

You can find the source code of the [backend](https://github.com/bot-astro/astro), [frontend](https://github.com/bot-astro/astro-bot.space) and [IaC](https://github.com/Giuliopime/gport) on [GitHub](https://github.com/bot-astro).  

For a fully story of the project instead check the related article below!