import http from 'http';
import express from 'express';

import { knex, models, } from '../db';

const { User, } = models;

const app = express();

http.createServer(async (req, res) => {
    console.log('xxx', await User.query());
    res.end('xxx2');
}).listen(4000, () => {
    console.log('server stared!');
});