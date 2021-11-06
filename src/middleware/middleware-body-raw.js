import express from 'express';

const options = {
	inflate: true,
	limit: '1mb',
	type: [
		'application/octet-stream',
	],
	verify: (req, res,buf, encoding) => undefined,
};

export default ({ app, }) => {
	app.use(express.raw(options));
};