import fs from 'fs';
import path from 'path';
import logger from '../../utils/logger.js';
import { HandoffEvent } from '../../models/HandoffEvent.js';
import { dispatchToNotionRelay } from './notionRelayAdapter.js';
import { dispatchToPrimeAgent } from './primeAgentAdapter.js';
import { dispatchToClaudeAgent } from './claudeAgentAdapter.js';

function parseLine(line: string): HandoffEvent | null {
	try {
		return JSON.parse(line);
	} catch {
		return null;
	}
}

async function dispatch(event: HandoffEvent): Promise<void> {
	for (const target of event.targets || []) {
		switch ((target.name || '').toLowerCase()) {
			case 'notionrelay':
				await dispatchToNotionRelay(event);
				break;
			case 'primeagent':
				await dispatchToPrimeAgent(event);
				break;
			case 'claudeagent':
				await dispatchToClaudeAgent(event);
				break;
			default:
				logger.warn(`Unknown target ${target.name}`);
		}
	}
}

export async function runDispatcherOnce(): Promise<number> {
	const queueFile = path.resolve(process.cwd(), 'handoff', 'queue.jsonl');
	if (!fs.existsSync(queueFile)) {
		logger.info('No handoff queue file found.');
		return 0;
	}
	const lines = fs.readFileSync(queueFile, 'utf8').split('\n').filter(Boolean);
	let count = 0;
	for (const line of lines) {
		const event = parseLine(line);
		if (!event) continue;
		await dispatch(event);
		count++;
	}
	// After dispatch, clear queue (simple strategy). In production, archive with ids.
	fs.writeFileSync(queueFile, '', { encoding: 'utf8' });
	return count;
}

export default runDispatcherOnce;