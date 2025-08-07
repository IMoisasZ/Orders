import { body, param, query } from 'express-validator'
import { validationMiddleware } from '../utils/validation_middleware.utils.js'

const validationClientCreate = [
	body('client')
		.notEmpty()
		.custom((value) => {
			if (typeof value !== 'string') {
				throw new Error(`O cliente deve ser um texto!`)
			}
			return true
		})
		.trim()
		.isLength({ min: 2, max: 100 })
		.withMessage('O cliente deve ter no minimo 2 caracteres!'),
	validationMiddleware(),
]

const validationClientUpdate = [
	param('id').isNumeric().withMessage('O ID deve ser numerico!'),
	body('client')
		.trim()
		.notEmpty()
		.withMessage('Cliente não informado!')
		.isString()
		.withMessage('O cliente deve ser um texto!')
		.isLength({ min: 2, max: 100 })
		.withMessage('O cliente deve ter no minimo 2 caracteres!'),
	validationMiddleware(),
]

const validationClientGetAllClient = [
	query('active')
		.optional()
		.trim()
		.isIn(['true', 'false'])
		.withMessage('Informe apenas true ou false'),
	validationMiddleware(),
]

const validationClientGetClient = [
	param('id')
		.notEmpty()
		.withMessage('Informe o ID.')
		.isNumeric()
		.withMessage('É aceito apenas numeros.'),
	validationMiddleware(),
]

const validationClientPatchDisableEnableClient = [
	param('id')
		.notEmpty()
		.withMessage('Informe o ID.')
		.isNumeric()
		.withMessage('É aceito apenas numeros.'),
	body('active')
		.notEmpty()
		.withMessage('Informe o status - true ou false.')
		.isBoolean()
		.withMessage('É aceito apenas true ou false.'),
	validationMiddleware(),
]

export {
	validationClientCreate,
	validationClientUpdate,
	validationClientGetAllClient,
	validationClientGetClient,
	validationClientPatchDisableEnableClient,
}
