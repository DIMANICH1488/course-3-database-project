import http from 'http';
import express from 'express';

import { models, } from '../db';

const app = express();

app.get('/', async (req, res) => {
    const users = await models.User.query().withGraphFetched({ driver: true, });
    // const drivers = await models.Driver.query().withGraphFetched({ user: true, });
    res.json({ users, });
});

http.createServer(app).listen(4000, () => {
    console.log('server stared!');
});