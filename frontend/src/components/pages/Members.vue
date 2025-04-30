<template>
  <div class="members">
    <div class="container">
      <h1 class="section-title">Our Supporters</h1>
      
      <!-- Corporate Sponsors -->
      <section class="sponsors">
        <h2 class="subsection-title">Corporate Sponsors</h2>
        <div class="sponsors-grid">
          <div v-for="sponsor in corporateSponsors" :key="sponsor.id" class="sponsor-card">
            <div class="sponsor-card__logo">
              <img :src="sponsor.logo" :alt="sponsor.name">
            </div>
            <div class="sponsor-card__content">
              <h3 class="sponsor-card__name">{{ sponsor.name }}</h3>
              <p class="sponsor-card__level">{{ sponsor.level }}</p>
              <p class="sponsor-card__description">{{ sponsor.description }}</p>
              <a :href="sponsor.website" class="link link-secondary" target="_blank" rel="noopener">
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Individual Members -->
      <section class="individual-members">
        <h2 class="subsection-title">Individual Members</h2>
        
        <!-- Benefactors -->
        <div class="member-section">
          <h3 class="member-level">Benefactors</h3>
          <div class="member-grid">
            <div v-for="member in getBenefactors" :key="member.id" class="member-card">
              <div v-if="member.image" class="member-card__image">
                <img :src="member.image" :alt="member.name">
              </div>
              <div class="member-card__content">
                <h4 class="member-card__name">{{ member.name }}</h4>
                <p v-if="member.memberSince" class="member-card__since">
                  Member since {{ member.memberSince }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Patrons -->
        <div class="member-section">
          <h3 class="member-level">Patrons</h3>
          <div class="member-grid">
            <div v-for="member in getPatrons" :key="member.id" class="member-card">
              <div class="member-card__content">
                <h4 class="member-card__name">{{ member.name }}</h4>
                <p v-if="member.memberSince" class="member-card__since">
                  Member since {{ member.memberSince }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Supporting Members -->
        <div class="member-section">
          <h3 class="member-level">Supporting Members</h3>
          <div class="member-grid">
            <div v-for="member in getSupportingMembers" :key="member.id" class="member-card">
              <div class="member-card__content">
                <h4 class="member-card__name">{{ member.name }}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { /*apiService, */type Member } from '@/services/api'

interface CorporateSponsor {
  id: number
  name: string
  level: string
  description: string
  logo: string
  website: string
}

const members = ref<Member[]>([])
const corporateSponsors = ref<CorporateSponsor[]>([
  {
    id: 1,
    name: 'Local Business Co.',
    level: 'Gold Sponsor',
    description: 'Proud supporter of community theatre since 2020.',
    logo: '/images/placeholder-sponsor-1.jpg',
    website: '#'
  },
  {
    id: 2,
    name: 'Community Bank',
    level: 'Silver Sponsor',
    description: 'Supporting arts and culture in our community.',
    logo: '/images/placeholder-sponsor-2.jpg',
    website: '#'
  }
])

// Mock data for development
members.value = [
  {
    id: 1,
    name: 'John & Jane Smith',
    level: 'Benefactor',
    image: '/images/placeholder-member-1.jpg',
    memberSince: '2018'
  },
  {
    id: 2,
    name: 'Robert Johnson',
    level: 'Patron',
    memberSince: '2020'
  },
  {
    id: 3,
    name: 'Sarah Williams',
    level: 'Supporting Member'
  }
]

const getBenefactors = computed(() => 
  members.value.filter(member => member.level === 'Benefactor')
)

const getPatrons = computed(() => 
  members.value.filter(member => member.level === 'Patron')
)

const getSupportingMembers = computed(() => 
  members.value.filter(member => member.level === 'Supporting Member')
)
</script>

<style scoped>
.members {
  padding: var(--spacing-xl) 0;
}

.subsection-title {
  color: var(--color-maroon);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

/* Sponsors Styles */
.sponsors {
  margin-bottom: var(--spacing-xxl);
}

.sponsors-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

.sponsor-card {
  background-color: var(--color-card);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

body.dark-mode .sponsor-card {
  background-color: var(--color-card-dark);
}

.sponsor-card__logo {
  height: 200px;
  overflow: hidden;
  background-color: white;
}

.sponsor-card__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: var(--spacing-md);
}

.sponsor-card__content {
  padding: var(--spacing-lg);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.sponsor-card__name {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xs);
  color: var(--color-maroon);
}

body.dark-mode .sponsor-card__name {
  color: var(--color-maroon-light);
}

.sponsor-card__level {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

body.dark-mode .sponsor-card__level {
  color: var(--color-text-secondary-dark);
}

.sponsor-card__description {
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
  color: var(--color-text);
}

body.dark-mode .sponsor-card__description {
  color: var(--color-text-dark);
}

.sponsor-card__link {
  color: var(--color-maroon);
  text-decoration: none;
  margin-top: auto;
  font-weight: 500;
  transition: color 0.3s ease;
}

body.dark-mode .sponsor-card__link {
  color: var(--color-maroon-light);
}

.sponsor-card__link:hover {
  color: var(--color-maroon-dark);
}

body.dark-mode .sponsor-card__link:hover {
  color: var(--color-maroon);
}

/* Member Styles */
.member-section {
  margin-bottom: var(--spacing-xl);
}

.member-level {
  color: var(--color-maroon);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

body.dark-mode .member-level {
  color: var(--color-maroon-light);
}

.member-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.member-card {
  background-color: var(--color-card);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

body.dark-mode .member-card {
  background-color: var(--color-card-dark);
}

.member-card__image {
  height: 200px;
  overflow: hidden;
}

.member-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-card__content {
  padding: var(--spacing-md);
}

.member-card__name {
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

body.dark-mode .member-card__name {
  color: var(--color-text-dark);
}

.member-card__since {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

body.dark-mode .member-card__since {
  color: var(--color-text-secondary-dark);
}

@media (min-width: 768px) {
  .sponsors-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .sponsors-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style> 
