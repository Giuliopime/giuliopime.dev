---
title: DocsDrive
description: a Google-Drive-like file manager for agencies
date: 2021-08-25
major: false
tags: [ktor, nuxt]
links: [
  {title: 'backend', url: 'https://github.com/Giuliopime/docs-drive-backend'},
  {title: 'frontend', url: 'https://github.com/Giuliopime/docs-drive-frontend'},
  {title: 'demo', url: 'https://www.youtube.com/watch?v=Yq_CwU_XM9I'},
]
---
DocsDrive is a document & file manager.  
There is an initial admin user that can access the system and create other users, that can be either admin or not.  
An admin user can create, modify and delete users. Each user has a document folder, that can contain any kind of file, files which are uploaded by admins.  

A non admin user can just see the documents that the admins uploaded for them.  
Admin can also set a redirect for non-admin users, so that when one of those users logs in, he gets immediately redirected somewhere.  

I initially built it for an insurance Agency back in 2021 as you might notice from the commit history, that's why you might see the name *docali* pop up here and there in the 2 repos.  

### Backend
The backend api is built with Ktor, and uses Redis, MongoDB and the local file system for storage (yes I didn't know S3 existed back then).  
It uses OpenApi (see [here](https://giuliopime.github.io/docs-drive-backend/) even though it's not great as it's missing tags and other stuff) for documentation and the whole thing was deployed on a simple Aruba VPS.

### Frontend
The frontend is an SSR NuxtJS v2 application.  