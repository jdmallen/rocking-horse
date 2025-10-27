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
				<h2>Raw Data Dump:</h2>
				<pre>{{ JSON.stringify(data, null, 2) }}</pre>
			</div>
			
			<div v-else>
				<p>No people found in the collection.</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { getPeople } from '~/services/directus'

const { data, pending, error } = await useAsyncData('people', () => getPeople())
</script>
