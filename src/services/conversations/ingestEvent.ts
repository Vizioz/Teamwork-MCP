import fs from 'fs';
import path from 'path';
import logger from '../../utils/logger.js';
import { ConversationEvent } from '../../models/ConversationEvent.js';

export async function ingestEvent(event: ConversationEvent): Promise<{ success: boolean; id: string }>{
  const id = event.id || `conv_${Date.now()}`;
  const record = { ...event, id };
  try {
    const outDir = path.resolve(process.cwd(), 'conversations');
    const file = path.join(outDir, 'events.jsonl');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.appendFileSync(file, JSON.stringify(record) + '\n', { encoding: 'utf8' });
    logger.info(`Conversation event ingested: ${id}`);
    return { success: true, id };
  } catch (e: any) {
    logger.error(`ingestEvent failed: ${e.message}`);
    throw new Error(e.message);
  }
}

export default ingestEvent;
