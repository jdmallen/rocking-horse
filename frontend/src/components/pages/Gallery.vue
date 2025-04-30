<template>
  <div class="gallery">
    <div class="container">
      <h1 class="section-title">Production Gallery</h1>
      
      <div class="season-filter">
        <label for="season-select">Filter by Season:</label>
        <select 
          id="season-select" 
          v-model="selectedSeason"
          class="season-select"
        >
          <option value="">All Seasons</option>
          <option v-for="season in seasons" :key="season" :value="season">
            {{ season }}
          </option>
        </select>
      </div>

      <div class="productions">
        <div v-for="season in filteredSeasons" :key="season" class="season-section">
          <h2 class="season-title">{{ season }}</h2>
          
          <div class="production-grid">
            <div 
              v-for="production in getProductionsBySeason(season)" 
              :key="production.id" 
              class="production-card"
              @click="openGallery(production)"
            >
              <div class="production-card__image">
                <img 
                  :src="production.images[0]" 
                  :alt="production.title"
                  loading="lazy"
                >
              </div>
              <div class="production-card__content">
                <h3 class="production-card__title">{{ production.title }}</h3>
                <p class="production-card__count">
                  {{ production.images.length }} Photos
                  <span v-if="production.video">• 1 Video</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Modal -->
    <div v-if="selectedProduction" class="gallery-modal" @click="closeGallery">
      <div class="gallery-modal__content" @click.stop>
        <button class="gallery-modal__close" @click="closeGallery">×</button>
        
        <h2 class="gallery-modal__title">{{ selectedProduction.title }}</h2>
        
        <div class="gallery-modal__media">
          <!-- Image Gallery -->
          <div class="gallery-modal__images">
            <div class="gallery-modal__main-image">
              <img 
                :src="selectedProduction.images[currentImageIndex]" 
                :alt="selectedProduction.title"
              >
              <button 
                v-if="currentImageIndex > 0" 
                class="gallery-modal__nav gallery-modal__nav--prev"
                @click="previousImage"
              >
                ‹
              </button>
              <button 
                v-if="currentImageIndex < selectedProduction.images.length - 1" 
                class="gallery-modal__nav gallery-modal__nav--next"
                @click="nextImage"
              >
                ›
              </button>
            </div>
            
            <div class="gallery-modal__thumbnails">
              <div 
                v-for="(image, index) in selectedProduction.images" 
                :key="index"
                class="gallery-modal__thumbnail"
                :class="{ 'gallery-modal__thumbnail--active': index === currentImageIndex }"
                @click="currentImageIndex = index"
              >
                <img :src="image" :alt="`${selectedProduction.title} - Image ${index + 1}`">
              </div>
            </div>
          </div>

          <!-- Video Section -->
          <div v-if="selectedProduction.video" class="gallery-modal__video">
            <h3>Production Video</h3>
            <div class="video-container">
              <iframe 
                :src="selectedProduction.video" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { /*apiService, */type GalleryItem } from '@/services/api'

const productions = ref<GalleryItem[]>([])
const selectedSeason = ref('')
const selectedProduction = ref<GalleryItem | null>(null)
const currentImageIndex = ref(0)

// Mock data for development
productions.value = [
  {
    id: 1,
    season: '2023-2024',
    title: 'A Midsummer Night\'s Dream',
    images: [
      '/images/placeholder-production-1-1.jpg',
      '/images/placeholder-production-1-2.jpg',
      '/images/placeholder-production-1-3.jpg'
    ],
    video: 'https://www.youtube.com/embed/example1'
  },
  {
    id: 2,
    season: '2023-2024',
    title: 'The Music Man',
    images: [
      '/images/placeholder-production-2-1.jpg',
      '/images/placeholder-production-2-2.jpg'
    ]
  },
  {
    id: 3,
    season: '2022-2023',
    title: 'Death of a Salesman',
    images: [
      '/images/placeholder-production-3-1.jpg',
      '/images/placeholder-production-3-2.jpg',
      '/images/placeholder-production-3-3.jpg',
      '/images/placeholder-production-3-4.jpg'
    ],
    video: 'https://www.youtube.com/embed/example2'
  }
]

