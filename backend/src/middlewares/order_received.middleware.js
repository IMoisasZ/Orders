import { body, param, query } from 'express-validator'
import {
	validationMiddleware,
	validationNotNegativeValue,
	validationTypeOrderReceivedExist,
	validationStatusOrderReceivedExist,
} from '../utils/validation_middleware.utils.js'

const validationOrderReceivedCreate = [
	body('order_id')
		.notEmpty()
		.withMessage(
			'Numero do pedido é obrigatório e deve ser um valor numérico válido.'
		)
		.isNumeric(),
	body('type_id').notEmpty().withMessage('Tipo não informado!'),
	validationTypeOrderReceivedExist('type_id', 'body'),
	body(['item_id', 'invoice'])
		.optional()
		.isNumeric()
		.withMessage('O campo aceita apenas numeros!'),
	body('invoicing_date')
		.optional()
		.custom((value) => {
			const today = new Date()
			today.setHours(0, 0, 0, 0)

			const dateValue = new Date(value)
			dateValue.setHours(0, 0, 0, 0)

			if (dateValue > today) {
				throw new Error(`A data não pode ser uma data futura!`)
			}
			return true
		}),
	body(['invoicing_value', 'fees', 'discount', 'received_value'])
		.optional()
		.isDecimal()
		.withMessage('O campo aceita apenas valores!'),
	...validationNotNegativeValue([
		'invoice_value',
		'fees',
		'discount',
		'received_value',
	]),
	body('received_previous').optional(),
	body('status_id').notEmpty().withMessage('Status id não informado!'),
	validationStatusOrderReceivedExist('status_id', 'body'),
	validationMiddleware(),
]

const validationOrderReceivedUpdate = [
	param('id')
		.notEmpty()
		.withMessage('O ID deve ser informdo!')
		.isNumeric()
		.withMessage('É aceito apenas numeros!'),
	body('type_id').optional(),
	validationTypeOrderReceivedExist('type_id', 'body'),
	body(['item_id', 'invoice'])
		.optional()
		.isNumeric()
		.withMessage('É aceito apenas numeros!'),
	body('invoicing_date')
		.optional()
		.custom((value) => {
			const today = new Date()
			today.setHours(0, 0, 0, 0)

			const dataValue = new Date(value)
			dataValue.setHours(0, 0, 0, 0)

			if (dataValue > today) {
				throw new Error(`A data não pode ser uma data futura!`)
			}
			return true
		}),
	body(['invoicing_value', 'fees', 'discount', 'received_value'])
		.optional()
		.isDecimal()
		.withMessage('O campo aceita apenas valores!'),
	...validationNotNegativeValue([
		'invoice_value',
		'fees',
		'discount',
		'received_value',
	]),
	body('received_previous').optional(),
	body('status_id').notEmpty().withMessage('Status id não informado!'),
	validationStatusOrderReceivedExist('status_id', 'body'),
	validationMiddleware(),
]

const validationOrderReceivedGetAllOrderReceived = [
	param('order_id')
		.notEmpty()
		.withMessage('ID não informado!')
		.isNumeric()
		.withMessage('É aceito apenas numeros!'),
	query(['type_id', 'status_id'])
		.optional()
		.isNumeric()
		.withMessage('É aceito apenas numeros!'),
	validationStatusOrderReceivedExist('status_id', 'query'),
	validationTypeOrderReceivedExist('type_id', 'query'),
	validationMiddleware(),
]

const validationOrderReceivedGetOrderReceived = [
	param('id')
		.notEmpty()
		.withMessage('ID não informado!')
		.isNumeric()
		.withMessage('É aceito apenas numeros!'),
	validationMiddleware(),
]

const validationOrderReceivedChangeOrderReceived = [
	param('id')
		.notEmpty()
		.withMessage('ID não informado!')
		.isNumeric()
		.withMessage('É aceito apenas numeros!'),
	body('status_id')
		.notEmpty()
		.withMessage('O "status_id" não foi informado!')
		.isNumeric()
		.withMessage('É aceito apenas numeros!'),
	validationStatusOrderReceivedExist('status_id', 'body'),
	validationMiddleware(),
]

const validationOrderReceivedDeleteOrderReceived = [
	param('id')
		.notEmpty()
		.withMessage('ID não informado!')
		.isNumeric()
		.withMessage('É aceito apenas numeros!'),
	validationMiddleware(),
]

export {
	validationOrderReceivedCreate,
	validationOrderReceivedUpdate,
	validationOrderReceivedGetAllOrderReceived,
	validationOrderReceivedGetOrderReceived,
	validationOrderReceivedChangeOrderReceived,
	validationOrderReceivedDeleteOrderReceived,
}
