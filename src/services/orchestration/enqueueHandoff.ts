import logger from '../../utils/logger.js';
import { HandoffEvent } from '../../models/HandoffEvent.js';
import fs from 'fs';
import path from 'path';

/**
 * Enqueue a handoff event for multi-agent orchestration.
 * In this reference implementation, we persist to a local JSONL queue file.
 * Downstream relays (e.g., Notion, Prime, Claude) can consume from this file or via future adapters.
 */
export async function enqueueHandoff(event: HandoffEvent): Promise<{ success: boolean; id: string }> {
  const nowIso = new Date().toISOString();
  const id = event.id || `handoff_${Date.now()}`;
  const record = { ...event, id, createdAt: event.createdAt || nowIso };

  try {
    const outDir = path.resolve(process.cwd(), 'handoff');
    const queueFile = path.join(outDir, 'queue.jsonl');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    fs.appendFileSync(queueFile, JSON.stringify(record) + '\n', { encoding: 'utf8' });
    logger.info(`Enqueued handoff ${id} to ${queueFile}`);
    return { success: true, id };
  } catch (error: any) {
    logger.error(`Failed to enqueue handoff: ${error.message}`);
    throw new Error(`enqueueHandoff failed: ${error.message}`);
  }
}

export default enqueueHandoff;
