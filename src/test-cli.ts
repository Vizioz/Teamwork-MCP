import { loadConfig } from './utils/config.js';
import fs from 'fs';

// Load configuration from environment variables, .env file, and command line arguments
const config = loadConfig();

console.log('Teamwork MCP Configuration Test CLI');
console.log('===================================');

// Display configuration
console.log('\nConfiguration:');
console.log('TEAMWORK_DOMAIN:', config.domain || 'Not set');
console.log('TEAMWORK_USERNAME:', config.username || 'Not set');
console.log('TEAMWORK_PASSWORD:', config.password ? '******' : 'Not set');
console.log('TEAMWORK_PROJECT_ID:', config.projectId || 'Not set');

// Display API URL
console.log('\nAPI URL:');
console.log(config.apiUrl || 'Not available - configuration is invalid');

// Check for teamwork.config.json file
const configPath = 'teamwork.config.json';
if (fs.existsSync(configPath)) {
  try {
    const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    console.log('\nteamwork.config.json:');
    console.log(JSON.stringify(fileConfig, null, 2));
  } catch (error) {
    console.error(`\nError reading teamwork.config.json: ${error}`);
  }
} else {
  console.log('\nNo teamwork.config.json file found');
}

// Display configuration status
console.log('\nConfiguration Status:');
console.log('Valid:', config.isValid ? 'Yes' : 'No');

// Display usage instructions if configuration is invalid
if (!config.isValid) {
  console.log('\nUsage:');
  console.log('  node build/test-cli.js --domain=your-domain --user=your-username --pass=your-password');
  console.log('\nOr set environment variables:');
  console.log('  TEAMWORK_DOMAIN=your-domain');
  console.log('  TEAMWORK_USERNAME=your-username');
  console.log('  TEAMWORK_PASSWORD=your-password');
}

console.log('\n==================================='); 