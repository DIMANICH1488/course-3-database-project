import { Model, snakeCaseMappers, } from 'objection';

export class User extends Model {
	static get tableName() {
		return 'user';
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
			required: [ 'login', 'password', 'password_hash', 'moderator', 'status', ],
			properties: {
				userId: { type: 'integer', },
				login: { type: 'string', minLength: 1, maxLength: 64, },
				password: { type: 'string', minLength: 1, maxLength: 64, },
				passwordHash: { type: 'string', minLength: 0, maxLength: 512, },
				moderator: { type: 'boolean', },
				status: { type: 'integer', enum: [ -1, 1, ], }, // -1=off, 1=on
			},
		};
	}

	static get relationMappings() {
		const Driver = require('./driver');
		return {
			driver: {
				relation: Model.HasOneRelation,
				modelClass: Driver,
				join: {
					from: 'user.userId',
					to: 'driver.userId',
				},
			},
		};
	}

	static genPasswordHash(password) {
		return '';
	}
}
