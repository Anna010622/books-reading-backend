import HttpError from '../helpers/HttpError';

const isEmptyBody = (req, _, next) => {
	const { length } = Object.keys(req.body);
	if (!length) {
		next(HttpError(400, 'missing fields'));
	}
	next();
};

export default isEmptyBody;
