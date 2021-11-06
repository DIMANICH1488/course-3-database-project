import express from 'express';

const options = {
	dotfiles: 'ignore',
	etag: true,
	extensions: [ 'htm', 'html', ],
	index: 'index.html',
	lastModified: true,
	maxAge: '1d',
	redirect: true,
	setHeaders: (res, path, stat) => {
		res.set('X-Now', Date.now());
	},
};

export default ({ app, }) => {
	app.use('/', express.static('asset', options));
};