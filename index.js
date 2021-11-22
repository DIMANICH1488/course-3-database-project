const register = require('@babel/register');
register({});

require('./env');
require('./src/app');