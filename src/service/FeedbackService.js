import { models, } from '../../db';
import { MyErrorApiRequest, } from '../lib';

const { Feedback, } = models;
export class FeedbackService {
	async handlerCreate({
		feedbackId,
		driveId,
		userId,
		comment = '',
		mark = 0,
	}) {
		try {
			const query = () => Feedback.query().returning('*').insert({
				...feedbackId && { feedbackId, },
				driveId,
				userId,
				comment,
				mark,
			});
			// console.dir(query().toKnexQuery().toString());
			const item = await query();
			if (!item) {
				throw new Error(`Feedback not created`);
			}
			return item.feedbackId;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Feedback not created`,
			});
		}
	}

	async handlerUpdate({
		feedbackId,
		driveId,
		userId,
		comment,
		mark,
	}) {
		try {
			const query = () => Feedback.query().findById(+feedbackId).patch({
				...driveId!==undefined && { driveId, },
				...userId!==undefined && { userId, },
				...comment!==undefined && { comment, },
				...mark!==undefined && { mark, },
			});
			// console.dir(query().toKnexQuery().toString());
			const numberOfAffectedRows = await query();
			if (!numberOfAffectedRows) {
				throw new Error(`Feedback #${ feedbackId } not found`);
			}
			return true;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Feedback not updated`,
			});
		}
	}

	async handlerRemove({
		feedbackId,
	}) {
		try {
			const query = () => Feedback.query().deleteById(+feedbackId);
			// console.dir(query().toKnexQuery().toString());
			const numberOfAffectedRows = await query();
			if (!numberOfAffectedRows) {
				throw new Error(`Feedback #${ feedbackId } not found`);
			}
			return true;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Feedback not removed`,
			});
		}
	}

	async handlerRead({
		feedbackId,
		withDrive = false,
		withUser = false,
	}) {
		try {
			const query = () => Feedback.query().select('*').findById(+feedbackId).withGraphFetched({
				// drive: !!withDrive,
				// user: !!withUser,
			});
			// console.dir(query().toKnexQuery().toString());
			const item = await query();
			if (!item) {
				throw new Error(`Feedback #${ feedbackId } not found`);
			}
			return item;
		} catch (error) {
			throw new MyErrorApiRequest({
				error,
				text: `Feedback not readed`,
			});
		}
	}

	async handlerList({
		skip = 0,
		take = 10,
		driveId = 0,
		userId = 0,
		// filter = {},
		// order = [],
		withDrive = false,
		withUser = false,
	}) {
		try {
			const query = () => {
				const query = Feedback.query().where({
					// ...filter,
					...driveId && { drive_id: +driveId, },
					...userId && { user_id: +userId, },
				})
				// .orderBy(order.map(order => {
				// 	return order;
				// }))
				.withGraphFetched({
					// drive: !!withDrive,
					// user: !!withUser,
				});
				return query;
			};
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
				text: `Feedback list not found`,
			});
		}
	}
}