import { Router, } from 'express';
import { userService, } from '../../service';
import { MySuccessApiItem, MySuccessApiItems, } from '../../lib';
import * as V from '../../lib/validation';

export const router = new Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true,
});

const version = 1;
	
router.route('/user')
	.get(
		V.querySkip.optional(),
		V.queryTake.optional(),
		V.queryWithDriver.optional(),
		V.queryWithOrder.optional(),
		V.queryWithFeedback.optional(),
		V.validate,
		async (req, res) => {
			const { query, } = req;
			const data = { ...query, };
			const { items, total, } = await userService.handlerList(data, req);
			throw new MySuccessApiItems({ items, total, version, });
		}
	)
	.post(
		V.bodyInt('userId', 1),
		V.body('login').isLength({ min: 1, max: 64, }).withMessage('Wrong login'),
		V.body('password').isLength({ min: 1, max: 64, }).withMessage('Wrong password'),
		V.bodyIn('moderator', [false, true]).optional(),
		V.bodyIn('status', [-1, 1]).optional(),
		V.validate,
		async (req, res) => {
			const { body, } = req;
			const data = { ...body, };
			const item = await userService.handlerCreate(data, req);
			throw new MySuccessApiItem({ item, version, });
		}
	);

router.route('/user/:userId(\\d+)')
	.get(
		V.paramInt('userId', 1),
		V.queryWithDriver.optional(),
		V.queryWithOrder.optional(),
		V.queryWithFeedback.optional(),
		V.validate,
		async (req, res) => {
			const { params, } = req;
			const data = { ...params };
			const item = await userService.handlerRead(data, req);
			throw new MySuccessApiItem({ item, version, });
		}
	)
	.patch(
		V.paramInt('userId', 1),
		V.body('login').isLength({ min: 1, max: 64, }).optional().withMessage('Wrong login'),
		V.body('password').isLength({ min: 1, max: 64, }).optional().withMessage('Wrong password'),
		V.bodyIn('moderator', [false, true]).optional(),
		V.bodyIn('status', [-1, 1]).optional(),
		V.validate,
		async (req, res) => {
			const { body, params, } = req;
			const data = { ...body, ...params };
			const item = await userService.handlerUpdate(data, req);
			throw new MySuccessApiItem({ item, version, });
		}
	)
	.delete(
		V.paramInt('userId', 1),
		V.validate,
		async (req, res) => {
			const { params, } = req;
			const data = { ...params };
			const item = await userService.handlerRemove(data, req);
			throw new MySuccessApiItem({ item, version, });
		}
	);