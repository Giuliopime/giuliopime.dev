<template>
	<NuxtLayout>
  	<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
const router = useRouter()

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
