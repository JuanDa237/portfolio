import { Router } from 'express';

import { emailControllers } from './email.controllers';

class EmailRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	private routes(): void {
		this.router.post('/sendEmail', emailControllers.sendEmail);
	}
}

const emailRoutes = new EmailRoutes();
export default emailRoutes.router;
