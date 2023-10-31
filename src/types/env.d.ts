declare global {
	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: string | undefined;
			PORT: string;
			DB_HOST: string;
			JWT_SECRET: string;
			UKR_NET_EMAIL: string;
			UKR_NET_PASSWORD: string;
			BASE_URL: string;
		}
	}
}
export {};
