<template>
  <div class="tickets">
    <div class="container">
      <h1 class="section-title">Get Your Tickets</h1>

      <!-- Current Show -->
      <section class="current-show" v-if="currentShow">
        <div class="show-banner">
          <img :src="currentShow.image" :alt="currentShow.title">
          <div class="show-banner__overlay">
            <h2 class="show-banner__title">{{ currentShow.title }}</h2>
            <p class="show-banner__dates">{{ formatDates(currentShow.dates) }}</p>
          </div>
        </div>

        <div class="show-info">
          <div class="show-info__description">
            <p>{{ currentShow.description }}</p>
          </div>

          <div class="show-info__details">
            <div class="info-card">
              <h3>Location</h3>
              <p>{{ currentShow.venue }}</p>
              <p>{{ currentShow.address }}</p>
            </div>
            <div class="info-card">
              <h3>Performance Times</h3>
              <ul class="performance-times">
                <li v-for="time in currentShow.times" :key="time">{{ time }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Ticket Options -->
      <section class="ticket-options">
        <h2 class="subsection-title">Select Your Tickets</h2>
        
        <div class="ticket-grid">
          <div v-for="option in ticketOptions" :key="option.type" class="ticket-card">
            <div class="ticket-card__content">
              <h3 class="ticket-card__type">{{ option.type }}</h3>
              <p class="ticket-card__price">${{ option.price }}</p>
              <p class="ticket-card__description">{{ option.description }}</p>
              
              <div class="ticket-card__quantity">
                <label :for="'quantity-' + option.type">Quantity:</label>
                <div class="quantity-control">
                  <button 
                    class="quantity-button"
                    @click="decreaseQuantity(option)"
                    :disabled="option.quantity <= 0"
                  >
                    -
                  </button>
                  <input 
                    :id="'quantity-' + option.type"
                    type="number"
                    v-model="option.quantity"
                    min="0"
                    max="10"
                  >
                  <button 
                    class="quantity-button"
                    @click="increaseQuantity(option)"
                    :disabled="option.quantity >= 10"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="order-summary" v-if="hasTickets">
          <h3>Order Summary</h3>
          <div class="summary-items">
            <div v-for="option in ticketOptions" :key="option.type" class="summary-item" v-if="option.quantity > 0">
              <span>{{ option.type }} ({{ option.quantity }})</span>
              <span>${{ (option.price * option.quantity).toFixed(2) }}</span>
            </div>
          </div>
          <div class="summary-total">
            <span>Total</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
          <button class="button button--primary button--large" @click="proceedToCheckout">
            Proceed to Checkout
          </button>
        </div>
      </section>

      <!-- Additional Information -->
      <section class="additional-info">
        <div class="info-grid">
          <div class="info-card">
            <h3>Group Sales</h3>
            <p>Planning to bring a group of 10 or more? Contact us for special group rates and arrangements.</p>
            <a href="mailto:groups@rockinghorseproductions.com" class="button button--secondary">
              Contact Group Sales
            </a>
          </div>
          
          <div class="info-card">
            <h3>Accessibility</h3>
            <p>Our theatre is fully accessible. Please let us know if you need any special accommodations.</p>
            <router-link to="/accessibility" class="button button--secondary">
              Learn More
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { type Show } from '@/services/api'

interface TicketOption {
  type: string
  price: number
  description: string
  quantity: number
}

const currentShow = ref<Show>({
  id: 1,
  title: "Romeo and Juliet",
  description: "Shakespeare's timeless tale of star-crossed lovers",
  dates: ["2024-04-15", "2024-04-16", "2024-04-17"],
  image: "/images/romeo-juliet.jpg",
  venue: "Main Theater",
  address: "123 Theater Street",
  times: ["19:30", "14:00"],
  ticketLink: "/tickets/romeo-juliet"
})

const ticketOptions = ref<TicketOption[]>([
  {
    type: 'Adult',
    price: 25.00,
    description: 'Regular admission for ages 18+',
    quantity: 0
  },
  {
    type: 'Senior',
    price: 20.00,
    description: 'Ages 65+ with valid ID',
    quantity: 0
  },
  {
    type: 'Student',
    price: 15.00,
    description: 'Valid student ID required',
    quantity: 0
  },
  {
    type: 'Child',
    price: 12.00,
    description: 'Ages 12 and under',
    quantity: 0
  }
])

const formatDates = (dates: string[]): string => {
  return dates.join(' • ')
}

const hasTickets = computed(() => {
  return ticketOptions.value.some(option => option.quantity > 0)
})

const total = computed(() => {
  return ticketOptions.value.reduce((sum, option) => {
    return sum + (option.price * option.quantity)
  }, 0)
})

const increaseQuantity = (option: TicketOption) => {
  if (option.quantity < 10) {
    option.quantity++
  }
}

const decreaseQuantity = (option: TicketOption) => {
  if (option.quantity > 0) {
    option.quantity--
  }
}

const proceedToCheckout = () => {
  // TODO: Implement checkout logic
  console.log('Proceeding to checkout with total:', total.value)
}
</script>

<style scoped>
.tickets {
  padding: var(--spacing-xl) 0;
}

/* Current Show Styles */
.show-banner {
  position: relative;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: var(--spacing-xl);
}

.show-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.show-banner__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-xl);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
}

