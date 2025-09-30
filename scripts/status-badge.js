#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function main() {
	const registerPath = path.resolve(process.cwd(), 'codex-portal', 'layer-1-governance', 'charter-standard-execution.json');
	let status = 'unknown';
	try {
		if (fs.existsSync(registerPath)) {
			const data = JSON.parse(fs.readFileSync(registerPath, 'utf8'));
			status = (data && (data.status || data.phase || data.state)) || 'ok';
		}
	} catch (e) {
		status = 'error';
	}
	const color = status === 'ok' || status === 'active' ? 'brightgreen' : (status === 'warning' ? 'yellow' : 'lightgrey');
	const payload = { schemaVersion: 1, label: 'Meta·Mega', message: String(status), color };
	process.stdout.write(JSON.stringify(payload));
}

main();