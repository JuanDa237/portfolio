import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Needed .env
import dotenv from 'dotenv';
import keys from './keys';

// Routes
import emailRoutes from './app/email/email.routes';

//Funcions
import { startConnection } from './database';

class Server {
	public app: Application;

	constructor() {
		// Enviroment variables
		dotenv.config();

		// Express
		this.app = express();
		this.configExpress();
		this.othersConfings();

		this.initialConfig();

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

		// See peticions in console
		this.app.use(
			morgan(
				'tiny', // dev - tiny
				{
					skip: function (req, res) {
						return res.statusCode < 400;
					}
				}
			)
		);
	}

	private initialConfig(): void {
		startConnection();
	}

	private routes(): void {
		// Client
		this.app.use('/', express.static('public'));

		// Api
		this.app.use('/api', emailRoutes);
	}

	public start(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log('Server on port ' + this.app.get('port'));
		});
	}
}

const server = new Server();
server.start();
