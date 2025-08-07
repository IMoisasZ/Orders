import { param, query, body } from 'express-validator'
import { validationMiddleware } from '../utils/validation_middleware.utils.js'

const validationTypeItemCreate = [
	body('description')
		.notEmpty()
		.withMessage('Descrição não informada!')
		.trim()
		.isLength({ min: 3 })
		.withMessage('O tipo de item deve ter no minimo 3 caracteres!'),
	body('last_item').optional(),
	validationMiddleware(),
]

const validationTypeItemUpdate = [
	param('id')
		.notEmpty()
		.withMessage('Id não informado!')
		.isNumeric()
		.withMessage('Informe apenas valores numericos!'),
	body('description')
		.notEmpty()
		.withMessage('Descrição não informada!')
		.trim()
		.isLength({ min: 3 })
		.withMessage('O tipo de item deve ter no minimo 3 caracteres!'),
	body('last_item').optional(),
	validationMiddleware(),
]

const validationTypeItemGetAllTypeItems = [
	query('active')
		.optional()
		.isBoolean()
		.withMessage('Informe apenas true or false!'),
	validationMiddleware(),
]

const validationTypeItemGetTypeItem = [
	param('id')
		.notEmpty()
		.withMessage('Id do tipo de material não informado!')
		.isNumeric()
		.withMessage('Informe apenas valores numericos!'),
	validationMiddleware(),
]

const validationTypeItemDisableEnableTypeItem = [
	param('id')
		.notEmpty()
		.withMessage('Id não informado!')
		.isNumeric()
		.withMessage('Informe apenas numeros!'),
	body('active')
		.notEmpty()
		.withMessage('Informe true or false!')
		.isBoolean()
		.withMessage('Informe true or false!'),
	validationMiddleware(),
]

export {
	validationTypeItemCreate,
	validationTypeItemUpdate,
	validationTypeItemGetAllTypeItems,
	validationTypeItemGetTypeItem,
	validationTypeItemDisableEnableTypeItem,
}
