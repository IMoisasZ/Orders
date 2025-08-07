/**
 * @param {string} message - Show a message error if id of client doesn't going to showed.
 * @returns {error} - Return an object with name of error and status.
 */
function ClientIDNotFoundError(message = 'Recurso não informado!') {
	const error = new Error(message)
	error.name = 'ClientIDNotFoundError'
	error.status = 404
	return error
}

/**
 * @param {string} message - Show a message error if client doesn't going to showed.
 * @returns {error} - Return an object with name of error and status.
 */
function ClientNotFoundError(message = 'Recurso não encontrado!') {
	const error = new Error(message)
	error.name = 'ClientNotFoundError'
	error.status = 404
	return error
}

/**
 * @param {string} message - Show a message error if a client already added.
 * @returns {error} - Return an object with name of error and status.
 */
function ClientAlreadyExistError(message = 'Cliente já cadastrado!') {
	const error = new Error(message)
	error.name = 'ClientAlreadyExistError'
	error.status = 409
	return error
}

export { ClientNotFoundError, ClientIDNotFoundError, ClientAlreadyExistError }
