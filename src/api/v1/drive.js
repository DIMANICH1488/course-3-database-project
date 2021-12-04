import { Router, } from 'express';
import { driveService, } from '../../service';
import { MySuccessApiItem, MySuccessApiItems, } from '../../lib';

export const router = new Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,
});

const version = 1;

// TODO: validation
router.route('/drive')
	.get(async (req, res) => {
		const { query, } = req;
		const data = { ...query, };
		const { items, total, } = await driveService.handlerList(data, req);
		throw new MySuccessApiItems({ items, total, version, });
	})
	.post(async (req, res) => {
		const { body, } = req;
		const data = { ...body, };
		const item = await driveService.handlerCreate(data, req);
		throw new MySuccessApiItem({ item, version, });
	});

router.route('/drive/:driveId(\\d+)')
	.get(async (req, res) => {
		const { params, } = req;
		const data = { ...params };
		const item = await driveService.handlerRead(data, req);
		throw new MySuccessApiItem({ item, version, });
	})
	.patch(async (req, res) => {
		const { body, params, } = req;
		const data = { ...body, ...params };
		const item = await driveService.handlerUpdate(data, req);
		throw new MySuccessApiItem({ item, version, });
	})
	.delete(async (req, res) => {
		const { params, } = req;
		const data = { ...params };
		const item = await driveService.handlerRemove(data, req);
		throw new MySuccessApiItem({ item, version, });
	});