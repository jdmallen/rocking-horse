<template>
	<div class="app-layout">
		<!-- Header with Navigation -->
		<header class="site-header">
			<div class="header-container">
				<!-- Logo/Site Title -->
				<div class="site-branding">
					<NuxtLink to="/" class="site-logo">
						<h1 class="site-title">Rocking Horse Productions</h1>
					</NuxtLink>
				</div>
			</div>
			<!-- Navigation -->
			<MainNavigation />
		</header>

		<!-- Main Content Area -->
		<main class="site-main">
			<div class="main-container">
				<slot />
			</div>
		</main>

		<!-- Footer -->
		<footer class="site-footer">
			<div class="footer-container">
				<div class="footer-content">
					<div class="footer-section">
						<h3 class="footer-title">Rocking Horse Productions</h3>
						<p class="footer-description">
							Bringing exceptional theatrical experiences to Western New York since 2005.
						</p>
					</div>

					<div class="footer-section">
						<h4 class="footer-heading">Quick Links</h4>
						<ul class="footer-links">
							<li><NuxtLink to="/about">About</NuxtLink></li>
							<li><NuxtLink to="/shows">Current Shows</NuxtLink></li>
							<li><NuxtLink to="/auditions">Auditions</NuxtLink></li>
							<li><NuxtLink to="/contact">Contact</NuxtLink></li>
						</ul>
					</div>

					<div class="footer-section">
						<h4 class="footer-heading">Get Involved</h4>
						<ul class="footer-links">
							<li><NuxtLink to="/membership">Membership</NuxtLink></li>
							<li><NuxtLink to="/sponsorship">Sponsorship</NuxtLink></li>
							<li><NuxtLink to="/auditions">Auditions</NuxtLink></li>
						</ul>
					</div>

					<div class="footer-section">
						<h4 class="footer-heading">Follow Us</h4>
						<div class="social-links">
							<a href="https://www.facebook.com/Rocking-Horse-Productions-88307416144/" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
								<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
								</svg>
							</a>
							<a href="https://twitter.com/rockinghorse06" class="social-link" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
								<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
									<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
								</svg>
							</a>
							<a href="https://www.instagram.com/rockinghorse_productions/" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
								<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
								</svg>
							</a>
						</div>
					</div>
				</div>

				<div class="footer-bottom">
					<div class="footer-copyright">
						<p>&copy; {{ currentYear }} Rocking Horse Productions. All rights reserved.</p>
					</div>
					<div class="footer-legal">
						<NuxtLink to="/privacy">Privacy Policy</NuxtLink>
						<span class="separator">|</span>
						<NuxtLink to="/terms">Terms of Use</NuxtLink>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup>
const currentYear = new Date().getFullYear();

// Set page title and meta
useHead({
	titleTemplate: '%s | Rocking Horse Productions',
	meta: [
		{ name: 'description', content: 'Rocking Horse Productions - Professional theater productions and community engagement' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
	],
});
</script>

<style scoped>
.app-layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

/* Header Styles */
.site-header {
	background: #fff;
	box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
	position: sticky;
	top: 0;
	z-index: 100;
}

.header-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 1rem;
}

.site-branding {
	text-align: center;
}

.site-logo {
	text-decoration: none;
	color: inherit;
}

.site-title {
	font-size: 2rem;
	font-weight: 700;
	color: #1f2937;
	margin: 0;
	letter-spacing: -0.025em;
}

/* Main Content */
.site-main {
	flex: 1;
	background: #f9fafb;
}

.main-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem 1rem;
}

/* Footer Styles */
.site-footer {
	background: #1f2937;
	color: #d1d5db;
	margin-top: auto;
}

.footer-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 3rem 1rem 1rem;
}

.footer-content {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 2rem;
	margin-bottom: 2rem;
}

.footer-section {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.footer-title {
	font-size: 1.5rem;
	font-weight: 700;
	color: #fff;
	margin: 0;
}

.footer-description {
	font-size: 0.875rem;
	line-height: 1.6;
	color: #9ca3af;
	margin: 0;
}

.footer-heading {
	font-size: 1.125rem;
	font-weight: 600;
	color: #fff;
	margin: 0 0 0.5rem;
}

.footer-links {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.footer-links a,
.footer-legal a {
	color: #d1d5db;
	text-decoration: none;
	font-size: 0.875rem;
	transition: color 0.2s;
}

.footer-links a:hover,
.footer-legal a:hover {
	color: #fff;
}

.social-links {
	display: flex;
	gap: 1rem;
}

.social-link {
	color: #d1d5db;
	transition: color 0.2s;
}

.social-link:hover {
	color: #fff;
}

.social-icon {
	width: 1.5rem;
	height: 1.5rem;
}

.footer-bottom {
	border-top: 1px solid #374151;
	padding-top: 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	text-align: center;
}

.footer-copyright p {
	font-size: 0.875rem;
	color: #9ca3af;
	margin: 0;
}

.footer-legal {
	display: flex;
	align-items: center;
	gap: 1rem;
	font-size: 0.875rem;
}


.separator {
	color: #6b7280;
}

/* Responsive Design */
@media (width >= 768px) {
	.site-title {
		font-size: 2.5rem;
	}

	.main-container {
		padding: 3rem 2rem;
	}

	.footer-bottom {
		flex-direction: row;
		justify-content: space-between;
		text-align: left;
	}
}

@media (width >= 1024px) {
	.header-container {
		padding: 1.5rem 2rem;
	}

	.footer-container {
		padding: 4rem 2rem 2rem;
	}
}
</style>
