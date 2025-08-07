function TypeItemAlReadyError(message = 'Tipo de item já cadastrado!') {
	const error = new Error(message)
	error.name = 'TypeItemAlReadyError'
	error.status = 409
	return error
}

function TypeItemNotFoundError(message = 'Recurso não encontrado!') {
	const error = new Error(message)
	error.name = 'TypeItemNotFoundError'
	error.status = 404
	return error
}

export { TypeItemAlReadyError, TypeItemNotFoundError }
