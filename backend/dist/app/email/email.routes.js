"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_controllers_1 = require("./email.controllers");
class EmailRoutes {
    constructor(router = express_1.Router()) {
        this.router = router;
        this.routes();
    }
    routes() {
        this.router.post('/sendEmail', email_controllers_1.emailControllers.sendEmail);
    }
}
const emailRoutes = new EmailRoutes();
exports.default = emailRoutes.router;
