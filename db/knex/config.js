// https://knexjs.org/
// https://vincit.github.io/objection.js/

import debug from 'debug';
import pg from 'pg';
import { env, } from 'process';

const config = {
	client: 'pg',
	connection: {
		host : 'localhost',
    port : 5432,
		database: 'mydb',
		user: 'bozhko',
		password: '123456',
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		directory: './db/knex/migrations',
		tableName: 'knex_migrations',
	},
	seeds: {
		directory: './db/knex/seeds',
	},
	log: {
		debug: debug('knex:debug'),
		deprecate: debug('knex:deprecate'),
		error: debug('knex:error'),
		warn: debug('knex:warn'),
	},
};
  
export const development = { ...config, };
export const production = { ...config, };

export default /^production|prod$/i.test(env.NODE_ENV) ? production : development;