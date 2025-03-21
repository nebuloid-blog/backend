import dotenv from 'dotenv'
import type {DotEnv} from '@app/types/globals'

// Load environmental variables with dotenv.
dotenv.config( )

// Generally I don't like global variables.
// We'll abstract our env into an importable var here.
// This also gives us a chance to assign our custom type.
const env: DotEnv = process.env

export {env}
