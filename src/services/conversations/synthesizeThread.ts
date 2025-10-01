import fs from 'fs';
import path from 'path';
import logger from '../../utils/logger.js';

interface SynthesisResult {
  threadId: string;
  summary: string;
  decisions: string[];
  risks: string[];
  nextSteps: string[];
}

export async function synthesizeThread(threadId: string): Promise<SynthesisResult> {
  const file = path.resolve(process.cwd(), 'conversations', 'events.jsonl');
  const lines = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').split('\n').filter(Boolean) : [];
  const events = lines.map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(e => e && e.threadId === threadId);
  const content = events.map((e: any) => `- [${e.timestamp}] ${e.author}: ${e.content}`).join('\n');

  const summary = events.length ? `Thread ${threadId} summary with ${events.length} events.` : `No events for ${threadId}.`;
  const decisions: string[] = [];
  const risks: string[] = [];
  const nextSteps: string[] = [];

  const outDir = path.resolve(process.cwd(), 'conversations', 'syntheses');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const md = `# Synthesis for ${threadId}\n\n${summary}\n\n## Timeline\n${content}\n`;
  fs.writeFileSync(path.join(outDir, `${threadId}.md`), md, { encoding: 'utf8' });
  logger.info(`Synthesis written for thread ${threadId}`);
  return { threadId, summary, decisions, risks, nextSteps };
}

export default synthesizeThread;
