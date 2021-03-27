declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: number;
		DB: string;
		DB_HOST: string;
		EMAIL: string;
		PASS: string;
	}
}
