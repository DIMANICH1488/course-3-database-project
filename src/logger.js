import debug from 'debug';

import { env, } from '../env';
const { LOGGER_LEVEL: LEVEL = 5, } = env;

const printable = _ => typeof _ === 'string'
	? _
	: JSON.stringify(_, null, '\t');

export const logger = [
	[ 'error', 1, debug('app:error'), ],
	[ 'warn', 2, debug('app:warn'), ],
	[ 'info', 3, debug('app:info'), ],
	[ 'debug', 4, debug('app:debug'), ],
].reduce((levels, [ name, level, action, ]) => {
	return Object.assign(levels, { [name]: (..._) => {
		return level <= LEVEL && action(..._.map(printable));
	}, });
}, {});