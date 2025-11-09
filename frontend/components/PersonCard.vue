<template>
	<!-- List Form -->
	<div
		v-if="display === 'list'"
		class="person-list-item"
		@click="$emit('open-modal')"
	>
		{{ displayName }}
	</div>

	<!-- Card Form -->
	<div
		v-else-if="display === 'card'"
		class="person-card"
		@click="$emit('open-modal')"
	>
		<div class="person-card-image">
			<ClientOnly>
				<img
					v-if="person.headshot"
					:src="headshotUrl"
					:alt="displayName"
					class="headshot"
					@error="console.log('Image failed to load:', headshotUrl)"
					@load="console.log('Image loaded successfully:', headshotUrl)"
				>
				<div v-else class="headshot-placeholder">
					<span>No Photo</span>
				</div>
			</ClientOnly>
			<div class="person-card-name">
				{{ displayName }}
			</div>
		</div>
	</div>

	<!-- Modal Form -->
	<div v-else-if="display === 'modal'" class="person-modal">
		<div class="person-modal-content">
			<div class="person-modal-image">
				<img
					v-if="person.headshot"
					:src="headshotUrl"
					:alt="displayName"
					class="modal-headshot clickable-image"
					@click="showLargeImage = true"
					@error="console.log('Modal image failed to load:', headshotUrl)"
					@load="console.log('Modal image loaded successfully:', headshotUrl)"
				>
				<div v-else class="modal-headshot-placeholder">
					<span>No Photo</span>
				</div>
			</div>
			<div class="person-modal-details">
				<div v-for="field in visibleFields" :key="field.key" class="detail-row">
					<span class="detail-label">{{ field.label }}:</span>
					<span class="detail-value">{{ field.value }}</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Large Image Overlay -->
	<div v-if="showLargeImage" class="image-overlay" @click="showLargeImage = false">
		<div class="large-image-container" @click.stop>
			<img
				:src="headshotUrl"
				:alt="displayName"
				class="large-image"
			>
			<button
				class="close-button"
				aria-label="Close large image"
				@click="showLargeImage = false"
			>
				×
			</button>
		</div>
	</div>
</template>

<script setup>
import { getAssetUrl } from '~/services/directus';

const props = defineProps({
	person: {
		type: Object,
		required: true,
	},
	display: {
		type: String,
		default: 'list',
		validator: (value) => ['list', 'card', 'modal'].includes(value),
	},
});

defineEmits(['open-modal']);

const showLargeImage = ref(false);

const displayName = computed(() => {
	return props.person.preferred_display_name || `${props.person.first_name} ${props.person.last_name}`;
});

const headshotUrl = computed(() => {
	return getAssetUrl(props.person.headshot);
});

const visibleFields = computed(() => {
	const excludedFields = ['id', 'sort', 'user_created', 'date_created', 'user_updated', 'date_updated', 'is_hidden', 'headshot'];
	const fieldLabels = {
		first_name: 'First Name',
		last_name: 'Last Name',
		middle_name: 'Middle Name',
		preferred_display_name: 'Preferred Name',
		email: 'Email',
		phone_number: 'Phone',
		bio: 'Bio',
		year_joined: 'Year Joined',
	};

	const fields = [];

	// Add name field first
	fields.push({
		key: 'name',
		label: 'Name',
		value: displayName.value,
	});

	// Add other fields
	Object.keys(props.person).forEach(key => {
		if (!excludedFields.includes(key) && props.person[key] && key !== 'preferred_display_name' && key !== 'first_name' && key !== 'last_name') {
			fields.push({
				key,
				label: fieldLabels[key] || key,
				value: props.person[key],
			});
		}
	});

	return fields;
});
</script>

<style scoped>
	.person-list-item {
	padding: 0.5rem;
	border-bottom: 0.0625rem solid #e5e7eb;
	cursor: pointer;
	transition: background-color 0.2s;
}

.person-list-item:hover {
	background-color: #f9fafb;
}

.person-card {
	position: relative;
	width: 100%;
	max-width: min(18.75rem, 100vw);
	aspect-ratio: 1;
	cursor: pointer;
	border-radius: 0.5rem;
	overflow: hidden;
	box-shadow: 0 0.25rem 0.375rem -0.0625rem rgb(0 0 0 / 10%);
	transition: transform 0.2s;
}

.person-card:hover {
	transform: scale(1.02);
}

.person-card-image {
	position: relative;
	width: 100%;
	height: 100%;
}

.headshot, .headshot-placeholder {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.headshot-placeholder {
	background: #f3f4f6;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #6b7280;
}

.person-card-name {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgb(255 255 255 / 90%);
	padding: 0.75rem;
	text-align: center;
	font-weight: 600;
	backdrop-filter: blur(0.25rem);
}

.person-modal-content {
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 2rem;
	max-width: 50rem;
	width: 100%;
}

.modal-headshot, .modal-headshot-placeholder {
	width: 100%;
	aspect-ratio: 1;
	object-fit: cover;
	border-radius: 0.5rem;
}

.modal-headshot-placeholder {
	background: #f3f4f6;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #6b7280;
}

.person-modal-details {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.detail-row {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.detail-label {
	font-weight: 600;
	color: #374151;
	font-size: 0.875rem;
}

.detail-value {
	color: #1f2937;
}

.clickable-image {
	cursor: pointer;
	transition: opacity 0.2s;
}

.clickable-image:hover {
	opacity: 0.8;
}

.image-overlay {
	position: fixed;
	inset: 0;
	background: rgb(0 0 0 / 80%);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	cursor: pointer;
}

.large-image-container {
	position: relative;
	max-width: 90vw;
	max-height: 90vh;
	cursor: auto;
}

.large-image {
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
	border-radius: 0.5rem;
}

.close-button {
	position: absolute;
	top: -0.625rem;
	right: -0.625rem;
	background: #fff;
	border: none;
	border-radius: 50%;
	width: 2rem;
	height: 2rem;
	font-size: 1.25rem;
	font-weight: bold;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 30%);
}

.close-button:hover {
	background: #f5f5f5;
}

@media (width <= 768px) {
	.person-modal-content {
		grid-template-columns: 1fr;
		gap: 1rem;
	}
}
</style>