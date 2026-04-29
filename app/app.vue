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
  description: "the place where I write about things I do or think.",
  ogType: "website",
  ogSiteName: "giuliopime.dev",
  ogTitle: "giuliopime.dev",
  ogUrl: "https://giuliopime.dev",
  ogImage: "https://giuliopime.dev/pfp.png",
  twitterSite: "@giuliopime",
  twitterCreator: "@giuliopime",
  twitterTitle: "giuliopime.dev",
  twitterDescription: "the place where I write about things I do or think.",
  twitterImage: "https://giuliopime.dev/pfp.png",
  twitterImageAlt: "my pfp",
  themeColor: "#000000",
  appleMobileWebAppStatusBarStyle: "black-translucent"
})

const { p, b, g, c, slash } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.type === 'keydown') e.preventDefault()
  }
})

watch(p, (pressed) => { if (pressed) router.push('/projects') })
watch(b, (pressed) => { if (pressed) router.push('/blog') })
watch(g, (pressed) => { if (pressed) router.push('/guides') })
watch(c, (pressed) => { if (pressed) navigateTo('mailto:ping@giuliopime.dev', { external: true }) })
watch(slash, (pressed) => { if (pressed) router.push('/') })
</script>
