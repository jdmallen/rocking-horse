<template>
	<div>
		<h1>Directus SDK Integration Test</h1>
		<p>Directus SDK is available: {{ isDirectusAvailable }}</p>
		<p>Plugin loaded: {{ pluginLoaded }}</p>
	</div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const pluginLoaded = computed(() => !!(nuxtApp.$directus));

const isDirectusAvailable = computed(() => {
	return !!(
		nuxtApp.$directus &&
		typeof nuxtApp.$readItem === 'function' &&
		typeof nuxtApp.$readItems === 'function'
	);
});
</script>