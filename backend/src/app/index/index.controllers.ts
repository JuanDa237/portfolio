import { Request, Response } from 'express';

class IndexController {
	public index(request: Request, response: Response): Response {
		return response.json({
			message: 'Welcome to my api for send emails from Conctact Me form.'
		});
	}
}

export const indexController = new IndexController();
