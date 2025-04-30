<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <div class="header__logo">
          <img src="@/assets/images/logo-placeholder.png" alt="Rocking Horse Productions Logo" class="logo">
        </div>
        <nav class="nav">
          <button class="nav__toggle" aria-label="Toggle navigation menu" @click="toggleMobileMenu">
            <span class="nav__toggle-icon"></span>
          </button>
          <ul class="nav__list" :class="{ 'nav__list--active': isMobileMenuOpen }">
            <li v-for="item in navItems" :key="item.path" class="nav__item">
              <router-link :to="item.path" class="link link-primary" @click="closeMobileMenu">
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </nav>
        <button class="theme-toggle" aria-label="Toggle theme" @click="toggleTheme">
          <span class="theme-toggle__icon">{{ isDarkMode ? '🌞' : '🌙' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isMobileMenuOpen = ref(false)
const isDarkMode = ref(false)

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/shows', label: 'Shows' },
  { path: '/contribute', label: 'Contribute' },
  { path: '/members', label: 'Members' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About Us' },
  { path: '/tickets', label: 'Tickets' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode')
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDarkMode.value = true
    document.body.classList.add('dark-mode')
  }
})
</script>

<style scoped>
.header {
  background-color: var(--color-background);
  color: var(--color-text);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

body.dark-mode .header {
  background-color: var(--color-background-dark);
  color: var(--color-text-dark);
}

.header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) 0;
}

.logo {
  height: 50px;
  width: auto;
}

.nav__toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
}

.nav__toggle-icon {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--color-text);
  position: relative;
}

body.dark-mode .nav__toggle-icon {
  background-color: var(--color-text-dark);
}

.nav__toggle-icon::before,
.nav__toggle-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: var(--color-text);
  transition: transform 0.3s ease;
}

body.dark-mode .nav__toggle-icon::before,
body.dark-mode .nav__toggle-icon::after {
  background-color: var(--color-text-dark);
}

.nav__list {
  display: flex;
  gap: var(--spacing-lg);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

body.dark-mode .nav__link {
  color: var(--color-text-dark);
}

.nav__link:hover {
  color: var(--color-maroon);
}

body.dark-mode .nav__link:hover {
  color: var(--color-maroon-light);
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
  font-size: var(--font-size-lg);
}

@media (max-width: 768px) {
  .nav__toggle {
    display: block;
  }

  .nav__list {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-background);
    padding: var(--spacing-md);
    flex-direction: column;
    gap: var(--spacing-md);
  }

  body.dark-mode .nav__list {
    background-color: var(--color-background-dark);
  }

  .nav__list--active {
    display: flex;
  }
}
</style> 
