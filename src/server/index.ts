import Koa from 'koa';
import Router from 'koa-router';
import Logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import next from 'next';
import URL from 'url';

import { sequelize } from './db';
import { getPrice } from './controllers/prices/getPrice';
import { setPrice } from './controllers/prices/setPrice';

// Initialize KoaJs server and router
const server = new Koa();
const router = new Router();

// Initialize NextJs instance and expose request handler
const nextApp = next({ dev: true });
const handler = nextApp.getRequestHandler();

(async () => {
  try {
    await nextApp.prepare();

    await sequelize.sync();

    server.use(bodyParser());
    server.use(Logger());

    server.use(router.allowedMethods());

    server.use(router.routes());

    // api
    router.get('/api/prices', getPrice);
    router.post('/api/prices', setPrice);

    router.get('/', async (ctx) => {
      await nextApp.render(ctx.req, ctx.res, '/', ctx.query);
      ctx.respond = false;
    });

    router.all('(.*)', async (ctx) => {
      await handler(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.listen(3000, () => console.log('App running on port 3000'));
  } catch (e) {
    console.error(e);
    process.exit();
  }
})();
