declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: number;
		DB: string;
		DB_HOST: string;
		DB_USER: string;
		DB_U_PASS: string;
		EMAIL: string;
		PASS: string;
	}
}
