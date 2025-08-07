// client
import {
	ClientNotFoundError,
	ClientIDNotFoundError,
	ClientAlreadyExistError,
} from '../errors/client.error.js'
// company
import {
	CompanyNotFoundError,
	CompanyAlReadyExistError,
} from '../errors/company.error.js'
// order
import {
	OrderDataNotSentError,
	OrderNotFoundError,
	StatusOrderNotFoundError,
	TypeOrderNotFoundError,
} from '../errors/order.error.js'
// type item
import {
	TypeItemAlReadyError,
	TypeItemNotFoundError,
} from '../errors/type_item.error.js'
import {
	UniqueConstraintError,
	ValidationError,
	DatabaseError,
} from 'sequelize'

// mapping all customizing errors to be more compact
const errorTypeMap = {
	ClientNotFoundError: 404,
	ClientIDNotFoundError: 404,
	ClientAlreadyExistError: 409,
	CompanyNotFoundError: 404,
	CompanyAlReadyExistError: 409,
	TypeItemAlReadyError: 409,
	TypeItemNotFoundError: 404,
	OrderNotFoundError: 404,
	StatusOrderNotFoundError: 404,
	OrderDataNotSentError: 400,
	TypeOrderNotFoundError: 404,
}

const errorHandler = (err, req, res, next) => {
	// 1. Detail log error
	const currentLogger = req.logger || console
	currentLogger.error(`${req.method} ${req.originalUrl} - ${err.message}`, err)

	// 2. Define a status and message default
	let statusCode = 500
	let errorMessage = 'Ocorreu um erro interno no servidor.'

	// verify type of error customizing
	if (errorTypeMap[err.constructor.name]) {
		statusCode = err.status || errorTypeMap[err.constructor.name]
		errorMessage = err.message

		// unique values
	} else if (err instanceof UniqueConstraintError) {
		// 4. verify if err is type of unique
		statusCode = 409 // 400 Bad Request
		errorMessage = err.message

		// error validaton
	} else if (err instanceof ValidationError) {
		// 5. Verify specify type of validation
		statusCode = 400
		errorMessage =
			err.errors && err.errors.length > 0
				? err.errors.map((e) => e.message).join(', ')
				: err.message

		//  error connection database
	} else if (err instanceof DatabaseError) {
		//6. verify error by don't have comunication with database
		statusCode = 500
		errorMessage = 'Erro ao se comunicar com o banco de dados!'
	}

	// If the error have a status HTTP custom as 404, 401
	else if (err.status) {
		statusCode = err.status
		errorMessage = err.message
	}

	// 7. Error by throw new Error
	else if (err.name === 'Error') {
		statusCode = 400
		errorMessage = err.message
	}

	// 8. Send a response of error to the client
	res.status(statusCode).send({
		error: errorMessage,
	})
}

export default errorHandler
