import express from 'express';
import 'express-async-error';
import http from 'http';
// import https from 'https';
import { normalize, resolve, } from 'path';

import { env, mode, isProduction, } from '../env';
import { logger, } from './logger';
import * as middleware from './middleware';
import * as lib from './lib';
import * as api from './api';
import * as ssr from './ssr';

const app = express();
const port = env.APP_PORT ?? 4000;
const root = normalize(__dirname);
const repo = normalize(resolve(root, '..'));

app.set('app', app);
app.set('root', root);
app.set('repo', repo);

middleware.poweredBy({ app, });
middleware.bodyJSON({ app, });
middleware.bodyRaw({ app, });
middleware.bodyText({ app, });
middleware.bodyUri({ app, });
middleware.request({ app, logger, repo, root, });
middleware.cors({ app, });
middleware.asset({ app, });
middleware.cookie({ app, env, });
middleware.render({ app, isProduction, root, repo, logger, });

app.use('/api', api.router);
app.use('/', ssr.router);

middleware.unknown({ app, lib, });
// middleware.response({ app, lib, isProduction, logger, });

const server = http.createServer(app);

server.listen(port, () => {
    logger.info(`Server stared on ${ port }...`);
});
logger.info(`Server mode is '${ mode }'`);