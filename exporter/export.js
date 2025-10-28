#!/usr/bin/env node

// Theater Database Complete Export Script
// Exports collections and schema from Directus

import { createDirectus, rest, readItems, authentication, staticToken, readCollections } from '@directus/sdk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Configuration
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const EXPORT_DIR = process.env.EXPORT_DIR || '../backups';
const CONTAINER_NAME = process.env.CONTAINER_NAME || 'rocking_horse_directus';

// Authentication options (use one of these methods)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN; // Static token from Directus admin

const DATE = new Date().toISOString().replace(/[:.-]/g, '').slice(0, 13) + 'Z';

// Collections to export (excluding directus system tables)
const collections = [
  'people', 'productions', 'shows', 'venues', 'performances', 
  'cast_crew', 'news', 'photos', 'sponsors', 'auditions',
  'auditions_files', 'auditions_productions', 'news_productions',
  'photos_people', 'photos_performances', 'photos_productions', 
  'photos_venues', 'sponsors_productions'
];

// Create Directus client with authentication
async function createAuthenticatedClient() {
  let client;
  
  if (ADMIN_TOKEN) {
    // Use static token
    console.log('🔑 Authenticating with static token...');
    console.log(`Token length: ${ADMIN_TOKEN.length} characters`);
    console.log(`Token starts with: ${ADMIN_TOKEN.substring(0, 8)}...`);
    
    client = createDirectus(DIRECTUS_URL).with(rest()).with(staticToken(ADMIN_TOKEN));
  } else if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    // Use email/password authentication
    console.log('🔑 Authenticating with email/password...');
    client = createDirectus(DIRECTUS_URL).with(rest()).with(authentication());
    
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

async function exportCollections() {
  console.log('🎭 Theater Database Complete Export Starting...');
  console.log(`Date: ${new Date()}`);
  console.log(`Directus URL: ${DIRECTUS_URL}`);
  console.log(`Container: ${CONTAINER_NAME}`);
  console.log(`Export Directory: ${EXPORT_DIR}`);
  console.log('');

  // Create authenticated client
  const directus = await createAuthenticatedClient();
  
  // Test authentication
  console.log('🧪 Testing authentication...');
  try {
    const result = await directus.request(readItems('venues', { limit: 1 }));
    console.log('✅ Authentication test successful');
    console.log(`Found ${result.length} people (showing first item as test)`);
  } catch (error) {
    console.error('❌ Authentication test failed:', error.message);
    process.exit(1);
  }
  
  // Resolve and ensure export directory exists
  const exportPath = path.resolve(EXPORT_DIR);
  if (!fs.existsSync(exportPath)) {
    fs.mkdirSync(exportPath, { recursive: true });
  }

  const exportData = {};
  let totalItems = 0;

  console.log('📦 Exporting collection data...');
  
  for (const collection of collections) {
    try {
      console.log(`  Exporting ${collection}...`);
      
      const items = await directus.request(
        readItems(collection, {
          limit: -1, // Get all items
          fields: ['*'] // Get all fields
        })
      );
      
      exportData[collection] = items;
      totalItems += items.length;
      console.log(`  ✅ Exported ${items.length} ${collection}`);
      
    } catch (error) {
      console.error(`  ❌ Error exporting ${collection}:`, error.message);
      // Continue with other collections
      exportData[collection] = [];
    }
  }

  // Write export file
  const exportFile = path.join(exportPath, `rh_data_${DATE}.json`);
  
  try {
    fs.writeFileSync(exportFile, JSON.stringify(exportData, null, 2));
    console.log('');
    console.log('✅ Collection data exported successfully!');
    console.log(`   File: ${exportFile}`);
    console.log(`   Total items: ${totalItems}`);
  } catch (error) {
    console.error('❌ Failed to write export file:', error.message);
    process.exit(1);
  }

  // Export schema snapshot
  console.log('');
  console.log('📋 Exporting schema snapshot...');
  
  try {
    const schemaFile = `/directus/backups/rh_schema_${DATE}.yaml`;
    const command = `sudo docker exec ${CONTAINER_NAME} npx directus schema snapshot ${schemaFile}`;
    
    console.log(`  Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    
    console.log('✅ Schema snapshot exported successfully!');
    console.log(`   File: ${path.join(exportPath, `rh_schema_${DATE}.yaml`)}`);
  } catch (error) {
    console.error('❌ Schema snapshot export failed:', error.message);
    // Continue with backup info creation
  }

  // Create backup info file
  console.log('');
  console.log('📝 Creating backup info...');
  
  const infoFile = path.join(exportPath, `rh_backup_info_${DATE}.txt`);
  const infoContent = `Theater Database Backup
=======================
Date: ${new Date()}
Directus URL: ${DIRECTUS_URL}
Collections Exported: ${collections.join(', ')}
Total Items: ${totalItems}

Files Created:
- rh_data_${DATE}.json (collection data)
- rh_schema_${DATE}.yaml (database schema)
- rh_backup_info_${DATE}.txt (this file)

To restore this backup:
1. Import schema: sudo docker exec ${CONTAINER_NAME} npx directus schema apply /directus/backups/rh_schema_${DATE}.yaml
2. Import data: Use Directus Admin Panel to import rh_data_${DATE}.json
3. Or use the Directus API to restore individual collections

Collections included:
${collections.map(c => `- ${c}: ${exportData[c]?.length || 0} items`).join('\n')}

Export command used:
npm run export (from exporter directory)

Environment:
- DIRECTUS_URL: ${DIRECTUS_URL}
- CONTAINER_NAME: ${CONTAINER_NAME}
- EXPORT_DIR: ${EXPORT_DIR}
`;

  try {
    fs.writeFileSync(infoFile, infoContent);
    console.log('✅ Backup info created!');
    console.log(`   File: ${infoFile}`);
  } catch (error) {
    console.error('❌ Failed to write backup info:', error.message);
  }

  // Show summary
  console.log('');
  console.log('🎉 Export Complete!');
  console.log(`Files created in ${exportPath}:`);
  
  try {
    const files = fs.readdirSync(exportPath)
      .filter(f => f.includes(DATE))
      .map(f => {
        const stats = fs.statSync(path.join(exportPath, f));
        return `${f} (${(stats.size / 1024).toFixed(1)}KB)`;
      });
    
    files.forEach(f => console.log(`  ${f}`));
  } catch (error) {
    console.log('  (Could not list files)');
  }

  console.log('');
  console.log('💡 To use this backup:');
  console.log(`   sudo docker exec ${CONTAINER_NAME} npx directus schema apply /directus/backups/rh_schema_${DATE}.yaml`);
  console.log('   Then import the JSON file via Directus Admin Panel');
}

// Run the export
exportCollections().catch(error => {
  console.error('❌ Export failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
});
