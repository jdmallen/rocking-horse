#!/usr/bin/env node

import { createDirectus, rest, createItems, authentication, staticToken, readItems } from '@directus/sdk';
import { generateTheaterData } from '../utils/dataGenerator.js';

// Get scenario from command line args or default to 'full_season'
const scenario = process.argv[2] || 'full_season';

// Configuration
const directusUrl = process.env.NUXT_DIRECTUS_URL || process.env.DIRECTUS_URL || 'http://localhost:8055';

// Authentication options (use one of these methods)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN; // Static token from Directus admin

// Create Directus client with authentication
async function createAuthenticatedClient() {
	let client;

	if (ADMIN_TOKEN) {
		// Use static token
		console.log('🔑 Authenticating with static token...');
		console.log(`Token length: ${ADMIN_TOKEN.length} characters`);
		console.log(`Token starts with: ${ADMIN_TOKEN.substring(0, 8)}...`);

		client = createDirectus(directusUrl).with(rest()).with(staticToken(ADMIN_TOKEN));
	} else if (ADMIN_EMAIL && ADMIN_PASSWORD) {
		// Use email/password authentication
		console.log('🔑 Authenticating with email/password...');
		client = createDirectus(directusUrl).with(rest()).with(authentication());

		try {
			await client.login(ADMIN_EMAIL, ADMIN_PASSWORD);
			console.log('✅ Authentication successful');
		} catch (error) {
			console.error('❌ Authentication failed:', error.message);
			process.exit(1);
		}
	} else {
		console.error('❌ No authentication provided!');
		console.error('Set either:');
		console.error('  ADMIN_TOKEN=your_static_token');
		console.error('  or ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=password');
		process.exit(1);
	}

	return client;
}

console.log(`🎭 Generating theater data for scenario: ${scenario}`);
console.log('Available scenarios: full_season, community_theater, large_company');
console.log(`📡 Connecting to Directus at: ${directusUrl}`);
console.log('');

async function loadDataToDirectus(data, directus) {
	console.log('📤 Loading data into Directus...');

	// Test authentication and get current user ID
	console.log('🧪 Testing authentication...');
	let currentUserId = null;
	try {
		await directus.request(readItems('venues', { limit: 1 }));
		console.log('✅ Authentication test successful');

		// Try to get current user or use null
		try {
			const users = await directus.request(readItems('directus_users', { limit: 1 }));
			if (users.length > 0) {
				currentUserId = users[0].id;
				console.log(`🔍 Found user ID: ${currentUserId}`);
			}
		} catch {
			console.log('⚠️  Could not fetch user ID, will use null for user fields');
		}
	} catch (error) {
		console.error('❌ Authentication test failed:', error.message);
		process.exit(1);
	}

	// Clean up user and file references in data
	console.log('🧹 Cleaning up user and file references in generated data...');
	function cleanReferences(items) {
		return items.map(item => {
			const cleaned = {
				...item,
				user_created: currentUserId,
				user_updated: currentUserId,
			};

			// Set all file references to null since we're not loading files
			const fileFields = ['poster_image', 'program_pdf', 'headshot', 'logo', 'program_ad', 'featured_image', 'photo_file', 'video'];
			fileFields.forEach(field => {
				if (cleaned[field] !== undefined) {
					cleaned[field] = null;
				}
			});

			// Fix phone number format to match Directus validation: ^(\+?1)?\s?\(?(\d{3})\)?[\s\-]?(\d{3})[\s\-]?(\d{4})$
			if (cleaned.phone_number !== undefined) {
				// Extract just the digits
				const digits = cleaned.phone_number?.replace(/[^\d]/g, '') || '';
				if (digits.length >= 10) {
					// Format as (XXX) XXX-XXXX which matches the regex
					const area = digits.slice(-10, -7);
					const exchange = digits.slice(-7, -4);
					const number = digits.slice(-4);
					cleaned.phone_number = `(${area}) ${exchange}-${number}`;
				} else {
					// If not enough digits, set to null
					cleaned.phone_number = null;
				}
			}

			// Make slugs unique by appending timestamp and random number
			if (cleaned.slug !== undefined) {
				const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
				const random = Math.random().toString(36).substring(2, 8); // Random string
				cleaned.slug = `${cleaned.slug}-${timestamp}-${random}`;
			}

			return cleaned;
		});
	}

	try {
		// Skip directus_files as it's a core collection and handle file references differently
		console.log('   ⚠️  Skipping directus_files (core collection) - file references will be set to null');

		// Load collections in dependency order (excluding core collections and photos which require files)
		const collections = [
			'venues',
			'shows',
			'people',
			'sponsors',
			'productions',
			'performances',
			'auditions',
			'news',
			'cast_crew',
		];

		console.log('   ⚠️  Skipping photos collection (requires file references)');

		for (const collection of collections) {
			const collectionData = data[collection];
			if (collectionData && collectionData.length > 0) {
				console.log(`   Loading ${collectionData.length} items into ${collection}...`);
				const cleanedData = cleanReferences(collectionData);
				await directus.request(createItems(collection, cleanedData));
				console.log(`   ✓ ${collection} loaded successfully`);
			}
		}

		// Load relationship tables (excluding photo-related ones since we skipped photos)
		const relationshipTables = [
			'auditions_productions',
			'news_productions',
			'sponsors_productions',
			'auditions_files',
		];

		console.log('   ⚠️  Skipping photo relationship tables (photos_people, photos_productions, photos_performances, photos_venues)');

		for (const table of relationshipTables) {
			const tableData = data[table];
			if (tableData && tableData.length > 0) {
				console.log(`   Loading ${tableData.length} relationships into ${table}...`);
				// Relationship tables might not have user or file fields, but clean them anyway to be safe
				const cleanedData = Array.isArray(tableData) ? tableData.map(item => {
					const cleaned = { ...item };
					if (cleaned.user_created !== undefined) cleaned.user_created = currentUserId;
					if (cleaned.user_updated !== undefined) cleaned.user_updated = currentUserId;

					// Handle directus_files_id in auditions_files table
					if (cleaned.directus_files_id !== undefined) {
						cleaned.directus_files_id = null;
					}

					return cleaned;
				}) : tableData;
				await directus.request(createItems(table, cleanedData));
				console.log(`   ✓ ${table} loaded successfully`);
			}
		}

		console.log('');
		console.log('✅ All data loaded successfully into Directus!');

	} catch (error) {
		console.error('❌ Error loading data into Directus:', error);
		if (error.response?.data) {
			console.error('Response details:', error.response.data);
		}
		throw error;
	}
}

try {
	const data = generateTheaterData(scenario);
	console.log('');
	console.log('✅ Data generation complete!');
	console.log(`Generated data with ${Object.keys(data).length} collections`);
	console.log('');

	// Create authenticated client
	const directus = await createAuthenticatedClient();

	await loadDataToDirectus(data, directus);

} catch (error) {
	console.error('❌ Script failed:', error.message);
	process.exit(1);
}
