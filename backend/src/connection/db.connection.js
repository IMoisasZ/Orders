/** @format */

// src/connection/db.connection.js
import Sequelize from 'sequelize'

let dbConnectionInstance = null

export async function getDbConnection() {
	if (dbConnectionInstance) {
		return dbConnectionInstance
	}

	const { DATABASE, DB_USER, DB_PASSWORD, HOST, DIALECT, NODE_ENV } =
		process.env

	if (!DIALECT) {
		throw new Error(
			'DIALECT is not defined in environment variables. Please check your .env file and ensure loadEnvConfig() is called.'
		)
	}
	if (!DATABASE) {
		throw new Error('DATABASE is not defined in environment variables.')
	}

	const dbConnectNoDatabase = new Sequelize({
		host: HOST,
		dialect: DIALECT,
		username: DB_USER,
		password: DB_PASSWORD,
		logging: false,
	})

	try {
		await dbConnectNoDatabase.authenticate()
		console.warn('Temporary connection for DB existence check established.') // Debug

		const [results] = await dbConnectNoDatabase.query(
			`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${DATABASE}';`
		)

		// if environment is development create a database and results equals 0
		if (
			(NODE_ENV === 'development' || NODE_ENV === 'test') &&
			results.length === 0
		) {
			await dbConnectNoDatabase.query(`CREATE DATABASE ${DATABASE};`)
			console.warn(
				`Database '${DATABASE}' created successfully in DEVELOPMENT environment.`
			)
		} else if (results.length === 0) {
			// if doesn't be development return error
			console.error(
				`Database '${DATABASE}' does not exist and auto-creation is disabled for ${NODE_ENV} environment.`
			)
			throw new Error(
				`Database '${DATABASE}' not found or not created. Check environment or manual creation.`
			)
		}
	} catch (error) {
		console.error(
			'Error during initial database connection or creation:',
			error.message
		)
		throw error
	} finally {
		await dbConnectNoDatabase.close() // always close the temporary connection
		console.warn('Temporary connection closed.') // Debug
	}

	// connecting with database specify
	dbConnectionInstance = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
		host: HOST,
		dialect: DIALECT,
		define: {
			timestamps: true,
		},
		logging: (msg) => console.warn(`[Sequelize] ${msg}`),
	})

	return dbConnectionInstance
}
