import OrderDetailsService from '../services/order_details.service.js'

async function createOrderDetails(req, res, next) {
	try {
		const item = req.body
		res.status(201).send(await OrderDetailsService.createOrderDetails(item))
		const loggerMessage = `POST - /order_details - ${JSON.stringify(item)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateOrderDetails(req, res, next) {
	try {
		const { id } = req.params
		const item = req.body
		res.status(200).send(await OrderDetailsService.updateOrderDetails(id, item))
		const loggerMessage = `PUT - /order_details/:id-${id} - ${JSON.stringify(
			item
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getAllOrderDetails(req, res, next) {
	try {
		const { order_id } = req.params
		const { status_id } = req.query
		console.log(order_id)

		res
			.status(200)
			.send(await OrderDetailsService.getAllOrderDetails(order_id, status_id))
		const loggerMessage =
			status_id !== undefined && status_id !== null
				? `GET - /order_details/oder/:order_id=${order_id} - status_id=${status_id}`
				: `GET - /order_details/oder/:order_id=${order_id} - status_id=null`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getOrderDetails(req, res, next) {
	try {
		const { id } = req.params
		res.status(200).send(await OrderDetailsService.getOrderDetails(id))
		const loggerMessage = `GET - /order_details/:id=${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function changeStatusOrderDetails(req, res, next) {
	try {
		const { id } = req.params
		const { status_id } = req.body
		res
			.status(200)
			.send(await OrderDetailsService.changeStatusOrderDetails(id, status_id))
		const loggerMessage = `PATCH - /order_details/:id=${id} - status_id=${status_id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function deleteOrderDetailsItem(req, res, next) {
	try {
		const { id } = req.params
		await OrderDetailsService.deleteOrderDetailsItem(id)
		res.status(200).json({ msg: 'Operação realizada com sucesso!' })
		const loggerMessage = `DELETE - /order_details/:id=${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createOrderDetails,
	updateOrderDetails,
	getAllOrderDetails,
	getOrderDetails,
	changeStatusOrderDetails,
	deleteOrderDetailsItem,
}
