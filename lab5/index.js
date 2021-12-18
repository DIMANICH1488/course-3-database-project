const redis = require('async-redis');
const mysql = require('mysql-await');

const client = redis.createClient({
	url: 'redis://localhost:6380',
});
client.on('error', (error) => console.error({ type: 'redis', error, }));

const storeMock = async (client) => {
	// init cred in redis
	await client.set('lab5:mysql:host', 'localhost');
	await client.set('lab5:mysql:port', '1234');
	await client.set('lab5:mysql:login', 'lab5');
	await client.set('lab5:mysql:password', '123');
	await client.set('lab5:mysql:database', 'mysql');
	return null;
};
const storeRead = async (client) => {
	// read cred from redis
	const host = await client.get('lab5:mysql:host');
	const port = await client.get('lab5:mysql:port');
	const login = await client.get('lab5:mysql:login');
	const password = await client.get('lab5:mysql:password');
	const database = await client.get('lab5:mysql:database');
	return { host, port, login, password, database, };
};
async function redisAct(act) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await act(client);
			resolve(result);
		} catch (error) {
			reject({ type: 'redis', error, })
		}
	});
}
async function mysqlAct({ host, port, login: user, password, database, }) {
	return new Promise(async (resolve, reject) => {
		try {
			const connection = mysql.createConnection({ host, port, user, password, database, });
			await connection.connect();
			const result = await connection.awaitQuery('SELECT NOW()');
			await connection.awaitEnd();
			resolve(result);
		} catch (error) {
			reject({ type: 'mysql', error, });
		}
	});
}

console.log('started!');

redisAct(storeMock)
	.then(() => redisAct(storeRead))
	.then(mysqlAct)
	.then(console.log)
	.catch(console.error);

// ALTER USER 'lab5'@'%' IDENTIFIED WITH mysql_native_password BY '123';