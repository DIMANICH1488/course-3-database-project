import { Model, snakeCaseMappers, } from 'objection';

export class Driver extends Model {
	static get tableName() {
		return 'driver';
	}

	static get columnNameMappers() {
    return snakeCaseMappers();
  }

	static get idColumn() {
		return 'user_id';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [ 'info', 'status', ],
			properties: {
				userId: { type: 'integer', },
				info: { type: 'object', },
				status: { type: 'integer', enum: [ -1, 0, 1, ], }, // -1=off, 0=in queue, 1=on
			},
		};
	}

	static get relationMappings() {
		const { User, } = require('./user');
		const { Drive, } = require('./drive');
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: { from: 'driver.user_id', to: 'user.user_id', },
			},
			drive: {
				relation: Model.HasManyRelation,
				modelClass: Drive,
				join: { from: 'driver.user_id', to: 'drive.driver_id', },
			},
		};
	}
}
