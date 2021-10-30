import { Model, snakeCaseMappers, } from 'objection';

export class Feedback extends Model {
	static get tableName() {
		return 'feedback';
	}

	static get columnNameMappers() {
    return snakeCaseMappers();
  }

	static get idColumn() {
		return 'feedbackId';
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
}
