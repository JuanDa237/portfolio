"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailControllers = void 0;
const email_functions_1 = require("./email.functions");
class EmailControllers {
    // Send Email
    sendEmail(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            var emailInfo = request.body;
            emailInfo.origin = request.header('Origin') || 'Not_Given';
            const sentEmails = yield email_functions_1.emailFunctions.sendMails(emailInfo);
            var message = '';
            var status = 200;
            for (const email of sentEmails) {
                if (email.sent) {
                    message += `The email was sent to ${email.user}.`;
                }
                else {
                    message += `The email wasn't sent to ${email.user}.`;
                    status = 500;
                }
                message += '\n';
            }
            return response.status(status).json({ message });
        });
    }
}
exports.emailControllers = new EmailControllers();
