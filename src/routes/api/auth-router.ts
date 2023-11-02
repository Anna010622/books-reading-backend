import express from 'express';
import { userSignUpSchema, userSignInSchema } from '../../schemas/user-schemas';
import { validateBody } from '../../decorators/index';
import { isEmptyBody, authenticate } from '../../middlewares/index';
import authController from '../../controllers/auth-controllers';

const authRouter = express.Router();

authRouter.post(
	'/signup',
	isEmptyBody,
	validateBody(userSignUpSchema),
	authController.signUp
);

authRouter.post(
	'/login',
	isEmptyBody,
	validateBody(userSignInSchema),
	authController.signIn
);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/logout', authenticate, authController.signOut);

export default authRouter;
