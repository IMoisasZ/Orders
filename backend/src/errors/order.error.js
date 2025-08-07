function OrderNotFoundError(message = 'Recurso não encontrado!') {
	const error = new Error(message)
	error.name = 'OrderNotFoundError'
	error.status = 404
	return error
}

function StatusOrderNotFoundError(message = 'Status incorreto!') {
	const error = new Error(message)
	error.name = 'StatusOrderNotFoundError'
	error.status = 404
	return error
}

function TypeOrderNotFoundError(message = 'Tipo de ordem incorreto!') {
	const error = new Error(message)
	error.name = 'TypeOrderNotFoundError'
	error.status = 404
	return error
}

function OrderDataNotSentError(message = 'Recurso não informado!') {
	const error = new Error(message)
	error.name = 'OrderDataNotSentError'
	error.status = 404
	return error
}

export {
	OrderNotFoundError,
	StatusOrderNotFoundError,
	TypeOrderNotFoundError,
	OrderDataNotSentError,
}
