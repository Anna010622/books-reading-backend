import jwt from 'jsonwebtoken';
import { controllerWrapper } from '../decorators/index';
import HttpError from '../helpers/HttpError';
import User from '../models/user';

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
	const { authorization = '' } = req.headers;
	const [bearer, token] = authorization.split(' ');
	if (bearer !== 'Bearer') {
		throw HttpError(401, 'Not authorized');
	}
	try {
		const { id } = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(id);
		if (!user || !user.token) {
			throw HttpError(401, 'Not authorized');
		}
		req.user = user;
		next();
	} catch {
		throw HttpError(401, 'Not authorized');
	}
};

export default controllerWrapper(authenticate);