const seasons = computed(() => {
  const uniqueSeasons = new Set(productions.value.map(p => p.season))
  return Array.from(uniqueSeasons).sort().reverse()
})

const filteredSeasons = computed(() => {
  if (!selectedSeason.value) return seasons.value
  return [selectedSeason.value]
})

const getProductionsBySeason = (season: string) => {
  return productions.value.filter(p => p.season === season)
}

const openGallery = (production: GalleryItem) => {
  selectedProduction.value = production
  currentImageIndex.value = 0
  document.body.style.overflow = 'hidden'
}

const closeGallery = () => {
  selectedProduction.value = null
  document.body.style.overflow = ''
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const nextImage = () => {
  if (selectedProduction.value && currentImageIndex.value < selectedProduction.value.images.length - 1) {
    currentImageIndex.value++
  }
}
</script>

<style scoped>
.gallery {
  padding: var(--spacing-xl) 0;
}

.season-filter {
  margin-bottom: var(--spacing-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.season-filter label {
  color: var(--color-text);
}

body.dark-mode .season-filter label {
  color: var(--color-text-dark);
}

.season-select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background);
  color: var(--color-text);
}

body.dark-mode .season-select {
  background-color: var(--color-background-dark);
  color: var(--color-text-dark);
  border-color: var(--color-border-dark);
}

.season-section {
  margin-bottom: var(--spacing-xxl);
}

.season-title {
  color: var(--color-maroon);
  margin-bottom: var(--spacing-lg);
}

body.dark-mode .season-title {
  color: var(--color-maroon-light);
}

.production-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

.production-card {
  background-color: var(--color-card);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

body.dark-mode .production-card {
  background-color: var(--color-card-dark);
}

.production-card:hover {
  transform: translateY(-4px);
}

.production-card__image {
  height: 200px;
  overflow: hidden;
}

.production-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.production-card__content {
  padding: var(--spacing-md);
}

.production-card__title {
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
}

body.dark-mode .production-card__title {
  color: var(--color-text-dark);
}

.production-card__count {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

body.dark-mode .production-card__count {
  color: var(--color-text-secondary-dark);
}

/* Gallery Modal */
.gallery-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.gallery-modal__content {
  background-color: var(--color-background);
  border-radius: 8px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: var(--spacing-lg);
}

body.dark-mode .gallery-modal__content {
  background-color: var(--color-background-dark);
}

.gallery-modal__close {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  color: var(--color-text);
  cursor: pointer;
  padding: var(--spacing-xs);
}

body.dark-mode .gallery-modal__close {
  color: var(--color-text-dark);
}

.gallery-modal__title {
  color: var(--color-text);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

body.dark-mode .gallery-modal__title {
  color: var(--color-text-dark);
}

.gallery-modal__main-image {
  position: relative;
  margin-bottom: var(--spacing-md);
}

.gallery-modal__main-image img {
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
}

.gallery-modal__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: var(--font-size-2xl);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.gallery-modal__nav:hover {
  background: rgba(0, 0, 0, 0.8);
}

.gallery-modal__nav--prev {
  left: var(--spacing-md);
}

.gallery-modal__nav--next {
  right: var(--spacing-md);
}

.gallery-modal__thumbnails {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  overflow-x: auto;
  padding-bottom: var(--spacing-sm);
}

.gallery-modal__thumbnail {
  width: 80px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.gallery-modal__thumbnail--active {
  opacity: 1;
  box-shadow: 0 0 0 2px var(--color-maroon);
}

body.dark-mode .gallery-modal__thumbnail--active {
  box-shadow: 0 0 0 2px var(--color-maroon-light);
}

.gallery-modal__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-modal__video {
  margin-top: var(--spacing-xl);
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (min-width: 768px) {
  .production-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-lg);
  }
}

@media (min-width: 992px) {
  .production-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .gallery-modal__content {
    max-width: 80%;
  }
}

@media (min-width: 1200px) {
  .production-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style> 
