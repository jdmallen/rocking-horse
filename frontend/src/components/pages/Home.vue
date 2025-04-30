<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__content">
        <h1 class="hero__title">Current Season 2024-2025</h1>
        <p class="hero__subtitle">Experience the magic of community theatre</p>
        <router-link to="/tickets" class="btn btn-primary hero__cta">Get Tickets</router-link>
      </div>
    </section>

    <!-- News Section -->
    <section class="news">
      <div class="container">
        <h2 class="section-title">Latest News</h2>
        <div class="news-grid">
          <article v-for="item in newsItems" :key="item.id" class="news-card">
            <div class="news-card__image">
              <img :src="item.image" :alt="item.title">
            </div>
            <div class="news-card__content">
              <h3 class="news-card__title">{{ item.title }}</h3>
              <p class="news-card__date">{{ item.date }}</p>
              <p class="news-card__excerpt">{{ item.excerpt }}</p>
              <router-link :to="item.link" class="link link-primary">Read More</router-link><br>
              <router-link :to="item.link" class="link link-secondary news-card__link">Read More</router-link><br>
              <router-link :to="item.link" class="link link-tertiary news-card__link">Read More</router-link>
            </div>
          </article>
        </div>
        <div class="pagination">
          <button 
            v-for="page in totalPages" 
            :key="page" 
            class="pagination__button"
            :class="{ 'pagination__button--active': currentPage === page }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentPage = ref(1)
const totalPages = ref(3)

// Mock data - will be replaced with API calls
const newsItems = ref([
  {
    id: 1,
    title: 'Auditions Announced for Spring Production',
    date: 'March 15, 2024',
    excerpt: 'Join us for auditions for our upcoming spring production. All roles are open to community members.',
    image: '/placeholder-news-1.jpg',
    link: '/contribute'
  },
  {
    id: 2,
    title: 'Winter Show Tickets Now Available',
    date: 'March 10, 2024',
    excerpt: 'Secure your seats for our winter production. Limited availability for opening night.',
    image: '/placeholder-news-2.jpg',
    link: '/tickets'
  },
  {
    id: 3,
    title: 'New Season Announcement',
    date: 'March 1, 2024',
    excerpt: 'We are excited to announce our 2024-2025 season lineup. Stay tuned for more details!',
    image: '/placeholder-news-3.jpg',
    link: '/shows'
  }
])
</script>

<style scoped>
.hero {
  position: relative;
  height: 60vh;
  min-height: 400px;
  background-image: url('/placeholder-hero.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: var(--spacing-xl);
}

.hero__title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-md);
}

.hero__subtitle {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xl);
}

.hero__cta {
  padding: var(--spacing-md) var(--spacing-xl);
}

.hero__cta:hover {
  background-color: var(--color-maroon-light);
}

.section-title {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  color: var(--color-maroon);
}

.news-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.news-card {
  background-color: var(--color-card);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

body.dark-mode .news-card {
  background-color: var(--color-card-dark);
}

.news-card__image {
  height: 200px;
  overflow: hidden;
}

.news-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-card__content {
  padding: var(--spacing-lg);
}

.news-card__title {
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

body.dark-mode .news-card__title {
  color: var(--color-text-dark);
}

.news-card__date {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-md);
}

body.dark-mode .news-card__date {
  color: var(--color-text-secondary-dark);
}

.news-card__excerpt {
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

body.dark-mode .news-card__excerpt {
  color: var(--color-text-dark);
}

.news-card__link {
  font-weight: 500;
}

body.dark-mode .news-card__link {
  color: var(--color-maroon-light);
}

body.dark-mode .news-card__link:hover {
  color: var(--color-maroon);
}

.pagination {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xl);
}

.pagination__button {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  border-radius: 4px;
  min-width: 40px;
  font-weight: 500;
  transition: all 0.3s ease;
}

body.dark-mode .pagination__button {
  background-color: var(--color-background-dark);
  color: var(--color-text-dark);
  border-color: var(--color-border-dark);
}

.pagination__button:hover {
  background-color: var(--color-card);
  border-color: var(--color-maroon);
  color: var(--color-maroon);
}

body.dark-mode .pagination__button:hover {
  background-color: var(--color-card-dark);
  border-color: var(--color-maroon-light);
  color: var(--color-maroon-light);
}

.pagination__button--active {
  background-color: var(--color-maroon);
  color: white;
  border-color: var(--color-maroon);
}

body.dark-mode .pagination__button--active {
  background-color: var(--color-maroon-light);
  border-color: var(--color-maroon-light);
}

.pagination__button--active:hover {
  background-color: var(--color-maroon-light);
  color: white;
}

body.dark-mode .pagination__button--active:hover {
  background-color: var(--color-maroon);
  color: white;
}

@media (min-width: 768px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .news-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style> 
