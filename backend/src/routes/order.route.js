import { Router } from 'express'
import OrderController from '../controllers/order.controller.js'
import {
	validationOrderCreation,
	validationOrderUpdate,
	validationOrderGetAllOrdersByStatusId,
	validationOrderGetOrderById,
	validationOrderGetByClientId,
	validationOrderGetByCompanyID,
	validationOrderGetByTypeOrder,
	validationChangeStatusOrder,
} from '../middlewares/order.middleware.js'

const route = Router()

route.post('/', validationOrderCreation, OrderController.createOrder)
route.put('/:id', validationOrderUpdate, OrderController.updateOrder)
route.get(
	'/status',
	validationOrderGetAllOrdersByStatusId,
	OrderController.getAllOrders
)
route.get(
	'/client/:client_id',
	validationOrderGetByClientId,
	OrderController.getOrdersByClient
)
route.get(
	'/company/:company_id',
	validationOrderGetByCompanyID,
	OrderController.getOrdersByCompany
)
route.get(
	'/type_order/:type_order_id',
	validationOrderGetByTypeOrder,
	OrderController.getOrderByTypeOrder
)
route.get('/:id', validationOrderGetOrderById, OrderController.getOrder)
route.patch(
	'/:id',
	validationChangeStatusOrder,
	OrderController.changeStatusOrder
)

export default route
