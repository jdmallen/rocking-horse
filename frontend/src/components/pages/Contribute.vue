<template>
  <div class="contribute">
    <div class="container">
      <h1 class="section-title">Support Rocking Horse Productions</h1>
      
      <!-- Membership Levels -->
      <section class="membership">
        <h2 class="subsection-title">Membership Levels</h2>
        <div class="membership-grid">
          <div v-for="level in membershipLevels" :key="level.name" class="membership-card">
            <h3 class="membership-card__title">{{ level.name }}</h3>
            <p class="membership-card__price">${{ level.price }}/year</p>
            <ul class="membership-card__benefits">
              <li v-for="benefit in level.benefits" :key="benefit">{{ benefit }}</li>
            </ul>
            <button class="button button--primary" @click="handleJoin(level)">
              Become a {{ level.name }}
            </button>
          </div>
        </div>
      </section>

      <!-- Corporate Sponsorship -->
      <section class="corporate">
        <h2 class="subsection-title">Corporate Sponsorship</h2>
        <div class="corporate-content">
          <div class="corporate-info">
            <p>Support community theatre while promoting your business. Our corporate sponsors receive:</p>
            <ul class="corporate-benefits">
              <li>Logo placement in all show programs</li>
              <li>Recognition on our website</li>
              <li>Social media mentions</li>
              <li>VIP tickets to performances</li>
              <li>Advertising opportunities</li>
            </ul>
            <button class="button button--primary" @click="handleCorporateInquiry">
              Inquire About Corporate Sponsorship
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface MembershipLevel {
  name: string
  price: number
  benefits: string[]
}

const membershipLevels = ref<MembershipLevel[]>([
  {
    name: 'Supporting Member',
    price: 50,
    benefits: [
      'Season program recognition',
      'Early access to ticket sales',
      'Quarterly newsletter'
    ]
  },
  {
    name: 'Patron',
    price: 100,
    benefits: [
      'All Supporting Member benefits',
      'Two complimentary tickets per season',
      'Invitation to season preview event'
    ]
  },
  {
    name: 'Benefactor',
    price: 250,
    benefits: [
      'All Patron benefits',
      'Four complimentary tickets per season',
      'VIP seating',
      'Behind-the-scenes tours'
    ]
  }
])

const handleJoin = (level: MembershipLevel) => {
  // TODO: Implement membership signup logic
  console.log('Join membership:', level)
}

const handleCorporateInquiry = () => {
  // TODO: Implement corporate inquiry logic
  console.log('Corporate inquiry')
}
</script>

<style scoped>
.contribute {
  padding: var(--spacing-xl) 0;
}

.subsection-title {
  color: var(--color-maroon);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

/* Membership Styles */
.membership {
  margin-bottom: var(--spacing-xxl);
}

.membership-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

.membership-card {
  background-color: var(--color-card);
  padding: var(--spacing-lg);
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

body.dark-mode .membership-card {
  background-color: var(--color-card-dark);
}

.membership-card__title {
  color: var(--color-maroon);
  margin-bottom: var(--spacing-sm);
}

body.dark-mode .membership-card__title {
  color: var(--color-maroon-light);
}

.membership-card__price {
  font-size: var(--font-size-xl);
  font-weight: bold;
  margin-bottom: var(--spacing-md);
  color: var(--color-text);
}

body.dark-mode .membership-card__price {
  color: var(--color-text-dark);
}

.membership-card__benefits {
  list-style: none;
  margin-bottom: var(--spacing-lg);
  color: var(--color-text);
}

body.dark-mode .membership-card__benefits {
  color: var(--color-text-dark);
}

/* Corporate Styles */
.corporate {
  margin-bottom: var(--spacing-xxl);
  text-align: center;
}

.corporate-content {
  max-width: 800px;
  margin: 0 auto;
}

.corporate-info {
  color: var(--color-text);
}

body.dark-mode .corporate-info {
  color: var(--color-text-dark);
}

.corporate-benefits {
  list-style: none;
  margin: var(--spacing-lg) 0;
  text-align: left;
  color: var(--color-text);
}

body.dark-mode .corporate-benefits {
  color: var(--color-text-dark);
}

.corporate-benefits li {
  margin-bottom: var(--spacing-sm);
  padding-left: var(--spacing-md);
  position: relative;
}

.corporate-benefits li::before {
  content: '•';
  color: var(--color-maroon);
  position: absolute;
  left: 0;
}

/* Button Styles */
.button {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 4px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button--primary {
  background-color: var(--color-maroon);
  color: white;
}

.button--primary:hover {
  background-color: var(--color-maroon-light);
}

.button--secondary {
  background-color: transparent;
  border: 2px solid var(--color-maroon);
  color: var(--color-maroon);
}

.button--secondary:hover {
  background-color: var(--color-maroon);
  color: white;
}

@media (min-width: 768px) {
  .membership-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .membership-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style> 
