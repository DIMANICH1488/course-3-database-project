import { Model, snakeCaseMappers, } from 'objection';

export class Order extends Model {
	static get tableName() {
		return 'order';
	}

	static get columnNameMappers() {
    return snakeCaseMappers();
  }

	static get idColumn() {
		return 'orderId';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [
				'userId',
				'status',
				'valume',
				'weight',
				'from',
				'to',
				'actialTile',
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
						unit: { type: 'string', },
					},
				},
				weight: {
					type: 'object',
					properties: {
						value: { type: 'number', },
						input: { type: 'number', },
						unit: { type: 'string', },
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
				actualTile: { type: 'string', },
				phone: { type: 'string', minLength: 1, maxLength: 32, },
				price: {
					type: 'object',
					properties: {
						value: { type: 'number', },
						input: { type: 'number', },
						unit: { type: 'string', },
					},
				},
			},
		};
	}
}
