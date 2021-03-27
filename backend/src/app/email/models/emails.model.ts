import { Schema, model, Document } from 'mongoose';

// Interfaces

export interface EmailInfo extends Document {
	name: string;
	email: string;
	subject: string;
	message: string;
	origin: string;
}

export interface StatusEmail {
	user: string;
	sent: boolean;
}

// Schemas
const emailSchema: Schema = new Schema(
	{
		name: {
			type: String
		},
		email: {
			type: String,
			required: true
		},
		subject: {
			type: String
		},
		message: {
			type: String
		},
		origin: {
			type: String,
			required: true
		}
	},
	{
		versionKey: false,
		timestamps: {
			createdAt: true,
			updatedAt: false
		}
	}
);

export default model<EmailInfo>('email', emailSchema);
