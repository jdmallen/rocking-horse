<template>
	<!-- List Form -->
	<div
		v-if="display === 'list'"
		class="venue-list-item"
		@click="$emit('open-modal')"
	>
		{{ venue.name }}
	</div>

	<!-- Card Form -->
	<div
		v-else-if="display === 'card'"
		class="venue-card"
		@click="$emit('open-modal')"
	>
		<div class="venue-card-content">
			<div class="venue-card-header">
				<h3 class="venue-name">{{ venue.name }}</h3>
				<div class="venue-location">
					{{ venue.city }}, {{ venue.state }}
				</div>
			</div>
			<div class="venue-card-details">
				<div v-if="venue.seating_capacity" class="capacity">
					<span class="capacity-label">Capacity:</span>
					<span class="capacity-value">{{ venue.seating_capacity }}</span>
				</div>
				<div v-if="venue.description" class="description">
					{{ truncatedDescription }}
				</div>
			</div>
		</div>
	</div>

	<!-- Modal Form -->
	<div v-else-if="display === 'modal'" class="venue-modal">
		<div class="venue-modal-content">
			<div class="venue-modal-header">
				<h2>{{ venue.name }}</h2>
			</div>
			<div class="venue-modal-details">
				<div v-for="field in visibleFields" :key="field.key" class="detail-row">
					<span class="detail-label">{{ field.label }}:</span>
					<span class="detail-value">{{ field.value }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	venue: {
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

const truncatedDescription = computed(() => {
	if (!props.venue.description) return '';
	const maxLength = 120;
	return props.venue.description.length > maxLength
		? props.venue.description.substring(0, maxLength) + '...'
		: props.venue.description;
});

const fullAddress = computed(() => {
	const parts = [
		props.venue.street_1,
		props.venue.street_2,
		props.venue.street_3,
	].filter(Boolean);

	const street = parts.join(', ');
	const cityState = `${props.venue.city}, ${props.venue.state} ${props.venue.zip}`;

	return street ? `${street}, ${cityState}` : cityState;
});

const visibleFields = computed(() => {
	const excludedFields = ['id', 'sort', 'user_created', 'date_created', 'user_updated', 'date_updated', 'slug'];
	const fieldLabels = {
		name: 'Venue Name',
		street_1: 'Street Address',
		street_2: 'Address Line 2',
		street_3: 'Address Line 3',
		city: 'City',
		state: 'State',
		zip: 'ZIP Code',
		description: 'Description',
		seating_capacity: 'Seating Capacity',
		accessibility_notes: 'Accessibility Notes',
	};

	const fields = [];

	// Add name field first
	fields.push({
		key: 'name',
		label: 'Venue Name',
		value: props.venue.name,
	});

	// Add full address
	if (fullAddress.value) {
		fields.push({
			key: 'address',
			label: 'Address',
			value: fullAddress.value,
		});
	}

	// Add other fields
	Object.keys(props.venue).forEach(key => {
		if (!excludedFields.includes(key) && props.venue[key] &&
			!['name', 'street_1', 'street_2', 'street_3', 'city', 'state', 'zip'].includes(key)) {
			fields.push({
				key,
				label: fieldLabels[key] || key,
				value: props.venue[key],
			});
		}
	});

	return fields;
});
</script>

<style scoped>
.venue-list-item {
	padding: 0.5rem;
	border-bottom: 0.0625rem solid #e5e7eb;
	cursor: pointer;
	transition: background-color 0.2s;
}

.venue-list-item:hover {
	background-color: #f9fafb;
}

.venue-card {
	position: relative;
	width: 100%;
	max-width: min(21.875rem, 100vw);
	min-height: 12.5rem;
	cursor: pointer;
	border-radius: 0.5rem;
	overflow: hidden;
	box-shadow: 0 0.25rem 0.375rem -0.0625rem rgb(0 0 0 / 10%);
	transition: transform 0.2s;
	background: white;
	border: 0.0625rem solid #e5e7eb;
}

.venue-card:hover {
	transform: scale(1.02);
}

.venue-card-content {
	padding: 1.5rem;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.venue-card-header {
	margin-bottom: 1rem;
}

.venue-name {
	font-size: 1.25rem;
	font-weight: 700;
	color: #1f2937;
	margin: 0 0 0.5rem;
	line-height: 1.3;
}

.venue-location {
	color: #6b7280;
	font-size: 0.875rem;
	font-weight: 500;
}

.venue-card-details {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.capacity {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.capacity-label {
	font-size: 0.875rem;
	color: #6b7280;
	font-weight: 500;
}

.capacity-value {
	font-size: 0.875rem;
	color: #1f2937;
	font-weight: 600;
}

.description {
	color: #4b5563;
	font-size: 0.875rem;
	line-height: 1.5;
	flex: 1;
}

.venue-modal-content {
	max-width: 37.5rem;
	width: 100%;
}

.venue-modal-header h2 {
	font-size: 1.875rem;
	font-weight: 700;
	color: #1f2937;
	margin: 0 0 1.5rem;
}

.venue-modal-details {
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
	line-height: 1.5;
}

@media (width <= 768px) {
	.venue-card {
		max-width: 100%;
	}

	.venue-modal-content {
		max-width: 100%;
	}
}
</style>