import { Router, } from 'express';
import { MySuccessSsrStream, } from '../../lib';

export const router = new Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,
});

router.route('/')
	.get(async (req, res) => {
		res.end('It works!!!');
		throw new MySuccessSsrStream();
	});
