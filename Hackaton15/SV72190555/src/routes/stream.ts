import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  let tick = 0;
  const total = 5;

  const interval = setInterval(() => {
    tick += 1;
    const payload = {
      tick,
      total,
      timestamp: new Date().toISOString(),
    };
    res.write(`event: tick\n`);
    res.write(`data: ${JSON.stringify(payload)}\n\n`);

    if (tick >= total) {
      clearInterval(interval);
      res.write(`event: done\n`);
      res.write(`data: ${JSON.stringify({ message: 'stream completed' })}\n\n`);
      res.end();
    }
  }, 1000);

  // Si el cliente se desconecta antes
  req.on('close', () => {
    clearInterval(interval);
  });
});

export default router;
