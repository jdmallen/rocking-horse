<template>
	<nav class="main-navigation" role="navigation" aria-label="Main Navigation">
		<div class="nav-container">
			<!-- About -->
			<div class="nav-item">
				<NuxtLink to="/about" class="nav-link">
					About
				</NuxtLink>
			</div>

			<!-- Shows -->
			<div class="nav-item dropdown" @mouseenter="openDropdown('shows')" @mouseleave="closeDropdown('shows')">
				<button class="nav-link dropdown-trigger" :aria-expanded="activeDropdown === 'shows'">
					Shows
					<svg class="dropdown-icon" :class="{ 'rotated': activeDropdown === 'shows' }" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
					</svg>
				</button>
				<div v-if="activeDropdown === 'shows'" class="dropdown-menu">
					<NuxtLink to="/shows" class="dropdown-item">Current Shows & Tickets</NuxtLink>
					<NuxtLink to="/past-performances" class="dropdown-item">Past Performances</NuxtLink>
				</div>
			</div>

			<!-- Get Involved -->
			<div class="nav-item dropdown" @mouseenter="openDropdown('involved')" @mouseleave="closeDropdown('involved')">
				<button class="nav-link dropdown-trigger" :aria-expanded="activeDropdown === 'involved'">
					Get Involved
					<svg class="dropdown-icon" :class="{ 'rotated': activeDropdown === 'involved' }" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
					</svg>
				</button>
				<div v-if="activeDropdown === 'involved'" class="dropdown-menu">
					<NuxtLink to="/auditions" class="dropdown-item">Auditions</NuxtLink>
					<NuxtLink to="/membership" class="dropdown-item">Individual Membership</NuxtLink>
					<NuxtLink to="/sponsorship" class="dropdown-item">Season Sponsorship 2025-26</NuxtLink>
				</div>
			</div>

			<!-- Media -->
			<div class="nav-item dropdown" @mouseenter="openDropdown('media')" @mouseleave="closeDropdown('media')">
				<button class="nav-link dropdown-trigger" :aria-expanded="activeDropdown === 'media'">
					Media
					<svg class="dropdown-icon" :class="{ 'rotated': activeDropdown === 'media' }" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
					</svg>
				</button>
				<div v-if="activeDropdown === 'media'" class="dropdown-menu">
					<NuxtLink to="/gallery" class="dropdown-item">Gallery</NuxtLink>
					<NuxtLink to="/video" class="dropdown-item">Video</NuxtLink>
				</div>
			</div>

			<!-- Contact -->
			<div class="nav-item">
				<NuxtLink to="/contact" class="nav-link">
					Contact
				</NuxtLink>
			</div>

			<!-- Mobile Menu Toggle -->
			<button
				class="mobile-menu-toggle"
				:aria-expanded="mobileMenuOpen"
				aria-label="Toggle mobile menu"
				@click="toggleMobileMenu"
			>
				<svg v-if="!mobileMenuOpen" class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<line x1="3" y1="6" x2="21" y2="6"/>
					<line x1="3" y1="12" x2="21" y2="12"/>
					<line x1="3" y1="18" x2="21" y2="18"/>
				</svg>
				<svg v-else class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<line x1="18" y1="6" x2="6" y2="18"/>
					<line x1="6" y1="6" x2="18" y2="18"/>
				</svg>
			</button>
		</div>

		<!-- Mobile Menu -->
		<div v-if="mobileMenuOpen" class="mobile-menu">
			<NuxtLink to="/about" class="mobile-nav-link" @click="closeMobileMenu">About</NuxtLink>

			<div class="mobile-nav-section">
				<button
					class="mobile-nav-trigger"
					:aria-expanded="activeMobileSection === 'shows'"
					@click="toggleMobileSection('shows')"
				>
					Shows
					<svg class="mobile-dropdown-icon" :class="{ 'rotated': activeMobileSection === 'shows' }" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
					</svg>
				</button>
				<div v-if="activeMobileSection === 'shows'" class="mobile-nav-submenu">
					<NuxtLink to="/shows" class="mobile-nav-sublink" @click="closeMobileMenu">Current Shows & Tickets</NuxtLink>
					<NuxtLink to="/past-performances" class="mobile-nav-sublink" @click="closeMobileMenu">Past Performances</NuxtLink>
				</div>
			</div>

			<div class="mobile-nav-section">
				<button
					class="mobile-nav-trigger"
					:aria-expanded="activeMobileSection === 'involved'"
					@click="toggleMobileSection('involved')"
				>
					Get Involved
					<svg class="mobile-dropdown-icon" :class="{ 'rotated': activeMobileSection === 'involved' }" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
					</svg>
				</button>
				<div v-if="activeMobileSection === 'involved'" class="mobile-nav-submenu">
					<NuxtLink to="/auditions" class="mobile-nav-sublink" @click="closeMobileMenu">Auditions</NuxtLink>
					<NuxtLink to="/membership" class="mobile-nav-sublink" @click="closeMobileMenu">Individual Membership</NuxtLink>
					<NuxtLink to="/sponsorship" class="mobile-nav-sublink" @click="closeMobileMenu">Season Sponsorship 2025-26</NuxtLink>
				</div>
			</div>

			<div class="mobile-nav-section">
				<button
					class="mobile-nav-trigger"
					:aria-expanded="activeMobileSection === 'media'"
					@click="toggleMobileSection('media')"
				>
					Media
					<svg class="mobile-dropdown-icon" :class="{ 'rotated': activeMobileSection === 'media' }" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
					</svg>
				</button>
				<div v-if="activeMobileSection === 'media'" class="mobile-nav-submenu">
					<NuxtLink to="/gallery" class="mobile-nav-sublink" @click="closeMobileMenu">Gallery</NuxtLink>
					<NuxtLink to="/video" class="mobile-nav-sublink" @click="closeMobileMenu">Video</NuxtLink>
				</div>
			</div>

			<NuxtLink to="/contact" class="mobile-nav-link" @click="closeMobileMenu">Contact</NuxtLink>
		</div>
	</nav>
