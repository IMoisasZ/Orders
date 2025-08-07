export function validatorClient(type, clientData) {
	// type = 'create','update','get','patch'
	const { id, client } = clientData
	const validationErrors = []

	if (!client || client.trim() === '') {
		validationErrors.push('Cliente não informado!')
	} else if (client.length <= 2) {
		validationErrors.push('Cliente deve ter no minimo 3 carateres!')
	} else if (type !== 'create' && !id) {
		validationErrors.push('Não foi informado o ID do cliente!')
	}

	if (validationErrors.length > 0) {
		const errorToThrow = new Error(validationErrors.join('\n'))

		throw errorToThrow
	}

	return true
}
