declare global {
	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: never,
			NODE_ENV: 'production',
			PORT: number,
			DB_NAME: string,
			DB_CLUSTER: string,
			DB_USERNAME: string,
			DB_PASSWORD: string,
		}
	}
}

export default undefined
