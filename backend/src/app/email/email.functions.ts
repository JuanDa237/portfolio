import nodemailer from 'nodemailer';

import keys from '../../keys';

// Types
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EmailInfo, StatusEmail } from './models/emails.model';

class EmailFunctions {
	public async sendMails(emailInfo: EmailInfo): Promise<StatusEmail[]> {
		var sentEmails: StatusEmail[] = [];
		const myEmail = process.env.EMAIL || keys.noEnv.EMAIL;

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
			text: `
			Nombre: ${emailInfo.name}
			Email: ${emailInfo.email}
			${emailInfo.message}
			`
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
			text: `Gracias por contactar conmigo pronto te contactare.
			No responder a este correo.`
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
					user: process.env.EMAIL || keys.noEnv.EMAIL,
					pass: process.env.PASS || keys.noEnv.PASS
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
}

export const emailFunctions = new EmailFunctions();
