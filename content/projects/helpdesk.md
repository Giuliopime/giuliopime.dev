---
title: HelpDesk
description: Discord bot that provides FAQ like system for your discord
date: 2021-08-06
major: false
tags: [kotlin, influxDB, MongoDB]
links: [
  {title: 'github', url: 'https://github.com/giuliopime/helpdesk'},
  {title: 'reviews', url: 'https://top.gg/bot/739796627681837067#reviews'}
]
---
My first Kotlin Discord bot, built in 2 days, to provide FAQ-like system to your Discord.  

The data layer uses a combination of databases:
- MongoDB for persisting settings
- Redis to cache frequently used Q&A setup by the users
- InfluxDB to store queriable metrics

I also setup up a webhook system that would deliver me errors the bot encountered directly in a Discord channel.