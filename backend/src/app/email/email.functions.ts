import nodemailer from 'nodemailer';

import keys from '../../keys';

// Types
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EmailInfo, StatusEmail } from './models/emails.model';

// Schemas
import EmailModel from './models/emails.model';

class EmailFunctions {
	public async sendMails(emailInfo: EmailInfo): Promise<StatusEmail[]> {
		var sentEmails: StatusEmail[] = [];
		const myEmail = process.env.EMAIL || keys.email.EMAIL;

		const sendedToMe = await this.sendEmailPromise(this.infoToMe(myEmail, emailInfo));
		sentEmails.push({
			user: 'me',
			sent: sendedToMe
		});

		sentEmails.push({
			user: emailInfo.name,
			sent: sendedToMe
		});

		if (sendedToMe) {
			const sendedToUser = await this.sendEmailPromise(this.infoToUser(myEmail, emailInfo));
			sentEmails[1].sent = sendedToUser;
		} else {
			await this.saveInMongo(emailInfo);
		}

		return sentEmails;
	}

	private infoToMe(myEmail: string, emailInfo: EmailInfo): Mail.Options {
		var mailOptions: Mail.Options = {
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

	private infoToUser(myEmail: string, emailInfo: EmailInfo): Mail.Options {
		var mailOptions: Mail.Options = {
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
	private sendEmailPromise(mailOptions: Mail.Options): Promise<boolean> {
		return new Promise(async (resolve) => {
			var options: SMTPTransport.Options = {
				host: 'smtp.gmail.com',
				port: 465,
				secure: true,
				auth: {
					type: 'login',
					user: process.env.EMAIL || keys.email.EMAIL,
					pass: process.env.PASS || keys.email.PASS
				}
			};

			const transporter = nodemailer.createTransport(options);

			const verify = await this.verify(transporter);

			if (verify) {
				transporter.sendMail(mailOptions, (error) => {
					if (error) {
						resolve(false);
					} else {
						resolve(true);
					}
				});
			} else {
				resolve(false);
			}
		});
	}

	private verify(transporter: Mail): Promise<boolean> {
		return new Promise((resolve) => {
			transporter.verify((error) => {
				if (error) {
					resolve(false);
				} else {
					resolve(true);
				}
			});
		});
	}

	// Save In Mongo
	private async saveInMongo(emailInfo: EmailInfo): Promise<void> {
		const newEmail = new EmailModel({
			name: emailInfo.name,
			email: emailInfo.email,
			subject: emailInfo.subject,
			message: emailInfo.message,
			origin: emailInfo.origin
		});

		await newEmail.save();
	}

	// Emails html
	private htmlToMe(emailInfo: EmailInfo): string {
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

	private htmlToUser(emailInfo: EmailInfo): string {
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

export const emailFunctions = new EmailFunctions();
