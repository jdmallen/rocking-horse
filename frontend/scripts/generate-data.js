#!/usr/bin/env node

import { generateTheaterData } from '../utils/dataGenerator.js';

// Get scenario from command line args or default to 'full_season'
const scenario = process.argv[2] || 'full_season';

console.log(`🎭 Generating theater data for scenario: ${scenario}`);
console.log('Available scenarios: full_season, minimal, medium, large');
console.log('');

try {
	const data = generateTheaterData(scenario);
	console.log('');
	console.log('✅ Data generation complete!');
	console.log(`Generated data available in memory with ${Object.keys(data).length} collections`);
	console.log('');
	console.log('💡 To use this data:');
	console.log('   - Copy the output and import into Directus');
	console.log('   - Or modify this script to save to files');
	console.log('   - Or use the data directly in your application');
} catch (error) {
	console.error('❌ Data generation failed:', error.message);
	process.exit(1);
}