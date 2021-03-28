import { connect } from 'mongoose';

export async function startConnection(): Promise<any> {
	var url: string;

	if (process.env.PROD) {
		url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_U_PASS}@contact-me.dcrjc.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
	} else {
		url = `mongodb://${process.env.DB_HOST}/${process.env.DB}`;
	}

	try {
		await connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});

		console.log('DB is connected.');
	} catch (error) {
		console.log("DB isn't connected.");
	}
}
