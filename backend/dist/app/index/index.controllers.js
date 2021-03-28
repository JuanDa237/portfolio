"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(request, response) {
        return response.json({
            message: 'Welcome to my api for send emails from Conctact Me form.'
        });
    }
}
exports.indexController = new IndexController();
