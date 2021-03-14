import { Request, Response } from 'express';

import { emailFunctions } from './email.functions';

// Types
import { EmailInfo } from './models/emails.model';

class EmailControllers {
	// Send Email
	public async sendEmail(request: Request, response: Response) {
		const emailInfo: EmailInfo = request.body;

		const sentEmails = await emailFunctions.sendMails(emailInfo);
		var message: string = '';
		var status: number = 200;

		for (const email of sentEmails) {
			if (email.sent) {
				message += `The email was sent to ${email.user}.`;
			} else {
				message += `The email wasn't sent to ${email.user}.`;
				status = 500;
			}
			message += '\n';
		}

		return response.status(status).json({ message });
	}
}

export const emailControllers = new EmailControllers();
