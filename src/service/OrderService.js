import { models, } from '../../db';
import { MyErrorApiRequest, } from '../lib';

const { Order, } = models;
export class OrderService {
	async handlerCreate({
		orderId,
		userId,
		status = 0,
		volume = {},
		weight = {},
		from = {},
		to = {},
		comment = '',
		actualTile = '',
		phone = '',
		price = {},
	}) {
		try {
			const query = () => Order.query().returning('*').insert({
				...orderId && { orderId, },
				userId,
				status,
				volume: {
					value: Order.volumeValue(volume?.input, volume?.unit),
					input: volume?.input,
					unit: volume?.unit,
				},
				weight: {
					value: Order.weightValue(weight?.input, weight?.unit),
					input: weight?.input,
					unit: weight?.unit,
				},
				from: {
					latitude: from?.latitude,
					longitude: from?.longitude,
					address: from?.address,
				},
				to: {
					latitude: to?.latitude,
					longitude: to?.longitude,
					address: to?.address,
				},
				comment,
				actualTile,
				phone,
				price: {
					value: Order.priceValue(price?.input, price?.unit),
					input: price?.input,
					unit: price?.unit,
				},
			});
			// console.dir(query().toKnexQuery().toString());
			const item = await query();
			if (!item) {
				throw new Error(`Order not created`);
			}
			return item.orderId;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Order not created`,
			});
		}
	}

	async handlerUpdate({
		orderId,
		userId,
		status,
		volume,
		weight,
		from,
		to,
		comment,
		actualTile,
		phone,
		price,
	}) {
		try {
			const query = () => Order.query().findById(+orderId).patch({
				...userId!==undefined && { userId, },
				...status!==undefined && { status, },
				...volume!==undefined && { volume, },
				...weight!==undefined && { weight, },
				...from!==undefined && { from, },
				...to!==undefined && { to, },
				...comment!==undefined && { comment, },
				...actualTile!==undefined && { actualTile, },
				...phone!==undefined && { phone, },
				...price!==undefined && { price, },
			});
			// console.dir(query().toKnexQuery().toString());
			const numberOfAffectedRows = await query();
			if (!numberOfAffectedRows) {
				throw new Error(`Order #${ orderId } not found`);
			}
			return true;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Order not updated`,
			});
		}
	}

	async handlerRemove({
		orderId,
	}) {
		try {
			const query = () => Order.query().deleteById(+orderId);
			// console.dir(query().toKnexQuery().toString());
			const numberOfAffectedRows = await query();
			if (!numberOfAffectedRows) {
				throw new Error(`Order #${ orderId } not found`);
			}
			return true;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Order not removed`,
			});
		}
	}

	async handlerRead({
		orderId,
		withUser = false,
		withDrive = false,
	}) {
		try {
			const query = () => Order.query().select('*').findById(+orderId).withGraphFetched({
				// user: !!withUser,
				// drive: !!withDrive,
			});
			// console.dir(query().toKnexQuery().toString());
			const item = await query();
			if (!item) {
				throw new Error(`Order #${ orderId } not found`);
			}
			const { password, passwordHash, ...user } = item.user || {};
			return { ...item, ...Object.keys(user).length && { user, }, };
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Order not readed`,
			});
		}
	}

	async handlerList({
		skip = 0,
		take = 10,
		withUser = false,
		withDrive = false,
	}) {
		try {
			const query = () => Order.query().withGraphFetched({
				// user: !!withUser,
				// drive: !!withDrive,
			});
			const count = () => query().count();
			const find = () => query().select('*').limit(take).offset(skip);
			// console.dir(count().toKnexQuery().toString());
			const [ { count: total, }, ] = await count();
			// console.dir(find().toKnexQuery().toString());
			const rows = await find();
			const items = rows.map(row => {
				if (row && row.user) {
					const { password, passwordHash, ...user } = row.user;
					return { ...row, ...Object.keys(user).length && { user, }, };
				}
				return row;
			});
			return { items, total: +total, };
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Order list not found`,
			});
		}
	}
}