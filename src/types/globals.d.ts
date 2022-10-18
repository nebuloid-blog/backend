interface DotEnv {
	[key: string]: unknown,
	NODE_ENV: 'development' | 'production',
	PORT: number,
	DB_NAME: string,
	DB_CLUSTER: string,
	DB_USERNAME: string,
	DB_PASSWORD: string,
	DB_URL: string,
	JWT_SECRET: string,
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends DotEnv { }
	}
}

export type {DotEnv}
