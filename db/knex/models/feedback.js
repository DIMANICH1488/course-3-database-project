import { Model, snakeCaseMappers, } from 'objection';

export class Feedback extends Model {
	static get tableName() {
		return 'feedback';
	}

	static get columnNameMappers() {
    return snakeCaseMappers();
  }

	static get idColumn() {
		return 'feedback_id';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [
				'driveId',
				'userId',
				'mark',
			],
			properties: {
				feedbackId: { type: 'integer', },
				driveId: { type: 'integer', },
				userId: { type: 'integer', },
				comment: { type: 'string', },
				mark: { type: 'integer', enum: [-1, 0, 1], }, // -1=bad, 0=normal, 1=good
			}
		};
	}

	static get relationMappings() {
		const { Drive, } = require('./drive');
		const { User, } = require('./user');
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: Drive,
				join: { from: 'feedback.drive_id', to: 'drive.drive_id', },
			},
			drive: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: { from: 'feedback.user_id', to: 'user.user_id', },
			},
		};
	}


}
