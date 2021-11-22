import { Router, } from 'express';
import * as frontPage from './v1/frontPage';
import * as draft from './v1/draft';

export const router = new Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,
});

router.use('/', frontPage.router);
router.use('/draft', draft.router);
