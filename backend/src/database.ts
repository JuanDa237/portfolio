import { connect } from 'mongoose';
import keys from './keys';

export async function startConnection(): Promise<any> {
	await connect(
		`mongodb://${process.env.DB_HOST || keys.DB.DB_HOST}/${process.env.DB || keys.DB.DB}`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		}
	);
	console.log('DB is connected.');
}
