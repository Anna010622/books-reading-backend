import Joi from 'joi';

export const userSignUpSchema = Joi.object({
	name: Joi.string().required().messages({
		'any.required': `missing required name field`,
	}),
	email: Joi.string()
		.email()
		.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
		.messages({
			'any.required': `missing required email field`,
		}),
	password: Joi.string().required().min(6).messages({
		'any.required': `missing required password field`,
	}),
});
export const userSignInSchema = Joi.object({
	email: Joi.string()
		.email()
		.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
		.messages({
			'any.required': `missing required email field`,
		}),
	password: Joi.string().required().min(6).messages({
		'any.required': `missing required password field`,
	}),
});

export const userEmailSchema = Joi.object({
	email: Joi.string().email().required().messages({
		'any.required': `missing required field email`,
	}),
});
