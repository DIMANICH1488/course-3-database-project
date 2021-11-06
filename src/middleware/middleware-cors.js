import cors from 'cors';

const options = (req, done) => {
	done(null, { origin: true, }); // 
	// done(null, { origin: false, }); // allow
};

export default ({ app, }) => {
	app.use(cors(options));
};