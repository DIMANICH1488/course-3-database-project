import { Router, } from 'express';
import * as draft from './v1/draft';

export const router = new Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,
});

router.use('/draft', draft.router);
