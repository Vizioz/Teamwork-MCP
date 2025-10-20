import express from 'express';
import crypto from 'crypto';
import logger from '../utils/logger.js';
import { enqueueHandoff } from '../services/orchestration/enqueueHandoff.js';

const app = express();
app.use(express.json());

const verifyRequest: express.RequestHandler = (req, res, next) => {
  const token = process.env.RELAY_TOKEN;
  const secret = process.env.RELAY_SECRET;
  const headerSig = (req.header('x-relay-signature') || '').trim();
  const headerTok = (req.header('x-relay-token') || '').trim();

  if (secret) {
    try {
      const payload = JSON.stringify(req.body || {});
      const h = crypto.createHmac('sha256', secret).update(payload).digest('hex');
      if (crypto.timingSafeEqual(Buffer.from(h), Buffer.from(headerSig || ''))) {
        next();
        return;
      }
      logger.warn('Signature verification failed');
      res.status(401).json({ ok: false, error: 'invalid signature' });
      return;
    } catch (e: any) {
      logger.error(e.message);
      res.status(400).json({ ok: false, error: 'bad request' });
      return;
    }
  } else if (token) {
    if (headerTok && token && crypto.timingSafeEqual(Buffer.from(headerTok), Buffer.from(token))) {
      next();
      return;
    }
    logger.warn('Token verification failed');
    res.status(401).json({ ok: false, error: 'invalid token' });
    return;
  }

  logger.warn('No RELAY_SECRET or RELAY_TOKEN configured; allowing request (development).');
  next();
};

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

function toTargets(agent: string) {
  const name = (agent || '').toLowerCase();
  if (name.includes('prime')) return [{ name: 'PrimeAgent' }];
  if (name.includes('claw') || name.includes('clau')) return [{ name: 'ClaudeAgent' }];
  return [{ name: 'NotionRelay' }];
}

app.post('/webhook/prime', verifyRequest, async (req, res) => {
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

app.post('/webhook/clawed', verifyRequest, async (req, res) => {
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

app.post('/webhook/ancillary', verifyRequest, async (req, res) => {
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
