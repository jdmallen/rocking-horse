<template>
	<footer class="footer container">
		<!-- Links and text typical at the bottom of a community theater website -->
		<div class="footer__section">
			<h5 class="footer__section-header">Company</h5>
			<ul class="footer__list">
				<li class="footer__item">
					<a href="#" class="footer__link">About Us</a>
				</li>
				<li class="footer__item">
					<a href="#" class="footer__link">Advertise with Us</a>
				</li>
				<li class="footer__item">
					<a href="#" class="footer__link">Contact Us</a>
				</li>
				<li class="footer__item">
					<a href="#" class="footer__link">Privacy Policy</a>
				</li>
			</ul>
		</div>
		<div class="footer__section">
			<h5 class="footer__section-header">Connect</h5>
			<ul class="footer__list">
				<li class="footer__item">
					<a href="#" class="footer__link">FB</a>
				</li>
				<li class="footer__item">
					<a href="#" class="footer__link">X</a>
				</li>
				<li class="footer__item">
					<a href="#" class="footer__link">IG</a>
				</li>
			</ul>
		</div>
	</footer>
</template>

<style lang="css" scoped>
	.footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--size-2xl);
		padding-top: var(--size-4xl);
		padding-bottom: var(--size-2xl);

		.footer__section {
			h5.footer__section-header {
				text-align: center;
				font-size: var(--size-base);
			}

			ul.footer__list {
				padding-left: 0;

				.footer__item {
					font-size: var(--size-sm);
					list-style: none;
					text-align: center;

					a.footer__link {
						font-weight: 400;
						letter-spacing: 0.05em;
						transition: color 0.1s;
					}

					a.footer__link:hover {
						text-decoration: underline;
						color: var(--clr-emphasis);
					}

					a.footer__link:active {
						color: var(--clr-emphasis);
					}
				}
			}
		}

		.footer__section:nth-of-type(2) ul {
			display: flex;
			flex-direction: row;
			gap: 0.5em;
			justify-content: center;
		}
	}

	/* xs */
	@media screen and (width >= 475px) {
		.footer {
			flex-direction: row;
			justify-content: flex-end;
			align-items: flex-start;

			.footer__section {
				h5.footer__section-header {
					text-align: left;
					font-size: var(--size-sm);
				}

				ul.footer__list {
					.footer__item {
						text-align: left;
						font-size: var(--size-xs);
					}
				}
			}

			.footer__section:nth-of-type(2) ul {
				justify-content: flex-start;
			}
		}
	}
</style>
