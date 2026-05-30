const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Get port from environment or default to 3000
const port = process.env.PORT || 3000;
// Note: In production Electron build, dev should be false.
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Next.js Server Ready on http://localhost:${port}`);
    // Signal to Electron main process that server is ready
    if (process.send) {
      process.send('server-ready');
    }
  });
});
