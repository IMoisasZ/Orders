function CompanyNotFoundError(message = 'Recurso não encontrado!') {
	const error = new Error(message)
	error.name = 'CompanyNotFoundError'
	error.status = 404
	return error
}

function CompanyAlReadyExistError(message = 'Empresa já cadastrada!') {
	const error = new Error(message)
	error.name = 'CompanyAlReadyExist'
	error.status = 404
	return error
}

export { CompanyNotFoundError, CompanyAlReadyExistError }
