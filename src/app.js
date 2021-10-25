import http from 'http';
import express from 'express';

import { models, } from '../db';

const { User, } = models;

const app = express();

app.get('/', async (req, res) => {
    const users = await User.query();
    res.json({ users, });
});

http.createServer(app).listen(4000, () => {
    console.log('server stared!');
});