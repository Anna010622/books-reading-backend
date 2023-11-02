import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import HttpError from '../helpers/HttpError';
import User from '../models/user';
import { controllerWrapper } from 'decorators';

const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
	const { email, password, name } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, 'Email in use');
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	res.status(201).json({
		user: {
			name: newUser.name,
			email: newUser.email,
		},
	});
};

const signIn = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, 'Email or password is wrong');
	}

	const isCorrectPassword = await bcrypt.compare(password, user.password);
	if (!isCorrectPassword) {
		throw HttpError(401, 'Email or password is wrong');
	}

	const payload = {
		id: user._id,
	};
	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });
	await User.findByIdAndUpdate(user._id, { token });

	res.json({
		token,
		user: {
			email: user.email,
			name: user.name,
		},
	});
};

const getCurrent = (req, res) => {
	const { email, name } = req.user;

	res.json({ email, name });
};

const signOut = async (req, res) => {
	const { _id } = req.user;
	await User.findOneAndUpdate(_id, { token: '' });
	res.status(204).json({});
};

export default {
	signUp: controllerWrapper(signUp),
	signIn: controllerWrapper(signIn),
	getCurrent: controllerWrapper(getCurrent),
	signOut: controllerWrapper(signOut),
};
