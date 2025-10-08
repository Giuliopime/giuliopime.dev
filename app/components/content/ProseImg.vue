<template>
	<div>
		<component
			:is="ImageComponent"
			:src="refinedSrc"
			:alt="props.alt"
			:width="props.width"
			:height="props.height"
			loading="lazy"
			@click="openPreview"
			class="cursor-zoom-in"
		/>

		<!-- Lightbox Preview -->
		<Teleport to="body">
			<Transition name="fade">
				<div
					v-if="isPreviewOpen"
					class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
					@click="closePreview"
				>
					<div class="relative max-h-[90vh] max-w-[90vw]">
						<component
							:is="ImageComponent"
							:src="refinedSrc"
							:alt="props.alt"
							loading="lazy"
							class="max-h-[90vh] max-w-full object-contain"
							@click.stop
							@keyup.esc="closePreview"
						/>
						<button
							@click="closePreview"
							class="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
							aria-label="Close preview"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'
import { useRuntimeConfig, computed, ref, onMounted, onUnmounted } from '#imports'

import ImageComponent from '#build/mdc-image-component.mjs'

const props = defineProps({
	src: {
		type: String,
		default: ''
	},
	alt: {
		type: String,
		default: ''
	},
	width: {
		type: [String, Number],
		default: undefined
	},
	height: {
		type: [String, Number],
		default: undefined
	}
})

const isPreviewOpen = ref(false)

const refinedSrc = computed(() => {
	if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
		const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
		if (_base !== '/' && !props.src.startsWith(_base)) {
			return joinURL(_base, props.src)
		}
	}
	return props.src
})

const openPreview = () => {
	isPreviewOpen.value = true
	document.body.style.overflow = 'hidden'
}

const closePreview = () => {
	isPreviewOpen.value = false
	document.body.style.overflow = ''
}

const handleEscape = (e: KeyboardEvent) => {
	if (e.key === 'Escape' && isPreviewOpen.value) {
		closePreview()
	}
}

onMounted(() => {
	document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
	document.removeEventListener('keydown', handleEscape)
	document.body.style.overflow = ''
})
</script>