import { Model, snakeCaseMappers, } from 'objection';

export class Driver extends Model {
	static get tableName() {
		return 'driver';
	}

	static get columnNameMappers() {
    return snakeCaseMappers();
  }

	static get idColumn() {
		return 'userId';
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
		const User = require('./user');
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'driver.userId',
					to: 'user.usertId'
				}
			},
		};
	}
}
