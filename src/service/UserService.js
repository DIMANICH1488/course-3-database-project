import bcrypt from 'bcrypt';
import { models, } from '../../db';
import { MyErrorApiRequest, } from '../lib';

const salt = bcrypt.genSaltSync(10);
const { User, } = models;
export class UserService {
	async handlerCreate({
		userId,
		login,
		password,
		moderator=false,
		status=0,
	}) {
		try {
			const passwordHash = bcrypt.hashSync(password, salt);
			const item = await User.query()
				.insert({
					...userId && { userId, },
					login,
					password,
					passwordHash,
					moderator,
					status,
				})
				.returning('*');
			if (!item) {
				throw new Error(`User not created`);
			}
			delete item.password;
			delete item.passwordHash;
			return item;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `User not created`,
			});
		}
	}

	async handlerRead({
		userId,
	}) {
		try {
			const item = await User.query().findById(+userId);
			if (!item) {
				throw new Error(`User #${userId} not found`);
			}
			delete item.password;
			delete item.passwordHash;
			return item;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `User not readed`,
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
			const passwordHash = password && bcrypt.hashSync(password, salt);
			const item = await User.query()
				.patchAndFetchById(+userId, {
					...login!==undefined && { login, },
					...password!==undefined && { password, passwordHash, },
					...moderator!==undefined && { moderator, },
					...status!==undefined && { status, },
				});
			if (!item) {
				throw new Error(`User #${userId} not found`);
			}
			delete item.password;
			delete item.passwordHash;
			return item;
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
			const affectedRows = await User.query().deleteById(+userId);
			if (!affectedRows) {
				throw new Error(`User #${userId} not found`);
			}
			return true;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `User not updated`,
			});
		}
	}

	async handlerList({
		skip,
		take,
	}) {
		try {
			const items = await User.query();
			return { items, };
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `User list not found`,
			});
		}
	}

}