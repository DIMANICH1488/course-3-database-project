export const tableName = 'user';

export const up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
		table.increments('user_id', { primaryKey: true, });
		table.string('login', 64);
		table.string('password', 256);
		table.boolean('moderator');
		table.integer('status');
	}).then(() => knex(tableName).insert(
		[ {
			user_id: 1,
			login: 'admin',
			password: '111111',
			moderator: true,
			status: 1,
		}, {
			user_id: 100,
			login: 'user',
			password: '111111',
			moderator: false,
			status: 1,
		}, {
			user_id: 101,
			login: 'guest',
			password: '111111',
			moderator: false,
			status: -1,
		}, ]
	));
};

export const down = (knex) => {
  return knex.schema.dropTable(tableName);
};