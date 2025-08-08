/**
 *
 * @param {type} type -> Type = 'create','update','get','patch'.
 * @param {*} clientData -> Its the data that will be validated.
 * @returns -> Error or true. Its depends the validation of clientData.
 */
export function validatorClient(type, clientData) {
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
