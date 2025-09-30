import express from 'express';
import logger from '../utils/logger.js';
import { enqueueHandoff } from '../services/orchestration/enqueueHandoff.js';

const app = express();
app.use(express.json());

function toTargets(agent: string) {
  const name = (agent || '').toLowerCase();
  if (name.includes('prime')) return [{ name: 'PrimeAgent' }];
  if (name.includes('claw') || name.includes('clau')) return [{ name: 'ClaudeAgent' }];
  return [{ name: 'NotionRelay' }];
}

app.post('/webhook/prime', async (req, res) => {
  try {
    const payload = req.body || {};
    await enqueueHandoff({
      title: payload.task || payload.task_id || 'Prime Intake',
      description: `Stage: ${payload.action || 'Intake'}`,
      targets: toTargets('prime')
    });
    res.json({ ok: true });
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post('/webhook/clawed', async (req, res) => {
  try {
    const payload = req.body || {};
    await enqueueHandoff({
      title: payload.task || payload.task_id || 'Clawed In-Flight',
      description: `Stage: ${payload.action || 'In-Flight'}`,
      targets: toTargets('clawed')
    });
    res.json({ ok: true });
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post('/webhook/ancillary', async (req, res) => {
  try {
    const payload = req.body || {};
    await enqueueHandoff({
      title: payload.task || payload.task_id || 'Ancillary Review',
      description: `Stage: ${payload.action || 'Review'}`,
      targets: [{ name: 'NotionRelay' }]
    });
    res.json({ ok: true });
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).json({ ok: false, error: e.message });
  }
});

const port = process.env.PORT ? Number(process.env.PORT) : 8787;
app.listen(port, () => {
  logger.info(`Notion Relay server listening on :${port}`);
});

export default app;
