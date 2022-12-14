interface DotEnv {
	// Override generic type-any variables to type-unknown
	[key: string]: unknown,

	// Basic Node variables
	NODE_ENV: 'development' | 'production',
	PORT: number,

	// Database variables
	DB_NAME: string,
	DB_CLUSTER: string,
	DB_USERNAME: string,
	DB_PASSWORD: string,
	DB_URL: string,

	// GitHub App credentials
	GH_INSTALLATION_ID: number,
	GH_CLIENT_ID: string,
	GH_APP_ID: number,
	GH_CLIENT_SECRET: string,
	GH_APP_PRIVATE_KEY: string,

	// Nebuloid App authentication
	JWT_SECRET: string,
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends DotEnv { }
	}
}

export type {DotEnv}
