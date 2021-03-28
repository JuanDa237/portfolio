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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailFunctions = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const keys_1 = __importDefault(require("../../keys"));
// Schemas
const emails_model_1 = __importDefault(require("./models/emails.model"));
class EmailFunctions {
    sendMails(emailInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            var sentEmails = [];
            const myEmail = process.env.EMAIL || keys_1.default.email.EMAIL;
            const sendedToMe = yield this.sendEmailPromise(this.infoToMe(myEmail, emailInfo));
            sentEmails.push({
                user: 'me',
                sent: sendedToMe
            });
            sentEmails.push({
                user: emailInfo.name,
                sent: sendedToMe
            });
            if (sendedToMe) {
                const sendedToUser = yield this.sendEmailPromise(this.infoToUser(myEmail, emailInfo));
                sentEmails[1].sent = sendedToUser;
            }
            else {
                yield this.saveInMongo(emailInfo);
            }
            return sentEmails;
        });
    }
    infoToMe(myEmail, emailInfo) {
        var mailOptions = {
            from: {
                name: 'Juan David Gaviria Correa',
                address: myEmail
            },
            to: [myEmail],
            subject: `${emailInfo.name}: ${emailInfo.subject}`,
            html: this.htmlToMe(emailInfo)
        };
        return mailOptions;
    }
    infoToUser(myEmail, emailInfo) {
        var mailOptions = {
            from: {
                name: 'Juan David Gaviria Correa',
                address: myEmail
            },
            to: [emailInfo.email],
            subject: 'Hola, Pronto te contactare.',
            html: this.htmlToUser(emailInfo)
        };
        return mailOptions;
    }
    // to Promise
    sendEmailPromise(mailOptions) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var options = {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    type: 'login',
                    user: process.env.EMAIL || keys_1.default.email.EMAIL,
                    pass: process.env.PASS || keys_1.default.email.PASS
                }
            };
            const transporter = nodemailer_1.default.createTransport(options);
            const verify = yield this.verify(transporter);
            if (verify) {
                transporter.sendMail(mailOptions, (error) => {
                    if (error) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            }
            else {
                resolve(false);
            }
        }));
    }
    verify(transporter) {
        return new Promise((resolve) => {
            transporter.verify((error) => {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    // Save In Mongo
    saveInMongo(emailInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmail = new emails_model_1.default({
                name: emailInfo.name,
                email: emailInfo.email,
                subject: emailInfo.subject,
                message: emailInfo.message,
                origin: emailInfo.origin
            });
            yield newEmail.save();
        });
    }
    // Emails html
    htmlToMe(emailInfo) {
        return `
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>New Email From Contact Me</title>
				<style>
					* {
						font-family: Arial, Helvetica, sans-serif;
					}

					#origin {
						color: rgba(44, 44, 44, 0.698);
						display: block;
					}
				</style>
			</head>
			<body>
				<p>
					From: ${emailInfo.name} - ${emailInfo.email}
					<span id="origin">${emailInfo.origin}</span>
				</p>
				<h2>${emailInfo.subject}</h2>
				<p>${emailInfo.message}</p>
			</body>
		</html>
		`;
    }
    htmlToUser(emailInfo) {
        return `
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Thanks For Contact Me</title>
				<style>
					* {
						font-family: Arial, Helvetica, sans-serif;
					}
				</style>
			</head>
			<body>
				<h2>Thanks For Contact Me</h2>
				<p>I'll answer you in less than 24 hours.</p>
			</body>
		</html>
		`;
    }
}
exports.emailFunctions = new EmailFunctions();
