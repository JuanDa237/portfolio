import { connect } from 'mongoose';

export async function startConnection(): Promise<any> {
	const prod: boolean = true;
	var url: string;

	if (prod) {
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
