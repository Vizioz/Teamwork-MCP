#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function readCsv(filePath) {
	const fileStream = fs.createReadStream(filePath);
	const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
	const rows = [];
	let header = [];
	for await (const line of rl) {
		if (!line.trim()) continue;
		if (header.length === 0) { header = line.split(',').map(s => s.trim()); continue; }
		const cols = line.split(',').map(s => s.trim());
		const row = {};
		header.forEach((h, i) => row[h] = cols[i]);
		rows.push(row);
	}
	return rows;
}

async function main() {
	const tasklistId = process.env.TASKLISTID || (() => {
		if (fs.existsSync('.teamwork')) {
			const t = fs.readFileSync('.teamwork', 'utf8');
			const m = t.match(/TASKLISTID=(\d+)/);
			if (m) return m[1];
		}
		return undefined;
	})();
	if (!tasklistId) {
		console.error('TASKLISTID not found. Set env TASKLISTID or add to .teamwork');
		process.exit(1);
	}
	const tasksPath = path.resolve(process.cwd(), 'teamwork-72hour-monitoring', 'tasks.csv');
	const tasks = await readCsv(tasksPath);
	const { createRequire } = require('module');
	const req = createRequire(import.meta ? import.meta.url : __filename);
	const svc = req('../build/services/index.js');
	for (const t of tasks) {
		const payload = {
			task: {
				name: t.title,
				description: t.description,
				priority: (t.priority || 'normal')
			}
		};
		await svc.createTask(String(tasklistId), payload);
		console.log(`Created: ${t.title}`);
	}
}

main().catch(err => { console.error(err); process.exit(1); });