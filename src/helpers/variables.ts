import {env} from '@helpers/secrets'

const {NODE_ENV} = env

const getOriginUrl = ( ) => {
	switch (NODE_ENV) {
		case ('development'): {
			return 'http://localhost:3000'
		}
		default:
		case ('production'): {
			return 'https://nebuloid.dev'
		}
	}
}

const ORIGIN_URL = getOriginUrl( )

// Max cookie age is 5 days on the backend.
// This probably should have parity with the max JWT age
//   AKA its expiration date setting.
const MAX_COOKIE_AGE_IN_SECONDS = 1000 * 60 * 60 * 24 * 5
//                                ms.    min. hour day

export {
	MAX_COOKIE_AGE_IN_SECONDS,
	ORIGIN_URL,
}
