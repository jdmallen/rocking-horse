<template>
  <div class="about">
    <div class="container">
      <h1 class="section-title">About Rocking Horse Productions</h1>

      <!-- History Section -->
      <section class="history">
        <h2 class="subsection-title">Our History</h2>
        <div class="history-content">
          <div class="history-image">
            <img src="@/assets/images/theatre-placeholder.jpg" alt="Historic theatre photo">
          </div>
          <div class="history-text">
            <p>Founded in 2004, Rocking Horse Productions has been bringing quality community theatre to our region for over 20 years. What started as a small group of passionate theatre enthusiasts has grown into a vibrant community of artists, technicians, and volunteers.</p>
            <p>Over the years, we've produced more than 80 shows, ranging from classic dramas to contemporary musicals, providing opportunities for local talent to shine and bringing diverse theatrical experiences to our audience.</p>
            <p>Our commitment to artistic excellence and community engagement has earned us recognition and numerous awards from regional theatre organizations.</p>
          </div>
        </div>
      </section>

      <!-- Mission Section -->
      <section class="mission">
        <h2 class="subsection-title">Our Mission</h2>
        <div class="mission-content">
          <blockquote class="mission-statement">
            To enrich our community through the transformative power of live theatre, providing opportunities for artistic expression, education, and entertainment.
          </blockquote>
          <div class="mission-values">
            <div v-for="value in values" :key="value.title" class="value-card">
              <h3 class="value-card__title">{{ value.title }}</h3>
              <p class="value-card__description">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="team">
        <h2 class="subsection-title">Meet Our Team</h2>
        <div class="team-grid">
          <div v-for="member in teamMembers" :key="member.id" class="team-card">
            <div class="team-card__image">
              <img :src="`@/assets/images/team-${member.id}.jpg`" :alt="member.name">
            </div>
            <div class="team-card__content">
              <h3 class="team-card__name">{{ member.name }}</h3>
              <p class="team-card__role">{{ member.role }}</p>
              <p class="team-card__bio">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Join Us Section -->
      <section class="join-us">
        <h2 class="subsection-title">Join Our Theatre Family</h2>
        <div class="join-us-content">
          <p>Whether you're interested in performing, working backstage, or supporting our mission, there's a place for you at Rocking Horse Productions.</p>
          <div class="join-us-buttons">
            <router-link to="/contribute" class="button button--primary">
              Become a Member
            </router-link>
            <router-link to="/shows#auditions" class="button button--secondary">
              Audition Information
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Value {
  title: string
  description: string
}

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
}

const values = ref<Value[]>([
  {
    title: 'Artistic Excellence',
    description: 'Striving for the highest quality in every production while nurturing creativity and innovation.'
  },
  {
    title: 'Community Engagement',
    description: 'Creating inclusive spaces where diverse voices can be heard and celebrated through theatre.'
  },
  {
    title: 'Education',
    description: 'Providing learning opportunities for all ages to develop theatrical skills and appreciation.'
  },
  {
    title: 'Collaboration',
    description: 'Fostering a supportive environment where artists and volunteers work together to create magic.'
  }
])

const teamMembers = ref<TeamMember[]>([
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Artistic Director',
    bio: 'With over 20 years of theatre experience, Sarah has directed more than 30 productions and brings a passion for storytelling to every show.',
    image: '/images/placeholder-team-1.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Technical Director',
    bio: 'Michael&apos;s innovative approach to stage design and technical solutions has elevated our productions for the past 8 years.',
    image: '/images/placeholder-team-2.jpg'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Education Coordinator',
    bio: 'Emily leads our youth theatre program and workshop series, inspiring the next generation of theatre artists.',
    image: '/images/placeholder-team-3.jpg'
  }
])
</script>

<style scoped>
.about {
  padding: var(--spacing-xl) 0;
}

/* History Styles */
.history {
  margin-bottom: var(--spacing-xxl);
}

.history-content {
  display: grid;
  gap: var(--spacing-xl);
}

.history-image {
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--color-card);
}

.history-image img {
  width: 100%;
  height: auto;
  opacity: 0.9;
}

.history-text p {
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

/* Mission Styles */
.mission {
  margin-bottom: var(--spacing-xxl);
}

.mission-statement {
  font-size: var(--font-size-lg);
  font-style: italic;
  color: var(--color-maroon);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  border-left: 4px solid var(--color-maroon);
  background-color: var(--color-card);
}

.mission-values {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

.value-card {
  padding: var(--spacing-lg);
  background-color: var(--color-card);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

body.dark-mode .value-card {
  background-color: var(--color-card-dark);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

body.dark-mode .value-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.value-card__title {
  color: var(--color-maroon);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
}

body.dark-mode .value-card__title {
  color: var(--color-maroon-light);
}

.value-card__description {
  color: var(--color-text);
  line-height: 1.5;
}

body.dark-mode .value-card__description {
  color: var(--color-text-dark);
}

/* Team Styles */
.team {
  margin-bottom: var(--spacing-xxl);
}

.team-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
}

.team-card {
  background-color: var(--color-card);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.team-card__image {
  height: 300px;
  overflow: hidden;
}

.team-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-card__content {
  padding: var(--spacing-lg);
}

.team-card__name {
  color: var(--color-maroon);
  margin-bottom: var(--spacing-xs);
}

.team-card__role {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.team-card__bio {
  line-height: 1.6;
}

/* Join Us Styles */
.join-us {
  text-align: center;
}

.join-us-content {
  max-width: 800px;
  margin: 0 auto;
}

.join-us-content p {
  margin-bottom: var(--spacing-lg);
}

.join-us-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

/* Button Styles */
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
  .history-content {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .mission-values {
    grid-template-columns: repeat(2, 1fr);
  }

  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .mission-values {
    grid-template-columns: repeat(4, 1fr);
  }

  .team-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style> 
