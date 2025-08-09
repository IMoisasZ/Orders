import { body, param, query, validationResult } from 'express-validator'
import statsOrder from '../data/status_order.data.json' with { type: 'json' }

function validationMiddleware(defaultMessage = 'Dados inválidos!') {
	return (req, res, next) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map((error) => error.msg)

			return res
				.status(400)
				.json({ message: defaultMessage, errors: errorMessages })
		}
		next()
	}
}

function validationNotNegativeValue(fieldName) {
	let validators = []
	for (let i in fieldName) {
		validators.push(
			body(fieldName[i]).custom((value) => {
				if (parseFloat(value) < 0) {
					throw new Error(`O campo não aceita valores negativos!`)
				}
				return true
			})
		)
	}

	return validators
}

function getValidatorByLocation(locationType) {
	const validatorMap = {
		param: param,
		body: body,
		query: query,
	}
	const validator = validatorMap[locationType]
	if (!validator) {
		throw new Error(`Tipo de localização inválida: ${locationType}`)
	}
	return validator
}

function validationStatusExist(fieldName, locationType) {
	const validatorFunction = getValidatorByLocation(locationType)

	if (!validatorFunction) {
		throw new Error(
			`Tipo de localização inválida para verificação do status ${locationType}`
		)
	}

	return validatorFunction(fieldName).custom((value) => {
		const existStatus = statsOrder.some(
			(status) => status.id === parseInt(value)
		)

		if (!existStatus) {
			throw new Error('O status não existe')
		}
		return true
	})
}

export {
	validationMiddleware,
	validationNotNegativeValue,
	validationStatusExist,
}
