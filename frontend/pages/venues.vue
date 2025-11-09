<template>
	<div>
		<h1>Venues Collection</h1>

		<div v-if="pending">
			<p>Loading...</p>
		</div>

		<div v-else-if="error">
			<p>Error loading venues: {{ error.message }}</p>
		</div>

		<div v-else>
			<p>Found {{ data?.length || 0 }} venues</p>

			<div v-if="data && data.length > 0">
				<h2>Venue Cards</h2>
				<div class="venues-grid">
					<VenueCard
						v-for="venue in data"
						:key="venue.id"
						:venue="venue"
						display="card"
						@open-modal="openModal(venue)"
					/>
				</div>

				<h2>Venues List</h2>
				<div class="venues-list">
					<VenueCard
						v-for="venue in data"
						:key="venue.id"
						:venue="venue"
						display="list"
						@open-modal="openModal(venue)"
					/>
				</div>
			</div>

			<div v-else>
				<p>No venues found in the collection.</p>
			</div>
		</div>

		<!-- Modal -->
		<div v-if="selectedVenue" class="modal-overlay" @click="closeModal">
			<div class="modal-content" @click.stop>
				<button class="modal-close" @click="closeModal">&times;</button>
				<VenueCard
					:venue="selectedVenue"
					display="modal"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { getVenues } from '~/services/directus';

const { data, pending, error } = await useAsyncData('venues', () => getVenues());

const selectedVenue = ref(null);

function openModal(venue) {
	selectedVenue.value = venue;
}

function closeModal() {
	selectedVenue.value = null;
}
</script>

<style scoped>
.venues-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 1rem;
	margin-bottom: 2rem;
}

.venues-list {
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