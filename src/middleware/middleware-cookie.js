import cookieParser from 'cookie-parser';

const options = {};

export default ({ app, env, }) => {
	const { COOKIE_SECRET='0123456789', } = env;

	app.use(cookieParser(COOKIE_SECRET, options));
};