<template>
	<div class="flex items-center justify-center h-full text-2xl">
		redirecting<span class="loading-dots"></span>
	</div>
</template>

<script setup>
import redirects from "~/assets/redirects.js";

const route = useRoute();
const redirect = redirects.find(r => r.id === route.params.redirect.toLowerCase())
if (!redirect) {
	throw createError({
		statusCode: 404,
		statusMessage: 'uh oh, nothing here :/',
	})
}

onMounted(() => {
	// guarantees DOM tree to be fully built
	nextTick(() => {
		if (redirect) {
			setTimeout(() => {
				if (redirect.url.startsWith("mailto:")) {
					window.location.href = redirect.url;
				} else {
					location.replace(redirect.url)
				}
			}, 1000);
		}
	})
})
</script>

<style>
/* loading dots indicator */
.loading-dots::after {
	content: '';
	animation: dots 1.5s infinite;
	color: #E220EC; /* pink dots */
}

@keyframes dots {
	0%, 20% { content: ''; }
	40% { content: '.'; }
	60% { content: '..'; }
	80%, 100% { content: '...'; }
}
</style>