<template>
	<div class="flex text-2xl font-bold">
		<span class="arrow">></span>
		<span class="arrow">></span>
		<span class="arrow">></span>
	</div>
</template>

<style scoped>
@keyframes wave {
	0%, 33%, 100% { color: currentColor; }
	0%, 33% { color: #E220EC; } /* Tailwind coral equivalent */
}

.arrow {
	animation: wave 0.6s infinite steps(1, start);
	/* Apply delays to create wave effect */
}

.arrow:nth-child(1) { animation-delay: 0s; }
.arrow:nth-child(2) { animation-delay: 0.2s; }
.arrow:nth-child(3) { animation-delay: 0.4s; }
</style>