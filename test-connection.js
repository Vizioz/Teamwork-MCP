import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file if it exists
if (fs.existsSync('.env')) {
  dotenv.config();
}

// Get configuration from environment variables
const domain = process.env.TEAMWORK_DOMAIN;
const apiToken = process.env.TEAMWORK_API_TOKEN;
const username = process.env.TEAMWORK_USERNAME;
const password = process.env.TEAMWORK_PASSWORD;

// Check if we have the required configuration
if (!domain) {
  console.error('Missing required environment variable: TEAMWORK_DOMAIN');
  process.exit(1);
}

let auth;
let authType;

// Prefer API token authentication (token as username, "x" as password)
if (apiToken) {
  auth = Buffer.from(`${apiToken}:x`).toString('base64');
  authType = 'API Token';
} else if (username && password) {
  auth = Buffer.from(`${username}:${password}`).toString('base64');
  authType = 'Username/Password';
} else {
  console.error('Missing authentication credentials. Either TEAMWORK_API_TOKEN or both TEAMWORK_USERNAME and TEAMWORK_PASSWORD are required.');
  process.exit(1);
}

const url = `https://${domain}.teamwork.com/projects/api/v3/projects.json`;

console.log(`Testing connection to ${url}`);
console.log(`Authentication type: ${authType}`);

axios.get(url, {
  headers: {
    Authorization: `Basic ${auth}`
  }
}).then(res => {
  console.log('✅ Connection successful!');
  console.log(`Status: ${res.status}`);
  const dataStr = JSON.stringify(res.data);
  console.log(`Response: ${dataStr.substring(0, 200)}${dataStr.length > 200 ? '...' : ''}`);
  
  if (res.data && res.data.projects) {
    console.log(`Found ${res.data.projects.length} projects`);
  }
}).catch(err => {
  console.error('❌ Connection failed!');
  console.error(`Error: ${err.message}`);
  
  if (err.response) {
    console.error(`Status: ${err.response.status}`);
    console.error(`Response: ${JSON.stringify(err.response.data)}`);
  }
  
  process.exit(1);
});