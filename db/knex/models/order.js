import { Model, snakeCaseMappers, } from 'objection';

export class Order extends Model {
	static get tableName() {
		return 'order';
	}

	static get columnNameMappers() {
    return snakeCaseMappers();
  }

	static get idColumn() {
		return 'order_id';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [
				'userId',
				'status',
				'volume',
				'weight',
				'from',
				'to',
				'actualTile',
				'phone',
			],
			properties: {
				orderId: { type: 'integer', },
				userId: { type: 'integer', },
				status: { type: 'integer', enum: [ -1, 0, 1, ], },
				volume: {
					type: 'object',
					properties: {
						value: { type: 'number', },
						input: { type: 'number', },
						unit: { type: 'string', enum: [ 'cm^3', 'm^3', 'L', 'kL' ], },
					},
				},
				weight: {
					type: 'object',
					properties: {
						value: { type: 'number', },
						input: { type: 'number', },
						unit: { type: 'string', enum: [ 'mg', 'g', 'kg', ], },
					},
				},
				from: {
					type: 'object',
					properties: {
						latitude: { type: 'number', },
						longitude: { type: 'number', },
						address: { type: 'string', },
					},
				},
				to: {
					type: 'object',
					properties: {
						latitude: { type: 'number', },
						longitude: { type: 'number', },
						address: { type: 'string', },
					},
				},
				comment: { type: 'string', },
				actualTile: { type: 'string', minLength: 1, maxLength: 32, },
				phone: { type: 'string', minLength: 1, maxLength: 32, },
				price: {
					type: 'object',
					properties: {
						value: { type: 'number', },
						input: { type: 'number', },
						unit: { type: 'string', enum: [ 'ua', '$', 'euro', ], },
					},
				},
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
				join: { from: 'order.user_id', to: 'user.usert_id', },
			},
			drive: {
				relation: Model.HasManyRelation,
				modelClass: Drive,
				join: { from: 'order.order_id', to: 'drive.order_id', },
			},
		};
	}

	static volumeValue(input, unit) {
		const ok = _ => Number.isFinite(_);
		const k = {
			'cm^3': 0.001,
			'm^3': 1000,
			'L': 1,
			'kL': 1000,
		}[unit] ?? null;
		return ok(input) && ok(k) ? k * input : null;
	}

	static weightValue(input, unit) {
		const ok = _ => Number.isFinite(_);
		const k = {
			'mg': 0.000001,
			'g': 0.001,
			'kg': 1,
		}[unit] ?? null;
		return ok(input) && ok(k) ? k * input : null;
	}

	static priceValue(input, unit) {
		const ok = _ => Number.isFinite(_);
		const k = {
			'ua': 0.037,
			'$': 1,
			'euro': 1.1481,
		}[unit] ?? null;
		return ok(input) && ok(k) ? k * input : null;
	}

}
