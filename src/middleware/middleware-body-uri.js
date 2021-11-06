import express from 'express';

const options = {
	extended: true,
	inflate: true,
	limit: '2kb',
	parameterLimit: 1000,
	type: [
		'application/x-www-form-urlencoded',
	],
	verify: (req, res,buf, encoding) => undefined,
};

export default ({ app, }) => {
	app.use(express.urlencoded(options));
};