<template>
	<div>
		<h1>People Collection</h1>
		
		<div v-if="pending">
			<p>Loading...</p>
		</div>
		
		<div v-else-if="error">
			<p>Error loading people: {{ error.message }}</p>
		</div>
		
		<div v-else>
			<p>Found {{ data?.length || 0 }} people</p>
			
			<div v-if="data && data.length > 0">
				<h2>People Cards</h2>
				<div class="people-grid">
					<PersonCard 
						v-for="person in data" 
						:key="person.id"
						:person="person"
						display="card"
						@open-modal="openModal(person)"
					/>
				</div>
				
				<h2>People List</h2>
				<div class="people-list">
					<PersonCard 
						v-for="person in data" 
						:key="person.id"
						:person="person"
						display="list"
						@open-modal="openModal(person)"
					/>
				</div>
			</div>
			
			<div v-else>
				<p>No people found in the collection.</p>
			</div>
		</div>

		<!-- Modal -->
		<div v-if="selectedPerson" class="modal-overlay" @click="closeModal">
			<div class="modal-content" @click.stop>
				<button class="modal-close" @click="closeModal">&times;</button>
				<PersonCard 
					:person="selectedPerson"
					display="modal"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { getPeople } from '~/services/directus';

const { data, pending, error } = await useAsyncData('people', () => getPeople());

const selectedPerson = ref(null);

function openModal(person) {
	selectedPerson.value = person;
}

function closeModal() {
	selectedPerson.value = null;
}
</script>

<style scoped>
.people-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 1rem;
	margin-bottom: 2rem;
}

.people-list {
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	overflow: hidden;
}

.modal-overlay {
	position: fixed;
	inset: 0;
	background: rgb(0 0 0 / 50%);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	padding: 1rem;
}

.modal-content {
	background: white;
	border-radius: 12px;
	padding: 2rem;
	position: relative;
	max-height: 90vh;
	overflow-y: auto;
}

.modal-close {
	position: absolute;
	top: 1rem;
	right: 1rem;
	background: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;
	color: #6b7280;
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: background-color 0.2s;
}

.modal-close:hover {
	background: #f3f4f6;
}
</style>
