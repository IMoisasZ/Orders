import { Router } from 'express'
import OrderDetailsController from '../controllers/order_details.controller.js'
import {
	validationOrderDetailsCreate,
	validationOrderDetailsUpdate,
	validationOrderDetailsGetAllOrderDetails,
	validationOrderDetailsGetOrderDetails,
	validationOrderDetailsChangeStatusOrderDetails,
	validationOrderDetailsDeleteOrderDetails,
} from '../middlewares/order_details.middleware.js'

const route = Router()

route.post(
	'/',
	validationOrderDetailsCreate,
	OrderDetailsController.createOrderDetails
)
route.put(
	'/:id',
	validationOrderDetailsUpdate,
	OrderDetailsController.updateOrderDetails
)
route.get(
	'/order/:order_id',
	validationOrderDetailsGetAllOrderDetails,
	OrderDetailsController.getAllOrderDetails
)
route.get(
	'/:id',
	validationOrderDetailsGetOrderDetails,
	OrderDetailsController.getOrderDetails
)
route.patch(
	'/:id',
	validationOrderDetailsChangeStatusOrderDetails,
	OrderDetailsController.changeStatusOrderDetails
)
route.delete(
	'/:id',
	validationOrderDetailsDeleteOrderDetails,
	OrderDetailsController.deleteOrderDetailsItem
)

export default route
