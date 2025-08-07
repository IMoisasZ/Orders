import { configDotenv } from 'dotenv'

export function loadEnvConfig() {
	const nodeEnv = process.env.NODE_ENV || 'development'
	const envFilePath = `.env.${nodeEnv}`

	configDotenv({ path: envFilePath })
}
