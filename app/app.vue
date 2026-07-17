<template>
	<NuxtLayout>
  	<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
const router = useRouter()

useHeadSafe({
  titleTemplate: (pageTitle) => {
    return pageTitle
        ? `${pageTitle} — giuliopime.dev`
        : 'giuliopime.dev'
  },
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "favicon", href: "/favicon.ico" },
  ]
})

useSeoMeta({
  ogType: "website",
  ogSiteName: "giuliopime.dev",
  ogTitle: "giuliopime.dev",
  ogUrl: "https://giuliopime.dev",
  ogImage: "https://giuliopime.dev/pfp.png",
  twitterSite: "@giuliopime",
  twitterCreator: "@giuliopime",
  twitterTitle: "giuliopime.dev",
  twitterImage: "https://giuliopime.dev/pfp.png",
  twitterImageAlt: "my pfp",
  twitterCard: "summary",
  themeColor: "#000000",
  appleMobileWebAppStatusBarStyle: "black-translucent"
})

const { p, b, g, c, slash, ctrl, meta, alt } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.type !== 'keydown')
      return
	if (e.metaKey || e.ctrlKey || e.altKey)
      return

    const handled = ['p', 'b', 'g', 'c', '/']
    if (handled.includes(e.key.toLowerCase())) {
      e.preventDefault()
    }
  }
})

watch(p, (pressed) => { if (pressed && !ctrl.value && !meta.value) router.push('/projects') })
watch(b, (pressed) => { if (pressed && !ctrl.value && !meta.value) router.push('/blog') })
watch(g, (pressed) => { if (pressed && !ctrl.value && !meta.value) router.push('/guides') })
watch(c, (pressed) => { if (pressed && !ctrl.value && !meta.value) navigateTo('mailto:ping@giuliopime.dev', { external: true }) })
watch(slash, (pressed) => { if (pressed) router.push('/') })
</script>
