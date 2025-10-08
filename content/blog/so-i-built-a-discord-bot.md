---
title: Story and lessons from building a Discord bot that reached 150k servers
description: dummy
date: 2025-09-29
project: astro
tags: [project, dev]
---

it was the 27th of March 2020 when I got intrigued by the temporary voice channels system of the Rocket League discord server.  
so I shot a message to their mods:  
![rocket_league_mods.webp](/img/blog/astro/ab_rocket_league_mods.webp)  
and on the 11th of April I created my first Discord bot.  

we are now 5 full years past that, and I went from a coding a basic javascript application which had me and a couple of friends as its users, to multiple microservices deployed on my own non-managed kubernetes cluster, handled via IaC (Infrastructure-as-Code), to manage more than 10k daily active users for a total count of 11M users in my database.  

but wait, you are probably wondering what even are temporary voice channels, and what is a Discord bot in the first place ([if not good, you can skip this](#the-first-version))…  
basically, Discord is a messaging app (like slack, telegram or whatsapp).  
you can create groups (which we’ll call guilds for the sake of this post), and in each group you can have multiple text channels, and multiple voice channels, which are like calls but you can have many different ones in a single guild.  
consider that Discord has been built initially for gaming communities, so the usual case for a guild is a bunch of people (even 100k) just chatting about (very) weird stuff in the text chats of the guild and a bunch of voice channels, each with some people playing a game together and communicating using the voice chat as if it was a group call.  

Discord exposes some APIs so that you can integrate functions to it.  
usually, you create a Discord application, aka bot, you receive events from Discord (via websockets) and you react by performing some sort of action.  

temporary voice channels is a feature that you can add to your guild, with which you design a voice channel as a “generator”: when a user joins the generator, my bot creates a new voice channel for the user and moves him into it, then once the channel gets empty again, my bot deletes it, keeping the server clean and tidy.  
you can see what the bot does really quick in this video (well I'm making a demo video so this gif will get replaced soon, but settle with that for the moment):  
![ab_temporary_voice_channels_demo.gif](/img/blog/astro/ab_temporary_voice_channels_demo.gif)

### the first version
it would be untrue to say that I had 0 coding experience when I started, because I was taking informatics classes in high school, but I had no idea of how any real software was built and worked.  
I just threw myself into it, and got my first bot online using javascript and the discord.js library.  
of course, initially it was running on my computer, so I had to keep it on 24/7, and to give you an idea of how naive I was, my database was literally a .json file :)  

I soon learned about hosting on a VPS, so I bought one from vultr and copied my code manually with FileZilla onto it (I think the first times I was also copying the `node_modules` black hole).  
for a while, every time I had to update the bot, I would copy the files via SFTP on my server, get into the shell and restart the javascript process.  

I do have really nice memories about that period of development, I was in high school and I was coding 24/7, and then with covid hit, I was coding during online classes too.  
and the good thing is that I was actually using my bot, quite a lot, so it was really cool to tell my friends about new features we could use in our guild and have them play around with the bot.  
here is a little screenshot of what it looked like (and yes it was called HallMaster at the time, I rebranded to Astro later on)
![hall-master-interface](/img/blog/astro/ab_hall_master_interface.webp)

### first mistake and lesson
I did make a lot of mistakes (of course... I had no knowledge!), lots of [crappy code](https://github.com/bot-astro/archived-Hall-Master/) for sure, but the one that I wanna highlight here is about *asking for help*.  
in the beginning, I was asking for *lots* of help in the top.gg discord guild (top.gg is a web catalog of Discord bots), and because my questions were kinda silly I received a lot of "[have you tried googling it?](https://letmegooglethat.com/?q=have+you+tried+googling+it%3F)” which doesn’t feel good when starting out, but is something you 100% *need* to learn.  
instead of reading documentation or stack overflow (yes because chatGPT wasn’t a thing back then, crazy right?), I was looking for a shortcut, and while it’s ok to do it sometimes, that should not be your go-to source of help.  

I wanna mention [Xavin](https://xavin.dev) early on the article because he will come up a lot later on.  
he was the developer of [Hydra](https://hydra.bot), one of the biggest bots on Discord, which at the time was only used for playing music in your voice channels (now things have changed quite a bit since YouTube lawyered up against these music bots).  
besides that, he was one of the nicest guys I've ever met on the internet, and so much of my knowledge comes from him, I truly do not think I would have made it this far without his help, he introduced me to Redis, InfluxDB, BigQuery, SpringBoot, Java, Kotlin, Kubernetes, CI-CD and so much more, I feel so grateful.  
![ab_xavin_redis](/img/blog/astro/ab_xavin_redis.webp)
![ab_xavin_timeseries.webp](/img/blog/astro/ab_xavin_timeseries.webp)  
buut… initially I was kinda abusing that too, I was also asking questions about how he did stuff to be able to implement it in my bot, and kinda wanted to be spoon-fed.  
he was super nice because very early on, he told me, and made me understand that I was approaching things the wrong way:
![ab_xavin_form_your_own_opinion](/img/blog/astro/ab_xavin_form_your_own_opinion.webp)  

from that point on, I shifted my mentality, tried to come up with my own solutions and figure stuff out by doing my own research.  

on a side note, I do believe that if AI had been there, I would not have learned as much as I did, so to those getting started, use AI as a browser engine, not as a replacement of your brain please, you will thank yourself in the future.  

### growing, feedback and donations
at that time, [top.gg](https://top.gg) had a huge amount of traffic, and I managed to get on their front-page for some time, thanks to people voting for my bot.  
this gave me a lot of visibility, and the bot started to grow.  
I also managed to set up some statistics using InfluxDB, so I had some very aesthetically pleasing view of how the bot was doing:  
![ab_influx_stats.webp](/img/blog/astro/ab_influx_stats.webp)
![ab_voice_channels_stats_influx](/img/blog/astro/ab_voice_channels_stats_influx.webp)  

I started receiving lots of feedback, and you can see some of it [on the bot top.gg page](https://top.gg/bot/715621848489918495) in the reviews section.  
then one day, and I remember it vividly, I received my first donation of $11 from a guy named RedGinor (thank you again <3).  
![ab_redginor_donation.webp](/img/blog/astro/ab_redginor_donation.webp)
![ab_redginor_donation_2.webp](/img/blog/astro/ab_redginor_donation_2.webp)  

I saw the bot was gaining new users every day but I didn’t really think it would be making money at all, but after that more followed, and I started tracking them in an Excel file.  
![donations-excel](/img/blog/astro/ab_balance_excel.webp)  
so in a bunch of days, I set up a premium version of the bot for those who donated, and the activation process for it was all manual on my end, no fancy stripe integrations or anything. I was logging in the excel the donations and modifying a fancy `.env` file updating the list of premium guilds.  

only after a while I set up a proper Patreon page, which lacked a lot in terms of API at the time, and later on moved to Chargebee, Stripe and PayPal (well Patreon was also my only option because I wasn’t even 18 back then so I literally could not open a PayPal account).  

### first contract and infrastructure bottlenecks
everything was going really well, the bot was growing steadily:  
![bot-growth](/img/blog/astro/ab_60k_guilds_stats.webp)  
with the money I was making I was able to pay for the VPS and thanks to people voting for my bot on top.gg, I could participate in ads auctions: I was betting on ads spots and it was really fun, you needed to consider whether the amount of visibility you would be getting was worth the money put into the bet, and I had some cool “fights” with one of my competitors:  
![tempvoice-auctions](/img/blog/astro/ab_topgg_auctions_tempvoice.webp)  
it was really cool seeing Astro being used in actually big guilds, like the official Overwatch, Elden Ring and Tekken guild, just to name a few.  

I then signed up to a Discord beta program about *premium apps*, which would allow users to pay for the premium version of the bot directly inside Discord using their payment system.  
I honestly wasn’t expecting much from it, but I actually got an email from Mason, at the time a Product Manager from Discord, asking for a call to figure whether I would be a great fit for the beta phase.  
well, a month later that email I signed an actual contract (can’t disclose much about it unfortunately), I really went from making a Discord bot for my friend’s Discord, to signing an NDA, I had no words for it at the time…  
this also lead me to contribute to the [JDA](https://github.com/discord-jda/JDA) project, a library to interact with Discord in Java, which though me about open source contribution and its best practices (you can find my PR [here](https://github.com/discord-jda/JDA/pull/2583)).  

it also seamed that the Discord team really liked my bot, as they decided to showcase it in their new “bots gallery” (aka App Directory)
![app-directory](/img/blog/astro/ab_app_directory_feature.webp)
and also used it as an example when talking to other developers:  
![xavin-astro-guild-join-message](/img/blog/astro/ab_guild_join_msg.webp)

thennn, bottlenecks started arising. I already migrated from javascript to Kotlin, but my bot was still running on a single process, and it was hella painful.  
each restart for even a small update was taking 10+ minutes (which is 10+ minutes of downtime) and the Java Garbage Collector, started to complain too. this resulted in lots of painful debugging, heck I even tried remote debugging, won't wish you that.  
![ab_java_gc.webp](/img/blog/astro/ab_java_gc.webp)

luckily, Xavin was there to help.  
he was super stocked about the bot features, he even proposed to buy it! we eventually came to a deal to work on it together, me him and [rxsto](https://rxs.to), who was another super talented front-end dev working on Hydra’s website.  
so, he got me into kubernetes, and after a while, and some help setting up the k8s cluster using Pulumi (an infrastructure as code tool), I had my bot running in my own Kubernetes cluster, deployed on Hetzner servers.  

one disclaimer: kubernetes has a steep learning curve, and small mistakes can lead to hours upon hours of debugging (lots of sleepless nights). so only use it when you need to.  
in my case, it was necessary. Discord had a mechanism called sharding, which allowed your bot to run on multiple instances, and you could specify for each instance which shards it was gonna handle aka which pool of guilds it was going to receive events from. this makes it easy to split up the bot on different k8s pods, each handling a bunch of shards. restarting pods singularly results in a much lower downtime compared to restarting a bot that runs on a single process.  
anyway, this gets explained more in detail in my bot’s README file on GitHub, link to that at the end of the article.  

### the long awaited web dashboard
a web dashboard to manage the bot settings was in the plans for a while, but I never did proper frontend development before.  
the amount of settings available to configure the bot were way to many to handle in Discord with a decent UX.  
this is the configuration help panel for one of the bot’s feature for example:  
![help-generator](/img/blog/astro/ab_generator_help_embed.webp)  
but ngl I really loved the way you could tweak those settings, I did set up a whole system (prior to when slash commands were a thing), in which the bot showed you all the configuration options, and you choose which one to modify by replying to the bot with the name of the setting you wanted to change (or the initials), and then the bot would prompt you for a new value for the setting.  
it also handled concurrency properly, so you could be modifying the same setting only from one place at a time.  
unfortunately, I have no videos about it, only a screenshot:  
![astro-settings-embed](/img/blog/astro/ab_generator_editor_embed.webp)

at one point though I just gave it a shot, taking inspiration from the [atlas.bot](https://atlas.bot) one, and honestly it took much less time than expected to build an amazing dashboard.  
I think the evolution of the website is pretty cool, so here it is:  
<figure>
    <img src="/img/blog/astro/ab_first_website.webp"
         alt="Astro very first website">
    <figcaption style="margin-top: -1.5em;">very first version the astro website, made with `create-react-app`. the ui was meant to replicate the old Discord profile cards!</figcaption>
</figure>

<figure>
    <iframe src="https://www.youtube.com/embed/YQZ_pS_oWFk?si=twuf9Vk3quR2KQLV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>  
    <figcaption>demo of the website first version with a couple of ui improvements</figcaption>
</figure>

<figure>
    <iframe src="https://www.youtube.com/embed/SG7HNgOhdhM?si=-u9G5nau-6piz5Wd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <figcaption>second version of the Astro website, made with Vue</figcaption>
</figure>

<figure>
    <iframe src="https://www.youtube.com/" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <figcaption>still making this one, hold tight<figcaption>
</figure>

### fancy analytics and what I’ve learned
this project grew much past beyond my expectations, here are some statistics that I gathered trough BigQuery over the past year:  
- 7-15k daily distinct active users
- 10-30k voice channels generated daily
- 150k+ total guilds
- 300k-1M voice channels generated per month
- 7M voice channels generated last year
- 20M+ voice channels generated in total

this project teach me most of the things I now know about coding, high school and university helped me with having strong fundamentals sure, but this project was key in learning how to apply them to real world scenarios and also discover a lot of key technologies that school does not prepare you for.  

I won't dive into the code in this article, because there would really be too much cool stuff to cover, but you can find a technical description of the current status on the GitHub repositories (link at the end of the article!).

and the best part, is that it thought me so much more than just coding!  
- it taught me how to listen to customers, and how to handle support requests, this is the amount of messages I sent in the bot support guild to mainly help people out:  
![support-msgs](/img/blog/astro/ab_msg_count_support_server.webp)
- how to grow my product, look at statistics, make partnerships and advertise it
- how to balance free and paywalled features to keep the users happy while still being profitable
- how to balance my time and, most importantly, that you will never *be done* with development. initially I was always saying, alright I just need to get this one feature out and then it’s completed, but the reality is that there is always room for improvement, and it’s very important that you become able to distinguish what is worth pursuing and improving and what is not.

these days, I don’t really use Discord because I stopped gaming a while ago, and this took away the drive I had for this project for a long time.  
I love creating and developing projects that I actually use, and unfortunately this is not the case anymore for Astro.  
because of that, I decided to stop working on it and don’t plan on adding new features to it anymore, but that doesn’t mean that it’s going offline or anything, the bot will stay alive and serve your amazing guilds for (hopefully) as much as you need it!  

additionally, I decided to open source all the code, in the hope that it can help other developers and be taken as an example or reference for ways to overcome certain technical challenges related to large-scale Discord bots development.  

here are the links for the [backend](https://github/com/bot-astro/astro) and the [frontend](https://github.com/bot-astro/astro-bot.space) GitHub repositories of Astro :>  

I wrote this article mainly for my future self, to remind me about all the challenges I encountered and the exciting times and lessons this project brought me, but I hope you get something meaningful out of it, and that it inspires you to create something yourself, whether it’s a Discord bot or anything else.    

Happy crafting :P