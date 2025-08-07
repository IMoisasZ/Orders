import { body, param, query, validationResult } from 'express-validator'
import { validationMiddleware } from '../utils/validation_middleware.utils.js'
import statusOrder from '../data/status_order.data.json' assert { type: 'json' }
import typeOrder from '../data/type_order.data.json' assert { type: 'json' }

const validationOrderCreation = [
	body('date')
		.optional()
		.isISO8601()
		.withMessage('A data deve estar no formato (YYYY-MM-DD)!')
		.toDate()
		.default(new Date())
		.custom((value) => {
			const today = new Date()
			today.setHours(0, 0, 0, 0)
			value.setHours(0, 0, 0, 0)

			if (value > today) {
				throw new Error('A data não pode ser maior que a data atual!')
			}
			return true
		}),
	body('client_id')
		.notEmpty()
		.withMessage('Cliente não informado!')
		.isNumeric()
		.withMessage('Informe apenas numeros!'),
	body('order_number')
		.optional({ nullable: true, checkFalsy: true })
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage('O numero do pedido ter entre 1 e 30 caracteres!'),
	body('type_order_id')
		.notEmpty()
		.withMessage('Tipo do pedido não informado!')
		.isNumeric()
		.withMessage('Aceito apenas valores numericos!')
		.custom((value) => {
			const existTypeOrder = typeOrder.some(
				(type) => type.id === parseInt(value)
			)

			if (!existTypeOrder) {
				throw new Error(`Tipo de pedido não existe!`)
			}
			return true
		}),
	body('status_id')
		.notEmpty()
		.withMessage('O status deve ser enviado!')
		.custom((value) => {
			const existStatus = statusOrder.some(
				(status) => status.id === parseInt(value)
			)
			if (!existStatus) {
				throw new Error(`Status do pedido incorreto ou não existe!`)
			}
			return true
		}),
	validationMiddleware(),
]

const validationOrderUpdate = [
	param('id')
		.notEmpty()
		.withMessage(`Pedido não informado!`)
		.isNumeric()
		.withMessage(`O numero do pedido deve ser numerico!`),
	body('order_number')
		.optional({ nullable: true, checkFalsy: true })
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage('O pedido deve ter entre 1 e 30 caracteres!'),
	body('client_id')
		.optional()
		.isNumeric()
		.withMessage('Aceito apenas valores numéricos!!'),
	body('company_id')
		.optional()
		.isNumeric()
		.withMessage('Aceito apenas valores numéricos!!'),
	body('type_order_id')
		.optional()
		.isNumeric()
		.withMessage('Aceito apenas valores numericos!')
		.custom((value) => {
			const existTypeOrder = typeOrder.some(
				(type) => type.id === parseInt(value)
			)

			if (!existTypeOrder) {
				throw new Error('Tipo de pedido não existe!')
			}

			return true
		}),
	validationMiddleware(),
]

const validationOrderGetAllOrdersByStatusId = [
	query('status_id')
		.optional()
		.isNumeric()
		.withMessage('Informe apenas valores numericos!')
		.custom((value) => {
			const existStatus = statusOrder.some(
				(status) => status.id === parseInt(value)
			)
			if (!existStatus) {
				throw new Error(`O status informado não existe!`)
			}
			return true
		}),
	validationMiddleware(),
]

const validationOrderGetOrderById = [
	param('id').notEmpty().withMessage(`Id do pedido não informado!`),

	validationMiddleware(),
]

const validationOrderGetByClientId = [
	param('client_id')
		.notEmpty()
		.withMessage(`Cliente não informado!`)
		.isNumeric()
		.withMessage('O clinte deve ser informado com valores numericos!'),
	,
	validationMiddleware(),
]

const validationOrderGetByCompanyID = [
	param('company_id')
		.notEmpty()
		.withMessage('A empresa não foi informada!')
		.isNumeric()
		.withMessage('A empresa deve ser informado com valores numericos!'),
	validationMiddleware(),
]

const validationOrderGetByTypeOrder = [
	param('type_order_id')
		.notEmpty()
		.withMessage('Tipo do pedido não informado!')
		.custom((value) => {
			const existTypeOrder = typeOrder.some((type) => type === parseInt(value))

			if (!existTypeOrder) {
				throw new Error('Tipo do pedido não existe!')
			}

			return true
		}),
	validationMiddleware(),
]

const validationChangeStatusOrder = [
	param('id')
		.notEmpty()
		.withMessage(`ID do pedido não informado!`)
		.isNumeric()
		.withMessage('O ID deve ser numerico!'),
	body('status_id')
		.notEmpty()
		.custom((value) => {
			const existStatus = statusOrder.some(
				(status) => status.id === parseInt(value)
			)

			if (!existStatus) {
				throw new Error(`Status do pedido incorreto ou não existe!`)
			}
			return true
		}),
	validationMiddleware(),
]

export {
	validationOrderCreation,
	validationOrderUpdate,
	validationOrderGetAllOrdersByStatusId,
	validationOrderGetOrderById,
	validationOrderGetByClientId,
	validationOrderGetByCompanyID,
	validationOrderGetByTypeOrder,
	validationChangeStatusOrder,
}
