<template>
	<div>
		<NuxtRouteAnnouncer />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style>
/*
Setting a bunch of baseline defaults so we can have a consistent starting
point for our styles.

Credit to @slayingthedragon on YouTube for inspiring much of this!
*/
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap');

:root {
	/* https://coolors.co/7e0112-440812-090f11-6587d7-fff9fb-ed9b40 */

	/* https://coolors.co/04080f-507dbc-60a561-efcb68-ebbe9b-800000-fafafa */

	/* colors */
	--hsl-charcoal-huesat: 197deg 37%;
	--hsl-charcoal-lum: 24%;
	--hsl-persian-green-huesat: 173deg 58%;
	--hsl-persian-green-lum: 39%;
	--hsl-saffron-huesat: 43deg 74%;
	--hsl-saffron-lum: 66%;
	--hsl-sandy-brown-huesat: 27deg 87%;
	--hsl-sandy-brown-lum: 67%;
	--hsl-burnt-sienna-huesat: 12deg 76%;
	--hsl-burnt-sienna-lum: 61%;
	--hsl-red-pantone-huesat: 353deg 86%;
	--hsl-red-pantone-lum: 54%;
	--hsl-falu-red-huesat: 4deg 98%; /* original Rocking Horse site red */
	--hsl-falu-red-lum: 25%;/* original Rocking Horse site red */

	/* neutrals */
	--hsl-anti-flat-white-huesat: 200deg 7%;
	--hsl-anti-flat-white-lum: 92%;
	--hsl-battleship-gray-huesat: 200deg 1%;
	--hsl-battleship-gray-lum: 55%;
	--hsl-blacky-huesat: 154deg 47%;
	--hsl-blacky-lum: 3%;
	--hsl-onyx-huesat: 150deg 4%;
	--hsl-onyx-lum: 20%;
	--hsl-silver-huesat: 216deg 5%;
	--hsl-silver-lum: 79%;
	--hsl-black-huesat: 0deg 0%;
	--hsl-black-lum: 0%;
	--hsl-white-huesat: 0deg 0%;
	--hsl-white-lum: 100%;
	--hsl-rich-black-huesat: 218deg 58%;
	--hsl-rich-black-lum: 4%;
	--hsl-seasalt-huesat: 0deg 0%;
	--hsl-seasalt-lum: 97%;
	--hsl-slate-gray-huesat: 199deg 15%;
	--hsl-slate-gray-lum: 51%;
	--hsl-dark-huesat: var(--hsl-rich-black-huesat);
	--hsl-dark-lum: var(--hsl-rich-black-lum);
	--hsl-light-huesat: var(--hsl-seasalt-huesat);
	--hsl-light-lum: var(--hsl-seasalt-lum);
	--hsl-slate-huesat: var(--hsl-slate-gray-huesat);
	--hsl-slate-lum: var(--hsl-slate-gray-lum);
	--clr-dark: hsl(var(--hsl-dark-huesat) var(--hsl-dark-lum));
	--clr-light: hsl(var(--hsl-light-huesat) var(--hsl-light-lum));
	--clr-slate: hsl(var(--hsl-slate-huesat) var(--hsl-slate-lum));
	--hsl-primary-huesat: var(--hsl-charcoal-huesat);
	--hsl-primary-lum: var(--hsl-charcoal-lum);
	--hsl-secondary-huesat: var(--hsl-sandy-brown-huesat);
	--hsl-secondary-lum: var(--hsl-sandy-brown-lum);
	--hsl-tertiary-huesat: var(--hsl-burnt-sienna-huesat);
	--hsl-tertiary-lum: var(--hsl-burnt-sienna-lum);
	--hsl-info-huesat: var(--hsl-charcoal-huesat);
	--hsl-info-lum: calc(var(--hsl-charcoal-lum) + 10%);
	--hsl-success-huesat: var(--hsl-persian-green-huesat);
	--hsl-success-lum: var(--hsl-persian-green-lum);
	--hsl-warning-huesat: var(--hsl-saffron-huesat);
	--hsl-warning-lum: var(--hsl-saffron-lum);
	--hsl-danger-huesat: var(--hsl-red-pantone-huesat);
	--hsl-danger-lum: var(--hsl-red-pantone-lum);
	--clr-primary: hsl(var(--hsl-primary-huesat) var(--hsl-primary-lum));
	--clr-secondary: hsl(var(--hsl-secondary-huesat) var(--hsl-secondary-lum));
	--clr-tertiary: hsl(var(--hsl-tertiary-huesat) var(--hsl-tertiary-lum));
	--clr-info: hsl(var(--hsl-info-huesat) var(--hsl-info-lum));
	--clr-success: hsl(var(--hsl-success-huesat) var(--hsl-success-lum));
	--clr-warning: hsl(var(--hsl-warning-huesat) var(--hsl-warning-lum));
	--clr-danger: hsl(var(--hsl-danger-huesat) var(--hsl-danger-lum));
	--hsl-body-color-huesat: var(--hsl-dark-huesat);
	--hsl-body-color-lum: var(--hsl-dark-lum);
	--hsl-body-bg-huesat: var(--hsl-light-huesat);
	--hsl-body-bg-lum: var(--hsl-light-lum);
	--hsl-emphasis-huesat: var(--hsl-black-huesat);
	--hsl-emphasis-lum: var(--hsl-black-lum);
	--hsl-box-shadow-huesat: var(--hsl-rich-black-huesat);
	--hsl-box-shadow-lum: var(--hsl-rich-black-lum);
	--hsl-box-shadow-emphasis-huesat: var(--hsl-black-huesat);
	--hsl-box-shadow-emphasis-lum: var(--hsl-black-lum);
	--clr-emphasis: hsl(var(--hsl-emphasis-huesat) var(--hsl-emphasis-lum));
	--clr-body-color: hsl(var(--hsl-body-color-huesat) var(--hsl-body-color-lum));
	--clr-body-bg: hsl(var(--hsl-body-bg-huesat) var(--hsl-body-bg-lum));
	--clr-box-shadow: hsl(var(--hsl-box-shadow-huesat) var(--hsl-box-shadow-lum) / 25%);
	--clr-box-shadow-emphasis: hsl(var(--hsl-box-shadow-emphasis-huesat) var(--hsl-box-shadow-emphasis-lum) / 50%);

	@media (prefers-color-scheme: light) {
		--hsl-body-color-huesat: var(--hsl-dark-huesat);
		--hsl-body-color-lum: var(--hsl-dark-lum);
		--hsl-body-bg-huesat: var(--hsl-light-huesat);
		--hsl-body-bg-lum: var(--hsl-light-lum);
		--hsl-emphasis-huesat: var(--hsl-black-huesat);
		--hsl-emphasis-lum: var(--hsl-black-lum);
		--hsl-box-shadow-huesat: var(--hsl-rich-black-huesat);
		--hsl-box-shadow-lum: var(--hsl-rich-black-lum);
		--hsl-box-shadow-emphasis-huesat: var(--hsl-black-huesat);
		--hsl-box-shadow-emphasis-lum: var(--hsl-black-lum);
	}

	@media (prefers-color-scheme: dark) {
		--hsl-body-color-huesat: var(--hsl-light-huesat);
		--hsl-body-color-lum: var(--hsl-light-lum);
		--hsl-body-bg-huesat: var(--hsl-dark-huesat);
		--hsl-body-bg-lum: var(--hsl-dark-lum);
		--hsl-emphasis-huesat: var(--hsl-white-huesat);
		--hsl-emphasis-lum: var(--hsl-white-lum);
		--hsl-box-shadow-huesat: var(--hsl-seasalt-huesat);
		--hsl-box-shadow-lum: var(--hsl-seasalt-lum);
		--hsl-box-shadow-emphasis-huesat: var(--hsl-white-huesat);
		--hsl-box-shadow-emphasis-lum: var(--hsl-white-lum);
	}

	/* sizes */
	--size-xxs: 0.5rem;
	--size-xs: 0.75rem;
	--size-sm: 0.875rem;
	--size-base: 1rem;
	--size-lg: 1.125rem;
	--size-xl: 1.25rem;
	--size-2xl: 1.5rem;
	--size-3xl: 1.875rem;
	--size-4xl: 2.25rem;
	--size-5xl: 3rem;
	--size-6xl: 3.75rem;
	--size-7xl: 4.5rem;
	--size-8xl: 6rem;
	--size-9xl: 8rem;
	--size-10xl: 10rem;
}

