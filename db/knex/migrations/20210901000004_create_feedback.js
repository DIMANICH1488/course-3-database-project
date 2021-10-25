export const tableName = 'feedback';

const create = (knex) => knex.schema.createTable(tableName, (table) => {
	table.increments('feedback_id').primary();
	table.integer('drive_id').references('drive_id').inTable('drive').onUpdate('RESTRICT').onDelete('CASCADE');
	table.integer('user_id').references('user_id').inTable('user').onUpdate('RESTRICT').onDelete('CASCADE');
	table.text('comment');
	table.integer('mark');
});

const drop = (knex) => knex.schema.dropTable(tableName);

export const up = async (knex) => {
	console.log(create(knex).toString());
  await create(knex);
};

export const down = async (knex) => {
	console.log(drop(knex).toString());
  await drop(knex);
};