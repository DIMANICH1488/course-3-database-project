import { Model, snakeCaseMappers, } from 'objection';

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
			required: [
				'login',
				'password',
				'moderator',
				'status',
			],
			properties: {
				id: {
					type: 'integer',
				},
				login: {
					type: 'string',
					minLength: 1,
					maxLength: 64,
				},
				password: {
					type: 'string',
					minLength: 1,
					maxLength: 256,
				},
				moderator: {
					type: 'boolean',
				},
				status: {
					type: 'integer',
					enum: [-1, 0, 1],
				},
			}
		};
	}
}