*,
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
	line-height: calc(1em + 0.5rem);
}

html {
	scroll-behavior: smooth;
	overflow-x: hidden;
}

body {
	font-family: Poppins, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
	font-weight: 400;
	font-style: normal;
	background-color: var(--clr-body-bg);
	color: var(--clr-body-color);
	overflow-x: hidden;
}

img,
picture,
video,
canvas,
svg {
	display: block;
	max-width: 100%;
	user-select: none;
}

input {
	border: none;
	padding: 0;
}

button {
	display: inline-block;
	padding: 0;
	border: none;
	background: none;
	cursor: pointer;
}

article {
	max-width: 80ch;
	margin-left: auto;
	margin-right: auto;
	width: 100%;
}

strong {
	color: var(--clr-primary);
}

a {
	color: var(--clr-secondary);
	font-weight: 600;
	cursor: pointer;
	transition: color 0.3s ease-in-out;
}

a:hover {
	text-decoration: underline;
	color: hsl(var(--hsl-secondary-huesat) calc(var(--hsl-secondary-lum) + 10%));
}

a:active {
	color: hsl(var(--hsl-secondary-huesat) calc(var(--hsl-secondary-lum) + 15%));
}

a:visited {
	color: hsl(var(--hsl-secondary-huesat) calc(var(--hsl-secondary-lum) - 10%));
}
</style>