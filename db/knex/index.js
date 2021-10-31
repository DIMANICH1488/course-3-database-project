import fs from 'fs';
import { resolve, } from 'path';
import Knex from 'knex';
import { Model, } from 'objection';
import config from './config';

export const knex = Knex(config);
Model.knex(knex);

export const models = fs.readdirSync(resolve(__dirname, 'models'))
	.filter(file => /[\.]js$/.test(file))
	.map(file => require(`./models/${ file }`))
	.reduce((models, model) => Object.assign(models, model), {});
