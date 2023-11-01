import { model, Schema } from 'mongoose';
import { handleSaveError, handleUpdateValidate } from './hooks';

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: [true, 'Set password for user'],
		},
		email: {
			type: String,
			match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
			required: [true, 'Email is required'],
			unique: true,
		},
		token: String,
	},
	{ versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', handleUpdateValidate);

userSchema.post('save', handleSaveError);
userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;
