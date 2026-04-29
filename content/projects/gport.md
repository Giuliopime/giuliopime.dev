---
title: gport
description: k8s IaC + ArgoCD configs I use to deploy my projects
date: 2026-04-03
major: true
tags: [k8s, IaC, CI/CD, ArgoCD]
links: [
  {title: 'github', url: 'https://github.com/Giuliopime/gport'},
]
---

My IaC holy repo, where I store terraform configs for my kubernetes cluster and ArgoCD application manifests.  

I use Hetzner as cloud provider, I create a Kubernetes cluster using k3s hosted on non-dedicated servers.    
this part is managed via terraform and the [terraform-hcloud-kube-hetzner](https://github.com/kube-hetzner/terraform-hcloud-kube-hetzner) module.  

### what gets created
- sealed secrets that can be safely stored on GitHub (I have a script that automates generation from plain secrets project wide)
- a grafana dashboard correctly routed using Cloudflare DNS
- a control-plane node pool with 3 nodes
- an agent node pool for lightweight applications and core kubernetes services
- an autoscaler agent node pool for general purpose applications
- 2 Hetzner load balancers, one for the control plane and one for the agent nodes
- all nodes use [`OpenSUSE MicroOS`](https://microos.opensuse.org)

kubernetes wise (installed directly via the kube-hetzner Terraform module):
- calico as the CNI
- nginx
- longhorn for efficient and scalable storage management  
  is used to have fast persistant storage for stuff like DBs.  
  uses all the nodes nvme storage and manages them together giving you a simple StorageClass that you can use in your PVCs.
- kured for automatic kernel updates
- cluster autoscaler (bless it)
- smb support: in the future I wanna use Hetzner Storage Boxes for hosting immich and other stuff

### how I deploy apps using it
Since it's running ArgoCD, I usually create a repo with the IaC of my new project and then point ArgoCD to it, which takes care of all the heavy lifting for getting it online automatically.  

Before hand I setup CI so that whenever I commit some code on my new project, it builds the Docker image, stores it somewhere with a clean version tag, and then I just have to update the `version.yaml` file in my IaC repo to have ArgoCD deploy the new version, with the option to roll back via a simple `git revert` operation.  