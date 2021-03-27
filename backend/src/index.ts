import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Needed .env
import dotenv from 'dotenv';
import keys from './keys';

// Routes
import indexRoutes from './app/index/index.routes';
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

		// Morgan to see peticions in console
		this.app.use(morgan('dev'));
	}

	private initialConfig(): void {
		startConnection();
	}

	private routes(): void {
		this.app.use('/', indexRoutes);
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
