import { Router, } from 'express';
// import * as draft from './v1/draft';
import * as user from './v1/user';
import * as driver from './v1/driver';
import * as order from './v1/order';
import * as drive from './v1/drive';
import * as feedback from './v1/feedback';

export const router = new Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,
});

// router.use('/v1/draft', draft.router);
router.use('/v1', user.router);
router.use('/v1', driver.router);
router.use('/v1', order.router);
router.use('/v1', drive.router);
router.use('/v1', feedback.router);
