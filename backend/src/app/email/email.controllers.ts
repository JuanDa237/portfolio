import { Request, Response } from 'express';

import { emailFunctions } from './email.functions';

class EmailControllers {
	// Send Email
	public async sendEmail(request: Request, response: Response) {
		const emailInfo: EmailInfo = request.body;

		const canSend = await emailFunctions.sendMails(emailInfo);

		var message: string = '';
		var status: number = 0;

		if (canSend[0]) {
			message += 'Se envio el email a mi.\n';
			if (canSend[1]) {
				message += 'Se envio el mensaje a el.';
				status = 200;
			} else if (!canSend[1]) {
				message += 'No se envio el mensaje a el.';
				status = 500;
			}
		} else if (!canSend[0]) {
			message += 'No se envio el mensaje a mi ni a el.';
			status = 500;
		}

		return response.status(status).json({ message });
	}
}

export const emailControllers = new EmailControllers();
