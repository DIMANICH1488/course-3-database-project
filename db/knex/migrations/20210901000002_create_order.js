export const tableName = 'order';

const create = (knex) => knex.schema.createTable(tableName, (table) => {
	table.increments('order_id').primary();
	table.integer('user_id').notNullable().references('user_id').inTable('user').onUpdate('RESTRICT').onDelete('CASCADE');
	table.integer('status').notNullable();
	table.jsonb('volume').notNullable();
	table.jsonb('weight').notNullable();
	table.jsonb('from').notNullable();
	table.jsonb('to').notNullable();
	table.text('comment');
	table.jsonb('actual_tile').notNullable();
	table.string('phone', 32).notNullable();
	table.jsonb('price');
});

const drop = (knex) => knex.schema.dropTable(tableName);

export const up = async (knex) => {
	console.log(create(knex).toString());
  await create(knex);
	await knex.raw(`SELECT SETVAL('order_order_id_seq', ?)`, [ 1000, ]);
};

export const down = async (knex) => {
	console.log(drop(knex).toString());
  await drop(knex);
};
