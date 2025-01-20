<script lang="js">
	export default {
		data() {
			return {
				isMobileNavOpen: false,
			};
		},
		methods: {
			toggleMobileNav() {
				this.isMobileNavOpen = !this.isMobileNavOpen;
				if (this.isMobileNavOpen) {
					document.body.style.overflowY = "hidden";
				} else {
					document.body.style.overflowY = "auto";
				}
			},
			closeMobileNav() {
				this.isMobileNavOpen = false;
				document.body.style.overflowY = "auto";
			},
		},
	};
</script>

<template>
	<header class="header container">
		<nav>
			<ul class="header__menu">
				<li>
					<a class="header__link" href="#">Shows</a>
				</li>
				<li>
					<a class="header__link" href="#">Contribute</a>
				</li>
				<li>
					<a class="header__link" href="#">History</a>
				</li>
				<li>
					<a class="header__link" href="#">Gallery</a>
				</li>
				<li class="header__line" />
				<li>
					<button
						id="theme-toggle"
						aria-label="theme-toggle btn"
						class="header__sun"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
							/>
						</svg>
					</button>
				</li>
				<li>
					<button class="btn header__tickets">Tickets</button>
				</li>
			</ul>
			<button
				aria-label="mobile nav button"
				class="header__bars"
				@click="toggleMobileNav()"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</nav>
	</header>
	<!-- Mobile Navigation -->
	<div class="mobile-nav" :class="isMobileNavOpen ? 'open' : ''">
		<nav>
			<ul class="mobile-nav__menu">
				<li>
					<a class="mobile-nav__link" href="#" @click="closeMobileNav()"
						>Shows</a
					>
				</li>
				<li>
					<a class="mobile-nav__link" href="#" @click="closeMobileNav()"
						>Contribute</a
					>
				</li>
				<li>
					<a class="mobile-nav__link" href="#" @click="closeMobileNav()"
						>History</a
					>
				</li>
				<li>
					<a class="mobile-nav__link" href="#" @click="closeMobileNav()"
						>Gallery</a
					>
				</li>
				<li class="mobile-nav__link-line" />
				<li>
					<button
						id="theme-toggle"
						aria-label="theme-toggle btn"
						class="mobile-nav__sun"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
							/>
						</svg>
					</button>
				</li>
				<li>
					<button class="btn header__tickets" @click="closeMobileNav()">
						Tickets
					</button>
				</li>
			</ul>
		</nav>
	</div>
</template>

<style lang="css" scoped>
	.header {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-top: 2rem;
		padding-bottom: 2rem;
		position: relative;
		z-index: 9999;
	}

	.header__menu {
		display: none;
	}

	.header__bars {
		color: var(--clr-light);
		width: var(--size-2xl);
		height: var(--size-2xl);
		display: block;
	}

	/* md */
	@media (width >=768px) {
		.header__menu {
			display: flex;
			align-items: center;
			list-style: none;
			padding: 0;
			gap: 2em;
		}

		.header__link {
			font-size: var(--size-xs);
			text-decoration: none;
			font-weight: 600;
			color: var(--clr-body-color);
			letter-spacing: -0.05em;
			transition: color 0.3s;
		}

		.header__link:hover {
			text-decoration: underline;
			color: var(--clr-emphasis);
		}

		.header__link:active {
			color: var(--clr-emphasis);
		}

		.header__line {
			border: 1px solid var(--clr-slate);
			padding-top: 1.5em;
		}

		.header__sun {
			display: block;
			color: var(--clr-slate);
			width: var(--size-base);
			height: var(--size-base);
		}

		.header__tickets {
			font-size: var(--size-xs);
		}

		.header__bars {
			display: none;
		}
	}

	/* lg */
	@media (width >=1024px) {
		.header__link {
			font-size: var(--size-sm);
		}

		.header__sun {
			width: var(--size-xl);
			height: var(--size-xl);
		}

		.header__tickets {
			font-size: var(--size-sm);
		}
	}

	.mobile-nav {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background-color: var(--clr-body-bg);
		display: none;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.mobile-nav.open {
		display: flex;
	}

	.mobile-nav__menu {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.mobile-nav__link {
		font-size: var(--size-sm);
		text-decoration: none;
		font-weight: 600;
		color: var(--clr-slate);
		letter-spacing: -0.05em;
		transition: color 0.3s;
	}

	.mobile-nav__link:hover {
		text-decoration: underline;
		color: var(--clr-emphasis);
	}

	.mobile-nav__link-line {
		border: 1px solid var(--clr-slate);
		padding-right: 1.5em;
	}

	.mobile-nav__sun {
		display: block;
		width: var(--size-xl);
		height: var(--size-xl);
		color: var(--clr-slate);
	}

	.mobile-nav__btn {
		font-size: var(--size-sm);
	}
</style>
