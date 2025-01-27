<template>
	<footer class="footer container">
		<div class="footer__section">
			<h5 class="footer__section-header">Sign Up for Our Newsletter</h5>
			<div class="form-group">
				<input
					type="email"
					class="form-input"
					maxlength="256"
					placeholder="Enter your email"
				/>
				<button class="btn footer__input">Subscribe</button>
			</div>
		</div>
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
					<a href="#" class="footer__link">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							class="logo-icon"
						>
							<path
								fill="currentColor"
								d="M17 1H3c-1.1 0-2 .9-2 2v14c0 1.101.9 2 2 2h7v-7H8V9.525h2v-2.05c0-2.164 1.212-3.684 3.766-3.684l1.803.002v2.605h-1.197c-.994 0-1.372.746-1.372 1.438v1.69h2.568L15 12h-2v7h4c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2"
							/>
						</svg>
					</a>
				</li>
				<li class="footer__item">
					<a href="#" class="footer__link">
						<img
							class="logo-icon"
							src="data:image/x-icon;base64,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"
						/>
					</a>
				</li>
				<li class="footer__item">
					<a href="#" class="footer__link">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							class="logo-icon"
						>
							<path
								fill="currentColor"
								d="M17 1H3c-1.1 0-2 .9-2 2v14c0 1.101.9 2 2 2h14c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2M9.984 15.523a5.54 5.54 0 0 0 5.538-5.539c0-.338-.043-.664-.103-.984H17v7.216a.69.69 0 0 1-.693.69H3.693a.69.69 0 0 1-.693-.69V9h1.549c-.061.32-.104.646-.104.984a5.54 5.54 0 0 0 5.539 5.539M6.523 9.984a3.461 3.461 0 1 1 6.922 0a3.461 3.461 0 0 1-6.922 0M16.307 6h-1.615A.694.694 0 0 1 14 5.308V3.691c0-.382.31-.691.691-.691h1.615c.384 0 .694.309.694.691v1.616c0 .381-.31.693-.693.693"
							/>
						</svg>
					</a>
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
		width: 100%;
		max-width: 80ch;

		.footer__section {
			margin-bottom: var(--size-lg);

			h5.footer__section-header {
				text-align: center;
				font-size: var(--size-base);
			}

			h5 + div {
				margin-top: var(--size-xxs);
			}

			.form-group {
				display: flex;
				gap: 0;
				justify-content: center;
				max-width: 90vw;

				.btn {
					width: fit-content;
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
				}

				input[type="email"] {
					max-width: 30ch;
					width: 100%;
					border-top-left-radius: 0.25em;
					border-bottom-left-radius: 0.25em;
					box-shadow: 0 0 0.5em 0.1em var(--clr-box-shadow);
				}
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

		.footer__section:nth-of-type(3) ul {
			display: flex;
			flex-direction: row;
			gap: 0.5em;
			justify-content: center;
		}
	}

	@media screen and (width >= 768px) {
		.footer {
			flex-direction: row;
			justify-content: space-between;
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

			.footer__section:nth-of-type(3) ul {
				justify-content: flex-start;
				margin-right: 4rem;
			}
		}
	}

	/* sm */
	/* @media screen and (width >= 640px) {} */

	/* md */
	/* @media screen and (width >= 768px) {} */

	/* lg */
	/* @media screen and (width >= 1024px) {} */

	/* xl */
	/* @media screen and (width >= 1280px) {} */

	/* 2xl */
	/* @media screen and (width >= 1536px) {} */
</style>
