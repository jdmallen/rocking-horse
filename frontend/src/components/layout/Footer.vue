<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <div class="footer__section">
          <h3 class="footer__title">Newsletter</h3>
          <form class="newsletter-form" @submit.prevent="handleNewsletterSubmit">
            <div class="newsletter-form__group">
              <input
                type="email"
                v-model="email"
                placeholder="Enter your email"
                class="newsletter-form__input"
                required
              >
              <button type="submit" class="newsletter-form__button">Subscribe</button>
            </div>
          </form>
        </div>
        
        <div class="footer__section">
          <h3 class="footer__title">Follow Us</h3>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook">
              <span class="social-icon">📘</span>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <span class="social-icon">🐦</span>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <span class="social-icon">📸</span>
            </a>
            <a href="#" class="social-link" aria-label="YouTube">
              <span class="social-icon">▶️</span>
            </a>
          </div>
        </div>
        
        <div class="footer__section">
          <h3 class="footer__title">Contact</h3>
          <p class="footer__text">
            Rocking Horse Productions<br>
            123 Theatre Street<br>
            City, State 12345<br>
            <a href="mailto:info@rockinghorseproductions.com">info@rockinghorseproductions.com</a>
          </p>
        </div>
      </div>
      
      <div class="footer__bottom">
        <p class="footer__copyright">
          &copy; {{ currentYear }} Rocking Horse Productions. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const currentYear = new Date().getFullYear()

const handleNewsletterSubmit = () => {
  // TODO: Implement newsletter signup logic
  console.log('Newsletter signup:', email.value)
  email.value = ''
}
</script>

<style scoped>
.footer {
  background-color: var(--color-card);
  padding: var(--spacing-xl) 0 var(--spacing-md);
  margin-top: var(--spacing-xxl);
}

.footer__content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.footer__section {
  text-align: center;
}

.footer__title {
  color: var(--color-maroon);
  margin-bottom: var(--spacing-md);
}

.newsletter-form__group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  max-width: 400px;
  margin: 0 auto;
}

.newsletter-form__input {
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: var(--font-size-md);
}

.newsletter-form__button {
  background-color: var(--color-maroon);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.newsletter-form__button:hover {
  background-color: var(--color-maroon-light);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

.social-link {
  display: inline-block;
  padding: var(--spacing-sm);
  transition: transform 0.3s ease;
}

.social-link:hover {
  transform: scale(1.1);
}

.social-icon {
  font-size: var(--font-size-xl);
}

.footer__text {
  color: var(--color-text-secondary);
}

.footer__bottom {
  text-align: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.footer__copyright {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

@media (min-width: 768px) {
  .footer__content {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .newsletter-form__group {
    flex-direction: row;
  }
  
  .newsletter-form__input {
    flex: 1;
  }
}
</style> 
