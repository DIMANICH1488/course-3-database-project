import { resolve, } from 'path';
// import engins from 'consolidate';
import pug from 'pug';
// import swig from 'swig';

// const options = isProduction => ({
// 	autoescape: true,
// 	cache: isProduction ? 'memory' : false,
// 	loader: swig.loaders.fs(),
// 	locals: {},
// });

export default ({ app, isProduction, root, repo, logger, }) => {
	// swig.setDefaults(options(isProduction));
	// app.engine('html', swig.renderFile);
	// // app.engine('html', engins.swig);
	app.engine('html', pug.__express);
	app.set('view engine', 'html');
	app.set('views', resolve(root, 'view'));
};