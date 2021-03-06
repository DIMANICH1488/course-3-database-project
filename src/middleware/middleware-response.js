export default ({ app, lib, isProduction, logger, }) => {
	const {
		MySuccessApi,
		MySuccessApiItem,
		MySuccessApiItems,
		MySuccessApiStream,
		MySuccessSsrStream,
		MyErrorApiAccess,
		MyErrorApiAuth,
		MyErrorApiRequest,
		MyErrorApiValidate,
		MyErrorSsrRequest,
		MyError,
	} = lib;

	app.use((E, req, res, next) => {
		// console.log('response.use', { E, });
		if (E instanceof MySuccessApi) {
			const { data, } = E;
			res.status(200).json({ ...data, });
		} else if (E instanceof MySuccessApiItem) {
			const { item, version, } = E;
			logger.info(`MySuccessApiItem(${ JSON.stringify({ item, }, null, '\t') })`);
			res.status(200).json({ item, version, });
		} else if (E instanceof MySuccessApiItems) {
			const { items, total, version, } = E;
			logger.info(`MySuccessApiItems(${ JSON.stringify({ items, total, }, null, '\t') })`);
			res.status(200).json({ items, total, version, });
		} else if (E instanceof MySuccessApiStream) {
			logger.info(`MySuccessApiStream`);
		} else if (E instanceof MySuccessSsrStream) {
			logger.info(`MySuccessSsrStream`);
		} else if (E instanceof MyErrorApiAccess) {
			console.log('response.use', { E, });
			const { message, } = E;
			res.status(403).json({ error: message, });
		} else if (E instanceof MyErrorApiAuth) {
			console.log('response.use', { E, });
			const { message, } = E;
			res.status(401).json({ error: message, });
		} else if (E instanceof MyErrorApiRequest) {
			console.log('response.use', { E, });
			const { message, } = E;
			res.status(404).json({ error: message, });
		} else if (E instanceof MyErrorApiValidate) {
			console.log('response.use', { E, });
			const { errors, } = E;
			res.status(422).json({ error: errors, });
		} else if (E instanceof MyErrorSsrRequest) {
			console.log('response.use', { E, });
			const { status, } = E;
			res.status(200).end(`Error for status ${ status }`); // TODO: render from file
		} else if (E instanceof MyError) {
			console.log('response.use', { E, });
			const { message, } = E;
			res.status(500).json({ error: message, });
		} else if (E instanceof Error) {
			console.log('response.use', { E, });
			if (isProduction) {
				res.status(403).end('.');
			} else {
				const { stack, } = E;
				res.status(500).json({ error: `${ stack }`, });
			}
		} else {
			console.log('response.use', { E, });
			res.status(500).end(`?`);
		}
	});
};