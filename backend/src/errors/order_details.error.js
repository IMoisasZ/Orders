function OrderDetailsNotFoundError(message = 'Recurso não encontrado!') {
	const error = new Error(message)
	error.name = 'OrderDetailsNotFound'
	error.status = 404
	return error
}

export { OrderDetailsNotFoundError }
