import * as luxon from 'luxon';

export default ({ app, logger, repo, root, }) => {
	app.use((req, res, next) => {
		req.root = root;
		req.repo = repo;

		const now = luxon.DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss.SSSZZ')
		const method = req.method;
		const uri = req.url;
		const query = req.query;
		const body = req.body;

		logger.debug('=== === ===');
		logger.debug('Now: ', now);
		logger.debug('Method: ', method);
		logger.debug('URI: ', uri);
		logger.debug('Query: ', query);
		logger.debug('Body: ', body);
		next();
	});
};