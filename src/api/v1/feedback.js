import { Router, } from 'express';
import { feedbackService, } from '../../service';
import { MySuccessApiItem, MySuccessApiItems, } from '../../lib';

export const router = new Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,
});

const version = 1;

// TODO: validation
router.route('/feedback')
	.get(async (req, res) => {
		const { query, } = req;
		const data = { ...query, };
		const { items, total, } = await feedbackService.handlerList(data, req);
		throw new MySuccessApiItems({ items, total, version, });
	})
	.post(async (req, res) => {
		const { body, } = req;
		const data = { ...body, };
		const item = await feedbackService.handlerCreate(data, req);
		throw new MySuccessApiItem({ item, version, });
	});

router.route('/drive/:driveId(\\d+)/feedback')
	.get(async (req, res) => {
		const { params, query, } = req;
		const data = { ...query, ...params, };
		const { items, total, } = await feedbackService.handlerList(data, req);
		throw new MySuccessApiItems({ items, total, version, });
	});

router.route('/user/:userId(\\d+)/feedback')
	.get(async (req, res) => {
		const { params, query, } = req;
		const data = { ...query, ...params, };
		const { items, total, } = await feedbackService.handlerList(data, req);
		throw new MySuccessApiItems({ items, total, version, });
	});


router.route('/feedback/:feedbackId(\\d+)')
	.get(async (req, res) => {
		const { params, } = req;
		const data = { ...params };
		const item = await feedbackService.handlerRead(data, req);
		throw new MySuccessApiItem({ item, version, });
	})
	.patch(async (req, res) => {
		const { body, params, } = req;
		const data = { ...body, ...params };
		const item = await feedbackService.handlerUpdate(data, req);
		throw new MySuccessApiItem({ item, version, });
	})
	.delete(async (req, res) => {
		const { params, } = req;
		const data = { ...params };
		const item = await feedbackService.handlerRemove(data, req);
		throw new MySuccessApiItem({ item, version, });
	});