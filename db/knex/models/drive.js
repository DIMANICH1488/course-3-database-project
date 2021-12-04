import { Model, snakeCaseMappers, } from 'objection';

export class Drive extends Model {
	static get tableName() {
		return 'drive';
	}

	static get columnNameMappers() {
    return snakeCaseMappers();
  }

	static get idColumn() {
		return 'drive_id';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: [
				'orderId',
				'driverId',
				'status',
				'volume',
				'weight',
				'from',
				'to',
				'actualTile',
				'phone',
				'price',
			],
			properties: {
				driveId: { type: 'integer', },
				orderId: { type: 'integer', },
				driverId: { type: 'integer', },
				status: { type: 'integer', enum: [ -1, 0, 1, 2, 3, ], },
				volume: { type: 'number', },
				weight: { type: 'number', },
				from: {
					type: 'object',
					required: [ 'latitude', 'longitude', 'address', ],
					properties: {
						latitude: { type: 'number', },
						longitude: { type: 'number', },
						address: { type: 'string', },
					},
				},
				to: {
					type: 'object',
					required: [ 'latitude', 'longitude', 'address', ],
					properties: {
						latitude: { type: 'number', },
						longitude: { type: 'number', },
						address: { type: 'string', },
					},
				},
				comment: { type: 'string', },
				actualTile: { type: 'string', minLength: 1, maxLength: 32, },
				phone: { type: 'string', minLength: 1, maxLength: 32, },
				price: { type: 'number', },
			},
		};
	}

	static get relationMappings() {
		const { Driver, } = require('./driver');
		const { Order, } = require('./order');
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: Driver,
				join: { from: 'drive.driver_id', to: 'driver.user_id', },
			},
			drive: {
				relation: Model.BelongsToOneRelation,
				modelClass: Order,
				join: { from: 'drive.order_id', to: 'order.order_id', },
			},
		};
	}

}