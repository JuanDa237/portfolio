"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// Needed .env
const dotenv_1 = __importDefault(require("dotenv"));
const keys_1 = __importDefault(require("./keys"));
// Routes
const email_routes_1 = __importDefault(require("./app/email/email.routes"));
//Funcions
const database_1 = require("./database");
class Server {
    constructor() {
        // Enviroment variables
        dotenv_1.default.config();
        // Express
        this.app = express_1.default();
        this.configExpress();
        this.othersConfings();
        this.initialConfig();
        // Config routes
        this.routes();
    }
    configExpress() {
        this.app.set('port', process.env.PORT || keys_1.default.PORT);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    othersConfings() {
        // Cors policy configuration
        this.app.use(cors_1.default());
        // See peticions in console
        this.app.use(morgan_1.default('tiny', // dev - tiny
        {
            skip: function (req, res) {
                return res.statusCode < 400;
            }
        }));
    }
    initialConfig() {
        database_1.startConnection();
    }
    routes() {
        // Client
        this.app.use('/', express_1.default.static('public'));
        // Api
        this.app.use('/api', email_routes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ' + this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
