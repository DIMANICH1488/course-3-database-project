import express from 'express';

const options = {
	inflate: true,
	limit: '1mb',
	type: [
		'application/json',
		'application/*+json',
	],
	verify: (req, res,buf, encoding) => undefined,
};

export default ({ app, }) => {
	app.use(express.json(options));
};