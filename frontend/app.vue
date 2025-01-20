<script lang="ts">
	useHead({
		title: "Rocking Horse Produtions",
		meta: [
			{
				name: "description",
				content:
					"Welcome to Rocking Horse Productions, your premier community theater in Williamsville, NY. Discover our shows, events, and more!",
			},
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
	});
</script>

<template>
	<div>
		<NuxtRouteAnnouncer />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style lang="css">
	@import url("/styles/global.css");
	@import url("/styles/utils.css");
</style>
