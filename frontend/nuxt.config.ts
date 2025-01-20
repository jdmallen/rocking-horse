// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
		},
	},
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	modules: [
		"@nuxt/devtools",
		"@nuxt/image",
		"@nuxt/test-utils",
		"@nuxt/eslint",
		"@nuxt/icon",
		"nuxt-security",
		"nuxt-gtag",
		"@nuxtjs/stylelint-module",
	],
	eslint: {
		config: {
			standalone: false,
		},
	},
	css: ["modern-normalize/modern-normalize.css"],
});
