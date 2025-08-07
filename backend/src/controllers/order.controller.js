import OrderService from '../services/order.service.js'

async function createOrder(req, res, next) {
	try {
		const order = req.body
		res.status(201).send(await OrderService.createOrder(order))
		logger.info(`POST - /order - ${JSON.stringify(order)}`)
	} catch (error) {
		next(error)
	}
}

async function updateOrder(req, res, next) {
	try {
		const { id } = req.params
		const order = req.body
		res.status(200).send(await OrderService.updateOrder(parseInt(id), order))
		logger.info(`PUT - /order/:id=${id} - ${JSON.stringify(order)}`)
	} catch (error) {
		next(error)
	}
}

async function getAllOrders(req, res, next) {
	try {
		const { status_id } = req.query
		console.log('controller')

		res.status(200).send(await OrderService.getAllOrders(parseInt(status_id)))
		status_id
			? logger.info(`GET - /order/status?status_id=${status_id}`)
			: logger.info(`GET - /order/status?status_id=null`)
	} catch (error) {
		next(error)
	}
}

async function getOrder(req, res, next) {
	try {
		const { id } = req.params
		res.status(200).send(await OrderService.getOrder(parseInt(id)))
		logger.info(`GET - /order/:id=${id}`)
	} catch (error) {
		next(error)
	}
}

async function getOrdersByClient(req, res, next) {
	try {
		const { client_id } = req.params
		res
			.status(200)
			.send(await OrderService.getOrdersByClient(parseInt(client_id)))
		logger.info(`GET - /order/client/:client_id=${client_id}`)
	} catch (error) {
		next(error)
	}
}

async function getOrdersByCompany(req, res, next) {
	try {
		const { company_id } = req.params
		res
			.status(200)
			.send(await OrderService.getOrdersByCompany(parseInt(company_id)))
		logger.info(`GET - /order/company/:company_id=${company_id}`)
	} catch (error) {
		next(error)
	}
}

async function getOrderByTypeOrder(req, res, next) {
	try {
		const { type_order_id } = req.params
		res.status(200).send(await OrderService.getOrderByTypeOrder(type_order_id))
		logger.info(`GET - /order/type_order/:type_order_id=${type_order_id}`)
	} catch (error) {
		next(error)
	}
}

async function changeStatusOrder(req, res, next) {
	try {
		const { id } = req.params
		const { status_id } = req.body
		res
			.status(200)
			.send(
				await OrderService.changeStatusOrder(parseInt(id), parseInt(status_id))
			)
		logger.info(`PATCH - /order/:id=${id} - status_id = ${status_id}`)
	} catch (error) {
		next(error)
	}
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
