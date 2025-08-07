import OrderRepository from '../repositories/order.repository.js'
import ClientRepository from '../repositories/client.repository.js'
import CompanyRepository from '../repositories/company.repository.js'
import {
	OrderDataNotSentError,
	OrderNotFoundError,
	StatusOrderNotFoundError,
	TypeOrderNotFoundError,
} from '../errors/order.error.js'
import { ClientNotFoundError } from '../errors/client.error.js'
import { CompanyNotFoundError } from '../errors/company.error.js'
import { orderStatusDescription } from '../utils/order.utils.js'
import statusOrder from '../data/status_order.data.json' assert { type: 'json' }
import typeOrder from '../data/type_order.data.json' assert { type: 'json' }

async function createOrder(order) {
	let orders = await OrderRepository.createOrder(order)
	return orderStatusDescription(orders)
}

async function updateOrder(id, order) {
	const existOrder = await OrderRepository.getOrder(id)
	if (!existOrder) {
		throw OrderNotFoundError(`Pedido com o ID ${id} não foi encontrado!`)
	}

	const { client_id, company_id, order_number } = order

	if (!client_id && !company_id && !order_number) {
		throw OrderDataNotSentError(
			`Não foi informado dados para alteração do pedido com ID ${id}`
		)
	}

	let existClient = undefined
	if (client_id) {
		existClient = await ClientRepository.getClient(client_id)
		if (!existClient) {
			throw ClientNotFoundError(`O cliente com ID ${client_id} não existe!`)
		}
	}

	let existCompany = undefined
	if (existCompany) {
		existCompany = await CompanyRepository.getCompany(company_id)
		if (!existCompany) {
			throw CompanyNotFoundError(`A empresa com ID ${company_id} não existe!`)
		}
	}

	const orders = await OrderRepository.updateOrder(id, order)
	return orderStatusDescription(orders)
}

async function getAllOrders(status_id) {
	const clauseWhere = status_id ? { status_id: parseInt(status_id) } : {}

	const orders = await OrderRepository.getAllOrders(clauseWhere)

	return orderStatusDescription(orders)
}

async function getOrder(id) {
	const order = await OrderRepository.getOrder(id)

	if (!order) {
		throw OrderNotFoundError(`O pedido de ID ${id} não foi encontrado!`)
	}

	return orderStatusDescription(order)
}

async function getOrdersByClient(client_id) {
	const client = await ClientRepository.getClient(client_id)
	if (!client) {
		throw ClientNotFoundError(`O cliente com ID ${client_id} não existe!`)
	}

	const orders = await OrderRepository.getOrdersByClient(client_id)
	if (!orders || !orders.length) {
		throw OrderNotFoundError(
			`Não há pedidos para o cliente com ID ${client_id}!`
		)
	}

	return orderStatusDescription(orders)
}

async function getOrdersByCompany(company_id) {
	const company = await CompanyRepository.getCompany(company_id)

	if (!company) {
		throw CompanyNotFoundError(`A empresa com o ID ${company_id} não existe!`)
	}

	const orders = await OrderRepository.getOrdersByCompany(company_id)
	if (!orders || !orders.length) {
		throw OrderNotFoundError(`Não há pedidos para empresa com ID ${company_id}`)
	}

	return orderStatusDescription(orders)
}

async function getOrderByTypeOrder(type_order_id) {
	const existTypeOrder = typeOrder.some(
		(type) => type.id === parseInt(type_order_id)
	)

	if (!existTypeOrder) {
		throw TypeOrderNotFoundError('Tipo de pedido inexistente!')
	}

	const orders = await OrderRepository.getOrderByTypeOrder(type_order_id)

	return orderStatusDescription(orders)
}

async function changeStatusOrder(id, status_id) {
	const existOrder = await OrderRepository.getOrder(id)

	if (!existOrder) {
		throw OrderNotFoundError(`O pedido de ID ${id} não foi econtrado!`)
	}

	const existStatusOrder = statusOrder.some((i) => i.id === status_id)

	if (!existStatusOrder) {
		throw StatusOrderNotFoundError(`O status de ID ${status_id} não existe!`)
	}
	const order = await OrderRepository.changeStatusOrder(id, status_id)

	return orderStatusDescription(order)
}

export default {
	createOrder,
	updateOrder,
	getAllOrders,
	getOrder,
	getOrdersByClient,
	getOrdersByCompany,
	getOrderByTypeOrder,
	changeStatusOrder,
}
