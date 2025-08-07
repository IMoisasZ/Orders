// src/config/logger.config.js
import winston from 'winston'

let loggerInstance = null

export function getLogger() {
	if (loggerInstance) {
		return loggerInstance
	}

	const { NODE_ENV, LOG_FILE_NAME } = process.env

	const { combine, timestamp, label, printf } = winston.format

	const myFormat = printf(({ level, message, label, timestamp }) => {
		return `${timestamp} [${label}] ${level} ${message}`
	})

	loggerInstance = winston.createLogger({
		level: NODE_ENV === 'production' ? 'info' : 'debug',
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({
				filename: LOG_FILE_NAME || 'app.log',
				maxsize: 5 * 1024 * 1024,
				maxFiles: 5,
				tailable: true,
			}),
		],
		format: combine(
			label({ label: 'api' }),
			timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			myFormat
		),
	})

	return loggerInstance
}
