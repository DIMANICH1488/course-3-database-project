import { models, } from '../../../db';
import { Router, } from 'express';

export const router = new Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,
});

router.route('/').get(async (req, res) => {
    const users = await models.User.query().withGraphFetched({ driver: true, });
    // const drivers = await models.Driver.query().withGraphFetched({ user: true, });
    res.json({ users, });
});