interface DotEnv {
	[key: string]: unknown,
	NODE_ENV: 'production',
	PORT: number,
	DB_NAME: string,
	DB_CLUSTER: string,
	DB_USERNAME: string,
	DB_PASSWORD: string,
	JWT_SECRET: string,
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends DotEnv { }
	}
}

export default DotEnv
