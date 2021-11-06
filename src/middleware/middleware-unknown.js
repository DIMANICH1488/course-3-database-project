export default ({ app, }) => {
	app.all('*', async (req, res, next) => {
		next(new Error(`Unknown route ${ req.method } ${ req.url }`));
	});
};