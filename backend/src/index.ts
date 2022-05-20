import express, { Application } from 'express';
import cors from 'cors';

// Needed .env
import dotenv from 'dotenv';
import keys from './keys';

class Server {
	public app: Application;

	constructor() {
		// Enviroment variables
		// .env should be in backend folder
		dotenv.config();

		// Express
		this.app = express();
		this.configExpress();
		this.othersConfings();

		// Config routes
		this.routes();
	}

	private configExpress(): void {
		this.app.set('port', process.env.PORT || keys.PORT);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
	}

	private othersConfings(): void {
		// Cors policy configuration
		this.app.use(cors());
	}

	private routes(): void {
		// Client
		this.app.use('/', express.static('public'));
	}

	public start(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log('Server on port ' + this.app.get('port'));
		});
	}
}

const server = new Server();
server.start();
