export interface EmailInfo {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export interface StatusEmail {
	user: string;
	sent: boolean;
}