</template>

<script setup>
const activeDropdown = ref(null);
const mobileMenuOpen = ref(false);
const activeMobileSection = ref(null);

function openDropdown(dropdown) {
	activeDropdown.value = dropdown;
}

function closeDropdown(dropdown) {
	if (activeDropdown.value === dropdown) {
		activeDropdown.value = null;
	}
}

function toggleMobileMenu() {
	mobileMenuOpen.value = !mobileMenuOpen.value;
	if (!mobileMenuOpen.value) {
		activeMobileSection.value = null;
	}
}

function closeMobileMenu() {
	mobileMenuOpen.value = false;
	activeMobileSection.value = null;
}

function toggleMobileSection(section) {
	activeMobileSection.value = activeMobileSection.value === section ? null : section;
}

// Close dropdowns when clicking outside
onMounted(() => {
	document.addEventListener('click', (event) => {
		if (!event.target.closest('.dropdown')) {
			activeDropdown.value = null;
		}
		if (!event.target.closest('.main-navigation')) {
			mobileMenuOpen.value = false;
			activeMobileSection.value = null;
		}
	});
});
</script>

<style scoped>
.main-navigation {
	background: #fff;
	border-bottom: 1px solid #e5e7eb;
	position: relative;
	z-index: 100;
}

.nav-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 64px;
}

.nav-item {
	position: relative;
}

.nav-link {
	display: flex;
	align-items: center;
	gap: 0.25rem;
	padding: 1rem;
	text-decoration: none;
	color: #374151;
	font-weight: 500;
	transition: color 0.2s;
	background: none;
	border: none;
	cursor: pointer;
	font-size: 1rem;
}

.nav-link:hover {
	color: #1f2937;
}

.dropdown-trigger {
	position: relative;
}

.dropdown-icon {
	width: 1rem;
	height: 1rem;
	transition: transform 0.2s;
}

.dropdown-icon.rotated {
	transform: rotate(180deg);
}

.dropdown-menu {
	position: absolute;
	top: 100%;
	left: 0;
	background: white;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%);
	min-width: 200px;
	padding: 0.5rem 0;
	z-index: 50;
}

.dropdown-item {
	display: block;
	padding: 0.75rem 1rem;
	text-decoration: none;
	color: #374151;
	transition: background-color 0.2s;
	white-space: nowrap;
}

.dropdown-item:hover {
	background-color: #f9fafb;
	color: #1f2937;
}

.mobile-menu-toggle {
	display: none;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0.5rem;
	color: #374151;
}

.menu-icon {
	width: 1.5rem;
	height: 1.5rem;
	stroke-width: 2;
}

.mobile-menu {
	display: none;
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background: white;
	border-bottom: 1px solid #e5e7eb;
	padding: 1rem;
	z-index: 40;
}

.mobile-nav-link,
.mobile-nav-trigger {
	display: block;
	width: 100%;
	text-align: left;
	padding: 0.75rem 0;
	text-decoration: none;
	color: #374151;
	font-weight: 500;
	border: none;
	background: none;
	cursor: pointer;
	font-size: 1rem;
	border-bottom: 1px solid #f3f4f6;
}

.mobile-nav-trigger {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.mobile-dropdown-icon {
	width: 1rem;
	height: 1rem;
	transition: transform 0.2s;
}

.mobile-dropdown-icon.rotated {
	transform: rotate(180deg);
}

.mobile-nav-submenu {
	padding-left: 1rem;
	margin-bottom: 0.5rem;
}

.mobile-nav-sublink {
	display: block;
	padding: 0.5rem 0;
	text-decoration: none;
	color: #6b7280;
	font-size: 0.875rem;
}

.mobile-nav-link:hover,
.mobile-nav-trigger:hover,
.mobile-nav-sublink:hover {
	color: #1f2937;
}

/* Active states */
.router-link-active {
	color: #1f2937;
	font-weight: 600;
}

@media (width <= 768px) {
	.nav-item:not(:last-child) {
		display: none;
	}

	.mobile-menu-toggle {
		display: block;
	}

	.mobile-menu {
		display: block;
	}
}

@media (width >= 769px) {
	.nav-container {
		justify-content: center;
		gap: 2rem;
	}

	.mobile-menu-toggle {
		display: none;
	}

	.mobile-menu {
		display: none;
	}
}
</style>