.show-banner__title {
  font-size: var(--font-size-xxl);
  margin-bottom: var(--spacing-sm);
}

.show-info {
  margin-bottom: var(--spacing-xxl);
}

.show-info__description {
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
  color: var(--color-text);
}

body.dark-mode .show-info__description {
  color: var(--color-text-dark);
}

.show-info__details {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

/* Ticket Options Styles */
.ticket-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.ticket-card {
  background-color: var(--color-card);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

body.dark-mode .ticket-card {
  background-color: var(--color-card-dark);
}

.ticket-card__content {
  padding: var(--spacing-lg);
}

.ticket-card__type {
  color: var(--color-maroon);
  margin-bottom: var(--spacing-xs);
}

body.dark-mode .ticket-card__type {
  color: var(--color-maroon-light);
}

.ticket-card__price {
  font-size: var(--font-size-xl);
  font-weight: bold;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
}

body.dark-mode .ticket-card__price {
  color: var(--color-text-dark);
}

.ticket-card__description {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

body.dark-mode .ticket-card__description {
  color: var(--color-text-secondary-dark);
}

.ticket-card__quantity {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  color: var(--color-text);
}

body.dark-mode .ticket-card__quantity {
  color: var(--color-text-dark);
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.quantity-button {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
}

body.dark-mode .quantity-button {
  background-color: var(--color-background-dark);
  color: var(--color-text-dark);
  border-color: var(--color-border-dark);
}

.quantity-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input[type="number"] {
  width: 50px;
  text-align: center;
  padding: var(--spacing-xs);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background);
  color: var(--color-text);
}

body.dark-mode input[type="number"] {
  background-color: var(--color-background-dark);
  color: var(--color-text-dark);
  border-color: var(--color-border-dark);
}

/* Order Summary Styles */
.order-summary {
  background-color: var(--color-card);
  padding: var(--spacing-lg);
  border-radius: 8px;
  margin-top: var(--spacing-xl);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

body.dark-mode .order-summary {
  background-color: var(--color-card-dark);
}

.order-summary h3 {
  color: var(--color-maroon);
  margin-bottom: var(--spacing-md);
}

body.dark-mode .order-summary h3 {
  color: var(--color-maroon-light);
}

.summary-items {
  margin-bottom: var(--spacing-md);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
}

body.dark-mode .summary-item {
  color: var(--color-text-dark);
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
  margin-bottom: var(--spacing-lg);
  color: var(--color-text);
}

body.dark-mode .summary-total {
  color: var(--color-text-dark);
  border-color: var(--color-border-dark);
}

/* Additional Info Styles */
.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

.info-card {
  background-color: var(--color-card);
  padding: var(--spacing-lg);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

body.dark-mode .info-card {
  background-color: var(--color-card-dark);
}

.info-card h3 {
  color: var(--color-maroon);
  margin-bottom: var(--spacing-md);
}

body.dark-mode .info-card h3 {
  color: var(--color-maroon-light);
}

.info-card p {
  color: var(--color-text);
  line-height: 1.6;
}

body.dark-mode .info-card p {
  color: var(--color-text-dark);
}

/* Button Styles */
.button {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
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

.button--large {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}

@media (min-width: 768px) {
  .show-info__details {
    grid-template-columns: repeat(2, 1fr);
  }

  .ticket-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .ticket-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style> 
