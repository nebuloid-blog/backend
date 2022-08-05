import dotenv from 'dotenv'
import type DotEnv from '../globals.js'

// Load environmental variables with dotenv.
dotenv.config( )

// Generally I don't like global variables.
// We'll abstract our env into an importable var here.
export const env: DotEnv = process.env
