export const tableName = 'user';

const create = (knex) => knex.schema.createTable(tableName, (table) => {
	table.increments('user_id').primary();
	table.string('login', 64).notNullable().unique();
	table.string('password', 64).notNullable();
	table.string('password_hash', 512).notNullable().defaultTo('');
	table.boolean('moderator').notNullable().defaultTo(false);
	table.integer('status').notNullable().defaultTo(-1);
});

const drop = (knex) => knex.schema.dropTable(tableName);

const fill = (knex, data) => knex(tableName).insert(data);

const data = [ {
	user_id: 1,
	login: 'admin',
	password: '111111',
	moderator: true,
	status: 1,
}, {
	user_id: 100,
	login: 'user',
	password: '111111',
	status: 1,
}, {
	user_id: 101,
	login: 'guest',
	password: '111111',
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