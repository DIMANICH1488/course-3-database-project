import { Router, } from 'express';
import { userService, } from '../../service';
import { MySuccessApiItem, MySuccessApiItems, } from '../../lib';

export const router = new Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,
});

const version = 1;

// TODO: validation
router.route('/user')
	.get(async (req, res) => {
		const { query, } = req;
		const data = { ...query, };
		const { items, total, } = await userService.handlerList(data, req);
		throw new MySuccessApiItems({ items, total, version, });
	})
	.post(async (req, res) => {
		const { body, } = req;
		const data = { ...body, };
		const item = await userService.handlerCreate(data, req);
		throw new MySuccessApiItem({ item, version, });
	});

router.route('/user/:userId(\\d+)')
	.get(async (req, res) => {
		const { params, } = req;
		const data = { ...params };
		const item = await userService.handlerRead(data, req);
		throw new MySuccessApiItem({ item, version, });
	})
	.patch(async (req, res) => {
		const { body, params, } = req;
		const data = { ...body, ...params };
		const item = await userService.handlerUpdate(data, req);
		throw new MySuccessApiItem({ item, version, });
	})
	.delete(async (req, res) => {
		const { params, } = req;
		const data = { ...params };
		const item = await userService.handlerRemove(data, req);
		throw new MySuccessApiItem({ item, version, });
	});