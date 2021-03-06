import * as bcrypt from 'bcrypt';
import { Model, snakeCaseMappers, } from 'objection';

const salt = bcrypt.genSaltSync(10);

export class User extends Model {
	static get tableName() {
		return 'user';
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
			required: [ 'login', 'password', 'passwordHash', 'moderator', 'status', ],
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
		const { Driver, } = require('./driver');
		const { Order, } = require('./order');
		const { Feedback, } = require('./feedback');
		return {
			driver: {
				relation: Model.HasOneRelation,
				modelClass: Driver,
				join: { from: 'user.user_id', to: 'driver.user_id', },
			},
			order: {
				relation: Model.HasManyRelation,
				modelClass: Order,
				join: { from: 'user.user_id', to: 'order.user_id', },
			},
			feedback: {
				relation: Model.HasManyRelation,
				modelClass: Feedback,
				join: { from: 'user.user_id', to: 'feedback.user_id', },
			},
		};
	}

	static passwordToPasswordHash(password) {
		const passwordHash = bcrypt.hashSync(password, salt);
		return passwordHash;
	}

	static passwordCompare(password, passwordHash) {
		return bcrypt.compareSync(password, passwordHash);
	}
}
