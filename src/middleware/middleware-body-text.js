import express from 'express';

const options = {
	defaultCharset: 'utf-8',
	inflate: true,
	limit: '1mb',
	type: [
		'text/plain',
	],
	verify: (req, res,buf, encoding) => undefined,
};

export default ({ app, }) => {
	app.use(express.text(options));
};