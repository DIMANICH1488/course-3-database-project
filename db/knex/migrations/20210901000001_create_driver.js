export const tableName = 'driver';

const create = (knex) => knex.schema.createTable(tableName, (table) => {
	table.integer('user_id').primary().references('user_id').inTable('user').onUpdate('RESTRICT').onDelete('CASCADE');
	table.jsonb('info').notNullable().defaultTo({});
	table.integer('status').notNullable().defaultTo(0);
});

const drop = (knex) => knex.schema.dropTable(tableName);

const fill = (knex, data) => knex(tableName).insert(data);

const data = [ {
	user_id: 100,
	info: {
		xxx: 1,
	},
}, ];

export const up = async (knex) => {
	console.log(create(knex).toString());
	console.log(fill(knex, data).toString());
  await create(knex);
	await fill(knex, data);
};

export const down = async (knex) => {
	console.log(drop(knex).toString());
  await drop(knex);
};