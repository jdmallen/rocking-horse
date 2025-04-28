<template>
  <div class="shows">
    <div class="container">
      <h1 class="section-title">Current Season 2024-2025</h1>
      
      <!-- Current Shows -->
      <section class="current-shows">
        <h2 class="subsection-title">Current Shows</h2>
        <div class="shows-grid">
          <article v-for="show in shows" :key="show.id" class="show-card">
            <div class="show-card__image">
              <img :src="show.image" :alt="show.title">
            </div>
            <div class="show-card__content">
              <h2 class="show-card__title">{{ show.title }}</h2>
              <p class="show-card__dates">
                {{ formatDates(show.dates) }}
              </p>
              <p class="show-card__description">{{ show.description }}</p>
              <div class="show-card__actions">
                <a :href="show.ticketLink" class="button button--primary" target="_blank" rel="noopener">
                  Get Tickets
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Auditions Section -->
      <section class="auditions">
        <h2 class="subsection-title">Upcoming Auditions</h2>
        <div class="auditions-grid">
          <div v-for="audition in auditions" :key="audition.id" class="audition-card">
            <div class="audition-card__header">
              <h3 class="audition-card__title">{{ audition.show }}</h3>
              <p class="audition-card__dates">{{ audition.dates }}</p>
            </div>
            <div class="audition-card__content">
              <p class="audition-card__description">{{ audition.description }}</p>
              <div class="audition-card__details">
                <p><strong>Director:</strong> {{ audition.director }}</p>
                <p><strong>Location:</strong> {{ audition.location }}</p>
                <p><strong>Requirements:</strong> {{ audition.requirements }}</p>
              </div>
              <button class="button button--secondary" @click="handleAuditionSignup(audition)">
                Sign Up for Audition
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService, type Show } from '@/services/api'

interface Audition {
  id: number
  show: string
  dates: string
  description: string
  director: string
  location: string
  requirements: string
}

const shows = ref<Show[]>([])
const auditions = ref<Audition[]>([
  {
    id: 1,
    show: 'The Glass Menagerie',
    dates: 'May 15-16, 2024',
    description: 'Seeking actors for Tennessee Williams\' classic memory play.',
    director: 'Sarah Johnson',
    location: 'Community Theatre Studio',
    requirements: 'Please prepare a 2-minute dramatic monologue'
  }
])

const formatDates = (dates: string[]): string => {
  return dates.join(' • ')
}

const handleAuditionSignup = (audition: Audition) => {
  // TODO: Implement audition signup logic
  console.log('Audition signup:', audition)
}

onMounted(async () => {
  try {
    shows.value = await apiService.getCurrentShows()
  } catch (error) {
    console.error('Error fetching shows:', error)
    // Mock data for development
    shows.value = [
      {
        id: 1,
        title: 'The Importance of Being Earnest',
        description: 'Oscar Wilde\'s witty comedy about the lives of two men who use the same pseudonym, leading to an elaborate deception and a series of crises.',
        dates: ['April 12-14, 2024', 'April 19-21, 2024'],
        image: '/images/placeholder-show-1.jpg',
        ticketLink: '#'
      },
      {
        id: 2,
        title: 'Our Town',
        description: 'Thornton Wilder\'s Pulitzer Prize-winning play that tells the story of the fictional American small town of Grover\'s Corners.',
        dates: ['June 7-9, 2024', 'June 14-16, 2024'],
        image: '/images/placeholder-show-2.jpg',
        ticketLink: '#'
      }
    ]
  }
})
</script>

<style scoped>
.shows {
  padding: var(--spacing-xl) 0;
}

.shows-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
}

.show-card {
  background-color: var(--color-card);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

body.dark-mode .show-card {
  background-color: var(--color-card-dark);
}

.show-card__image {
  height: 300px;
  overflow: hidden;
}

.show-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.show-card__content {
  padding: var(--spacing-lg);
}

.show-card__title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
  color: var(--color-maroon);
}

body.dark-mode .show-card__title {
  color: var(--color-maroon-light);
}

.show-card__dates {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

body.dark-mode .show-card__dates {
  color: var(--color-text-secondary-dark);
}

.show-card__description {
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
  color: var(--color-text);
}

body.dark-mode .show-card__description {
  color: var(--color-text-dark);
}

.show-card__actions {
  display: flex;
  justify-content: flex-end;
}

.button {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.button--primary {
  background-color: var(--color-maroon);
  color: white;
}

.button--primary:hover {
  background-color: var(--color-maroon-light);
}

@media (min-width: 768px) {
  .shows-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .show-card {
    display: flex;
  }

  .show-card__image {
    flex: 0 0 40%;
    height: auto;
  }

  .show-card__content {
    flex: 1;
    padding: var(--spacing-xl);
  }
}

/* Auditions Styles */
.auditions {
  margin-top: var(--spacing-xxl);
}

.auditions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
}

.audition-card {
  background-color: var(--color-card);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-lg);
}

body.dark-mode .audition-card {
  background-color: var(--color-card-dark);
}

.audition-card__header {
  margin-bottom: var(--spacing-md);
}

.audition-card__title {
  color: var(--color-maroon);
  margin-bottom: var(--spacing-xs);
}

body.dark-mode .audition-card__title {
  color: var(--color-maroon-light);
}

.audition-card__dates {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

body.dark-mode .audition-card__dates {
  color: var(--color-text-secondary-dark);
}

.audition-card__description {
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.audition-card__details {
  margin-bottom: var(--spacing-lg);
}

.audition-card__details p {
  margin-bottom: var(--spacing-sm);
}

.audition-card__details strong {
  color: var(--color-maroon);
}

body.dark-mode .audition-card__details strong {
  color: var(--color-maroon-light);
}

@media (min-width: 768px) {
  .auditions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .auditions-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style> 
