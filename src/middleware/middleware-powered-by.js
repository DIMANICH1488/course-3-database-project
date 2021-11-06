export default ({ app, }) => {
	app.use((req, res, next) => {
		res.set('x-powered-by', 'Dima Bozhko');
		next();
	});
};