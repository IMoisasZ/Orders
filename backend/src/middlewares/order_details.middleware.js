import { param, query, body } from 'express-validator'
import statusOrder from '../data/status_order.data.json' assert { type: 'json' }
import {
	validationMiddleware,
	validationNotNegativeValue,
	validationStatusExist,
} from '../utils/validation_middleware.utils.js'

const validationOrderDetailsCreate = [
	body('order_id')
		.notEmpty()
		.withMessage('Numero do pedido não informado!')
		.isNumeric()
		.withMessage('Informe apenas valores numericos!'),
	body('preview_date_delivery')
		.optional()
		.isISO8601()
		.withMessage(
			'Data de previsão de entrega inválida! Use o formato YYYY-MM-DD.'
		)
		.toDate(),
	body('description')
		.notEmpty()
		.withMessage('Descrição do item não informado!')
		.trim()
		.isLength({ min: 3, max: 300 })
		.withMessage('Informe no minimo 3 caracteres e no máximo 300'),
	body('type_item_id')
		.notEmpty()
		.withMessage('Tipo de item não informado!')
		.isNumeric()
		.withMessage('Informe apenas valores numericos!'),
	body('di').optional().trim(),
	body('price_without_ipi')
		.notEmpty()
		.withMessage('Preço não informado!')
		.isDecimal()
		.withMessage('Informe apenas valores numeros!'),
	validationNotNegativeValue('price_without_ipi'),
	body('icms')
		.optional()
		.isDecimal()
		.withMessage('Informe apenas valores numeros!'),
	validationNotNegativeValue('icms'),
	body('pis_cofins')
		.optional()
		.isDecimal()
		.withMessage('Informe apenas valores numeros!'),
	validationNotNegativeValue('pis_cofins'),
	body('ipi')
		.optional()
		.isDecimal()
		.withMessage('Informe apenas valores numeros!'),
	validationNotNegativeValue('ipi'),
	body('iss')
		.optional()
		.isDecimal()
		.withMessage('Informe apenas valores numeros!'),
	validationNotNegativeValue('iss'),
	body('simples_nacional')
		.optional()
		.isDecimal()
		.withMessage('Informe apenas valores numeros!'),
	validationNotNegativeValue('simples_nacional'),
	body('status_id')
		.notEmpty()
		.withMessage('Status não informado!')
		.isNumeric()
		.withMessage('Informe apenas valores numericos!'),
	validationStatusExist('status_id', 'body'),
	validationMiddleware(),
]

const validationOrderDetailsUpdate = [
	param('id')
		.notEmpty()
		.withMessage('O id deve ser informado!')
		.isNumeric()
		.withMessage('Informe apenas numeros!'),
	body('preview_date_delivery')
		.optional()
		.isISO8601()
		.withMessage(
			'Data de previsão de entrega inválida! Use o formato YYYY-MM-DD.'
		)
		.toDate(),
	body('description')
		.optional()
		.trim()
		.isLength({ min: 3, max: 300 })
		.withMessage('O campo deve ter entre 3 e 300 caracteres!'),
	body('type_item_id')
		.optional()
		.isNumeric()
		.withMessage('O campo aceita apenas numeros!'),
	body('di').optional().trim(),
	body('price_without_ipi')
		.optional()
		.isDecimal()
		.withMessage('O campo aceita apenas numeros!'),
	validationNotNegativeValue('price_without_ipi'),
	body('icms')
		.optional()
		.isDecimal()
		.withMessage('O campo aceita apenas numeros!'),
	validationNotNegativeValue('icms'),
	body('pis_cofins')
		.optional()
		.isDecimal()
		.withMessage('O campo aceita apenas numeros!'),
	validationNotNegativeValue('pis_cofins'),
	body('ipi')
		.optional()
		.isDecimal()
		.withMessage('O campo aceita apenas numeros!'),
	validationNotNegativeValue('ipi'),
	body('iss')
		.optional()
		.isDecimal()
		.withMessage('O campo aceita apenas numeros!'),
	validationNotNegativeValue('iss'),
	body('simples_nacional')
		.optional()
		.isDecimal()
		.withMessage('O campo aceita apenas numeros!'),
	validationNotNegativeValue('simples_nacional'),
	body('status_id')
		.optional()
		.isNumeric()
		.withMessage('O campo aceita apenas numeros!'),
	validationStatusExist('status_id', 'body'),
	validationMiddleware(),
]

const validationOrderDetailsGetAllOrderDetails = [
	param('order_id')
		.notEmpty()
		.withMessage('O pedido não foi informado!')
		.isNumeric()
		.withMessage('O campo aceita apenas valores'),
	query('status_id')
		.optional()
		.isNumeric()
		.withMessage('O campo aceita apenas numeros!'),
	validationStatusExist('status_id', 'query'),
	validationMiddleware(),
]

const validationOrderDetailsGetOrderDetails = [
	param('id')
		.notEmpty()
		.withMessage('Id não informado!')
		.isNumeric()
		.withMessage('O campo aceita apenas numeros!'),
	validationMiddleware(),
]

const validationOrderDetailsChangeStatusOrderDetails = [
	param('id')
		.notEmpty()
		.withMessage('O id não foi informado!')
		.isNumeric()
		.withMessage('O campo aceita apenas numeros!'),
	body('status_id')
		.notEmpty()
		.withMessage('Status não informado!')
		.isNumeric()
		.withMessage('O campo aceita apenas numeros!'),
	validationStatusExist('status_id', 'body'),
	validationMiddleware(),
]

const validationOrderDetailsDeleteOrderDetails = [
	param('id')
		.notEmpty()
		.withMessage('O id não foi informado!')
		.isNumeric()
		.withMessage('O campo aceita apenas numeros!'),
	validationMiddleware(),
]

export {
	validationOrderDetailsCreate,
	validationOrderDetailsUpdate,
	validationOrderDetailsGetAllOrderDetails,
	validationOrderDetailsGetOrderDetails,
	validationOrderDetailsChangeStatusOrderDetails,
	validationOrderDetailsDeleteOrderDetails,
}
