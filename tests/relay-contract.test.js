#!/usr/bin/env node

import crypto from 'crypto';
import http from 'http';

function sign(body, secret) {
  return crypto.createHmac('sha256', secret).update(JSON.stringify(body)).digest('hex');
}

function post(path, body, headers = {}) {
  const data = Buffer.from(JSON.stringify(body));
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: 'localhost', port: 8787, path, method: 'POST', headers: { 'content-type': 'application/json', 'content-length': data.length, ...headers } }, res => {
      let chunks = '';
      res.on('data', c => chunks += c);
      res.on('end', () => resolve({ status: res.statusCode, body: chunks }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const secret = process.env.RELAY_SECRET || 'testsecret';
  const payload = { task_id: 'test-123', agent: 'Prime', action: 'Intake', timestamp: new Date().toISOString(), version: 'v1.0' };
  const sig = sign(payload, secret);
  const res = await post('/webhook/prime', payload, { 'x-relay-signature': sig });
  if (res.status !== 200) {
    console.error('Contract test failed:', res.status, res.body);
    process.exit(1);
  }
  console.log('Contract test passed');
}

main().catch(err => { console.error(err); process.exit(1); });
