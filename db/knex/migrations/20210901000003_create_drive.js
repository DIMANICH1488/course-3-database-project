export const tableName = 'drive';

const create = (knex) => knex.schema.createTable(tableName, (table) => {
	table.increments('drive_id').primary();
	table.integer('order_id').notNullable().references('order_id').inTable('order').onUpdate('RESTRICT').onDelete('CASCADE');
	table.integer('driver_id').notNullable().references('user_id').inTable('driver').onUpdate('RESTRICT').onDelete('CASCADE');
	table.integer('status').notNullable();
	table.jsonb('volume').notNullable().defaultTo({});
	table.jsonb('weight').notNullable().defaultTo({});
	table.jsonb('from').notNullable().defaultTo({});
	table.jsonb('to').notNullable().defaultTo({});
	table.text('comment');
	table.jsonb('actual_tile').notNullable();
	table.string('phone', 32).notNullable();
	table.jsonb('price').notNullable().defaultTo({});
});

const drop = (knex) => knex.schema.dropTable(tableName);

export const up = async (knex) => {
	console.log(create(knex).toString());
  await create(knex);
	await knex.raw(`SELECT SETVAL('drive_drive_id_seq', ?)`, [ 1000, ]);
};

export const down = async (knex) => {
	console.log(drop(knex).toString());
  await drop(knex);
};