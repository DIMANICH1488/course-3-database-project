import express from 'express';
import 'express-async-errors';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import http from 'http';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { normalize, resolve, } from 'path';

import { models, } from '../db';
import { env, mode, isProduction, } from '../env';
import { logger, } from './logger';
import * as middleware from './middleware';
import * as lib from './lib';
import * as V from './lib/validation';
import * as api from './api';
import * as ssr from './ssr';
import { userService, } from './service';

const { JWT_SECRET = '1234567890', SESSION_SECRET = '1234567890', } = env;
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

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, },
}));
  
passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true,
  }, async (req, login, password, done) => {
    console.log(`LocalStrategy: login = ${ login }, password = ${ password }`);
    try {
        const user = await models.User.query().findOne({ login, });
        if (user && models.User.passwordCompare(password, user.passwordHash)) {
            done(null, user);
        } else {
            done(null, false, { message: 'User unknown', });
        }
    } catch (error) {
        done(error, false);
    }
}));
passport.serializeUser((user, done) => {
    console.log(`passport.serializeUser: user = ${ JSON.stringify(user, null, '\t') }`);
    done(null, user?.userId);
});
passport.deserializeUser(async (userId, done) => {
    console.log(`passport.deserializeUser: userId = ${ userId }`);
    try {
        const user = await models.User.query().findById(userId);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});
app.use(passport.initialize());
app.use(passport.session());

app.post(
    '/register',
    V.body('login').isLength({ min: 1, max: 64, }).withMessage('Wrong login'),
    V.body('password').isLength({ min: 1, max: 64, }).withMessage('Wrong password'),
    V.validate,
    async (req, res) => {
        try {
            const { body, } = req;
            const { login, password, } = body;
            const form = {
                login,
                password,
                moderator: false,
                status: 1,
            };
            const user = await userService.handlerCreate(form, req);
            const data = {
                userId: user?.userId,
                moderator: user?.moderator,
            };
            const expiresIn = '1h';
            const token = jwt.sign(data, JWT_SECRET, { expiresIn, });
            res.json({ register: true, login: true, token, });
        } catch (error) {
            res.json({ error, });
        }
    }
);
app.post(
    '/login',
    passport.authenticate('local'),
    async (req, res) => {
        try {
            const data = {
                userId: req.user?.userId,
                moderator: req.user?.moderator,
            };
            const expiresIn = '1h';
            const token = jwt.sign(data, JWT_SECRET, { expiresIn, });
            res.json({ login: true, token, });
        } catch (error) {
            res.json({ error, });
        }
    }
);
app.get(
    '/logout',
    async (req, res) => {
        try {
            req?.logout?.();
            delete req.session;
            res.json({ logout: true, token: null, });
        } catch (error) {
            res.json({ error, });
        }
    }
);
const verify = (req, res, next) => {
    try {
        const { headers, } = req;
        const { authorization = '', } = headers;
        const token = /^bearer\s+(?<token>.+)\s*$/ig.exec(authorization)?.groups?.token;
        if (!token) {
            throw new lib.MyErrorApiAuth('Token expected');
        }
        jwt.verify(token, JWT_SECRET);
        const data = jwt.decode(token, { complete: true, });
    } catch (error) {
        throw error;        
    }
    next();
};

app.use('/api', verify, api.router);
app.use('/', ssr.router);

middleware.unknown({ app, lib, });
middleware.response({ app, lib, isProduction, logger, });

const server = http.createServer(app);

server.listen(port, () => {
    logger.info(`Server stared on ${ port }...`);
});
logger.info(`Server mode is '${ mode }'`);