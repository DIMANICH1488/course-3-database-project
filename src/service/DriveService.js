import { models, } from '../../db';
import { MyErrorApiRequest, } from '../lib';

const { Drive, } = models;
export class DriveService {
	async handlerCreate({
		driveId,
		orderId,
		driverId,
		status = 0,
		volume = 0,
		weight = 0,
		from = {},
		to = {},
		comment = '',
		actualTile = '',
		phone = '',
		price = 0,
	}) {
		try {
			const query = () => Drive.query().returning('*').insert({
				...driveId && { driveId, },
				orderId,
				driverId,
				status,
				volume,
				weight,
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
				price,
			});
			// console.dir(query().toKnexQuery().toString());
			const item = await query();
			if (!item) {
				throw new Error(`Drive not created`);
			}
			return item.driveId;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Drive not created`,
			});
		}
	}

	async handlerUpdate({
		driveId,
		orderId,
		driverId,
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
			const query = () => Drive.query().findById(+driveId).patch({
				...orderId!==undefined && { orderId, },
				...driverId!==undefined && { driverId, },
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
				throw new Error(`Drive #${ driveId } not found`);
			}
			return true;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Drive not updated`,
			});
		}
	}

	async handlerRemove({
		driveId,
	}) {
		try {
			const query = () => Drive.query().deleteById(+driveId);
			// console.dir(query().toKnexQuery().toString());
			const numberOfAffectedRows = await query();
			if (!numberOfAffectedRows) {
				throw new Error(`Drive #${ driveId } not found`);
			}
			return true;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Drive not removed`,
			});
		}
	}

	async handlerRead({
		driveId,
		withOrder = false,
		withDriver = false,
	}) {
		try {
			const query = () => Drive.query().select('*').findById(+driveId).withGraphFetched({
				// order: !!withOrder,
				// driver: !!withDriver,
			});
			// console.dir(query().toKnexQuery().toString());
			const item = await query();
			if (!item) {
				throw new Error(`Drive #${ driveId } not found`);
			}
			return item;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Drive not readed`,
			});
		}
	}

	async handlerList({
		skip = 0,
		take = 10,
		withOrder = false,
		withDriver = false,
	}) {
		try {
			const query = () => Drive.query().withGraphFetched({
				// order: !!withOrder,
				// driver: !!withDriver,
			});
			const count = () => query().count();
			const find = () => query().select('*').limit(take).offset(skip);
			// console.dir(count().toKnexQuery().toString());
			const [ { count: total, }, ] = await count();
			// console.dir(find().toKnexQuery().toString());
			const rows = await find();
			const items = rows.map(row => row);
			return { items, total: +total, };
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Drive list not found`,
			});
		}
	}
}