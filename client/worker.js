import { serveStatic } from 'worktop/static';
import { Router } from 'worktop';

const router = new Router();

router.add('GET', '*', async (req, res) => {
  return serveStatic(req, {
    root: './dist',
    onNotFound() {
      // fallback to index.html for SPA routing
      return serveStatic(req, { path: '/index.html', root: './dist' });
    }
  });
});

export default {
  fetch: router.run
};
