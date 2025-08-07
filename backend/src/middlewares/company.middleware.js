import { param, body } from 'express-validator'
import { validationMiddleware } from '../utils/validation_middleware.utils.js'
const validationCompanyCreate = [
	body('company')
		.notEmpty()
		.withMessage(`Nome da empresa não informado!`)
		.isLength({ min: 2, max: 50 })
		.withMessage(`O nome da empresa deve ter entre 2 e 50 caracteres!`)
		.trim(),
	validationMiddleware(),
]

const validationCompanyUpdate = [
	param('id')
		.notEmpty()
		.withMessage('Empresa não informada!')
		.isNumeric()
		.withMessage('O campo empresa deve ser numerico!'),
	body('company')
		.notEmpty()
		.withMessage(`Nome da empresa não informado!`)
		.isLength({ min: 2, max: 50 })
		.withMessage(`O nome da empresa deve ter entre 2 e 50 caracteres!`)
		.trim(),
	validationMiddleware(),
]

const validationCompanyGetCompanyById = [
	param('id')
		.notEmpty()
		.withMessage('Empresa não informada!')
		.isNumeric()
		.withMessage('O campo empresa deve ser numerico!'),
	validationMiddleware(),
]

const validationCompanyDisableEnableCompany = [
	param('id')
		.notEmpty()
		.withMessage('Empresa não informada!')
		.isNumeric()
		.withMessage('O campo empresa deve ser numerico!'),
	body('active')
		.notEmpty()
		.withMessage('Não informado se vai ativar ou desativar a empresa!')
		.isBoolean()
		.withMessage('O valore deve ser do tipo boolean (true/false)'),
	validationMiddleware(),
]

export {
	validationCompanyCreate,
	validationCompanyUpdate,
	validationCompanyGetCompanyById,
	validationCompanyDisableEnableCompany,
}
