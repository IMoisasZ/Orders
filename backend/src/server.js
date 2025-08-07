import { loadEnvConfig } from './config/env.config.js'
loadEnvConfig()

import app from './app.js'
import { getDbConnection } from './connection/db.connection.js'
import { initializeModels, syncModels } from './models/index.model.js'
import { getLogger } from './config/logger.config.js'

const logger = getLogger()

const { PORT = 3333 } = process.env

let DbConnection

try {
	// 1. Authentic the connection with database
	DbConnection = await getDbConnection()
	await DbConnection.authenticate()
	logger.info('Connection to the database has been established successfully.')

	// 2. Initialize the associations with the models
	initializeModels(DbConnection)

	// 3. Synchronizer the models
	await syncModels(DbConnection)
	logger.info('Models synchronized successfully.')

	// 4. Start express server
	app.listen(PORT, () => {
		logger.info(
			`SERVER RUNNING ON PORT ${PORT} - ${process.env.npm_lifecycle_event} - ${process.env.NODE_ENV}`
		)
	})
} catch (error) {
	logger.error(
		'Failed to initialize the server due to a database error.',
		error
	)

	console.warn({ error })

	if (DbConnection && typeof DbConnection.close === 'function') {
		await DbConnection.close()
	}
	process.exit(1)
}
