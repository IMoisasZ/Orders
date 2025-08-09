import OrderDetailsRepository from '../repositories/order_details.repository.js'
import OrderRepository from '../repositories/order.repository.js'
import statusOrder from '../data/status_order.data.json' with { type: 'json' }
import { OrderDetailsNotFoundError } from '../errors/order_details.error.js'
import {
	OrderNotFoundError,
	StatusOrderNotFoundError,
} from '../errors/order.error.js'

async function createOrderDetails(item) {
	return await OrderDetailsRepository.createOrderDetails(item)
}

async function updateOrderDetails(id, item) {
	const existItem = await OrderDetailsRepository.getOrderDetails(id)
	if (!existItem) {
		throw OrderDetailsNotFoundError(`O Id ${id} não existe!`)
	}

	return await OrderDetailsRepository.updateOrderDetails(id, item)
}

async function getAllOrderDetails(order_id, status_id) {
	const existOrder = await OrderRepository.getOrder(parseInt(order_id))

	if (!existOrder) {
		throw OrderNotFoundError(`O pedido de id ${order_id} não existe!`)
	}

	const existStatusOrder = statusOrder?.some(
		(status) => status.id === parseInt(status_id)
	)

	if (status_id !== undefined && status_id !== null && !existStatusOrder) {
		throw StatusOrderNotFoundError(`O id ${status_id} do status não existe!`)
	}

	const whereClause = status_id ? { order_id, status_id } : { order_id }

	return await OrderDetailsRepository.getAllOrderDetails(whereClause)
}

async function getOrderDetails(id) {
	const orderDetails = await OrderDetailsRepository.getOrderDetails(id)
	if (!orderDetails) {
		throw OrderDetailsNotFoundError(`O id ${id} não existe!`)
	}

	return orderDetails
}

async function changeStatusOrderDetails(id, status_id) {
	const existOrderDetails = await OrderDetailsRepository.getOrderDetails(id)
	if (!existOrderDetails) {
		throw OrderDetailsNotFoundError(`O id ${id} não existe!`)
	}

	const existStatus = statusOrder?.some(
		(status) => status.id === parseInt(status_id)
	)
	if (!existStatus) {
		throw StatusOrderNotFoundError(`O id ${status_id} do status não existe!`)
	}

	return await OrderDetailsRepository.changeStatusOrderDetails(id, status_id)
}

async function deleteOrderDetailsItem(id) {
	const existOrderDetails = await OrderDetailsRepository.getOrderDetails(id)
	if (!existOrderDetails) {
		throw OrderDetailsNotFoundError(`O Id ${id} não existe!`)
	}

	return await OrderDetailsRepository.deleteOrderDetailsItem(id)
}

export default {
	createOrderDetails,
	updateOrderDetails,
	getAllOrderDetails,
	getOrderDetails,
	changeStatusOrderDetails,
	deleteOrderDetailsItem,
}
