export async function getPeople() {
	const { $directus, $readItems } = useNuxtApp();
	
	try {
		console.log('Making request to Directus...');
		console.log('Directus URL:', $directus.url);
		
		const people = await $directus.request($readItems('people'));
		console.log('Response received:', people);
		return people;
	} catch (error) {
		console.error('Error fetching People collection:', error);
		console.error('Error details:', error.response?.data || error.message);
		throw error;
	}
}

export async function getPerson(id) {
	const { $directus, $readItem } = useNuxtApp();
	
	try {
		const person = await $directus.request($readItem('people', id));
		return person;
	} catch (error) {
		console.error('Error fetching person:', error);
		throw error;
	}
}

export async function getPhoto(id) {
	const { $directus, $readItem } = useNuxtApp();
	
	try {
		const photo = await $directus.request($readItem('photos', id));
		return photo;
	} catch (error) {
		console.error('Error fetching photo:', error);
		throw error;
	}
}