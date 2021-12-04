import { models, } from '../../db';
import { MyErrorApiRequest, } from '../lib';

const { Driver, } = models;
export class DriverService {
	async handlerCreate({
		userId,
		info,
		status = 0,
	}) {
		try {
			const query = () => Driver.query().returning('*').insert({
				userId,
				info,
				status,
			});
			// console.dir(query().toKnexQuery().toString());
			const item = await query();
			if (!item) {
				throw new Error(`Driver not created`);
			}
			return item.userId;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Driver not created`,
			});
		}
	}

	async handlerUpdate({
		userId,
		info,
		status,
	}) {
		try {
			const query = () => Driver.query().findById(+userId).patch({
				...info!==undefined && { info, },
				...status!==undefined && { status, },
			});
			// console.dir(query().toKnexQuery().toString());
			const numberOfAffectedRows = await query();
			if (!numberOfAffectedRows) {
				throw new Error(`Driver #${ userId } not found`);
			}
			return true;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Driver not updated`,
			});
		}
	}

	async handlerRemove({
		userId,
	}) {
		try {
			const query = () => Driver.query().deleteById(+userId);
			// console.dir(query().toKnexQuery().toString());
			const numberOfAffectedRows = await query();
			if (!numberOfAffectedRows) {
				throw new Error(`Driver #${ userId } not found`);
			}
			return true;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Driver not removed`,
			});
		}
	}

	async handlerRead({
		userId,
		withUser = false,
		withDrive = false,
	}) {
		try {
			const query = () => Driver.query().select('*').findById(+userId).withGraphFetched({
				// user: !!withUser,
				// drive: !!withDrive,
			});
			// console.dir(query().toKnexQuery().toString());
			const item = await query();
			if (!item) {
				throw new Error(`Driver #${ userId } not found`);
			}
			const { password, passwordHash, ...user } = item.user || {};
			return { ...item, ...Object.keys(user).length && { user, }, };
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Driver not readed`,
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
			const query = () => Driver.query().withGraphFetched({
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
				text: `Driver list not found`,
			});
		}
	}
}