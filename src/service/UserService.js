import { models, } from '../../db';
import { MyErrorApiRequest, } from '../lib';

const { User, } = models;
export class UserService {
	async handlerCreate({
		userId,
		login,
		password,
		moderator = false,
		status = 0,
	}) {
		try {
			const passwordHash = User.passwordToPasswordHash(password);
			const query = () => User.query().returning('*').insert({
				...userId && { userId, },
				login,
				password,
				passwordHash,
				moderator,
				status,
			});
			// console.dir(query().toKnexQuery().toString());
			const item = await query();
			if (!item) {
				throw new Error(`User not created`);
			}
			return item.userId;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `User not created`,
			});
		}
	}

	async handlerUpdate({
		userId,
		login,
		password,
		moderator,
		status,
	}) {
		try {
			const passwordHash = password && User.passwordToPasswordHash(password);
			const query = () => User.query().findById(+userId).patch({
				...login!==undefined && { login, },
				...password!==undefined && { password, passwordHash, },
				...moderator!==undefined && { moderator, },
				...status!==undefined && { status, },
			});
			// console.dir(query().toKnexQuery().toString());
			const numberOfAffectedRows = await query();
			if (!numberOfAffectedRows) {
				throw new Error(`User #${ userId } not found`);
			}
			return true;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `User not updated`,
			});
		}
	}

	async handlerRemove({
		userId,
	}) {
		try {
			const query = () => User.query().deleteById(+userId);
			// console.dir(query().toKnexQuery().toString());
			const numberOfAffectedRows = await query();
			if (!numberOfAffectedRows) {
				throw new Error(`User #${ userId } not found`);
			}
			return true;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `User not removed`,
			});
		}
	}

	async handlerRead({
		userId,
		withDriver = false,
		withOrder = false,
		withFeedback = false,
	}) {
		try {
			const query = () => User.query().select('*').findById(+userId).withGraphFetched({
				// driver: !!withDriver,
				// order: !!withOrder,
				// feedback: !!withFeedback,
			});
			// console.dir(query().toKnexQuery().toString());
			const item = await query();
			if (!item) {
				throw new Error(`User #${ userId } not found`);
			}
			const { password, passwordHash, ...user } = item;
			return user;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `User not readed`,
			});
		}
	}

	async handlerList({
		skip = 0,
		take = 10,
		withDriver = false,
		withOrder = false,
		withFeedback = false,
	}) {
		try {
			const query = () => User.query().withGraphFetched({
				// driver: !!withDriver,
				// order: !!withOrder,
				// feedback: !!withFeedback,
			});
			const count = () => query().count();
			const find = () => query().select('*').limit(take).offset(skip);
			// console.dir(count().toKnexQuery().toString());
			const [ { count: total, }, ] = await count();
			// console.dir(find().toKnexQuery().toString());
			const rows = await find();
			const items = rows.map(row => {
				if (row) {
					const { password, passwordHash, ...item } = row;
					return item;
				}
				return row;
			});
			return { items, total: +total, };
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `User list not found`,
			});
		}
	}
}