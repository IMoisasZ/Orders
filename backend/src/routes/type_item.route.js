import { Router } from 'express'
import TypeItemController from '../controllers/type_item.controller.js'
import {
	validationTypeItemCreate,
	validationTypeItemUpdate,
	validationTypeItemGetAllTypeItems,
	validationTypeItemGetTypeItem,
	validationTypeItemDisableEnableTypeItem,
} from '../middlewares/type_item.middleware.js'

const route = Router()

route.post('/', validationTypeItemCreate, TypeItemController.createTypeItem)
route.put('/:id', validationTypeItemUpdate, TypeItemController.updateTypeItem)
route.get(
	'/status',
	validationTypeItemGetAllTypeItems,
	TypeItemController.getAllTypeItems
)
route.get('/:id', validationTypeItemGetTypeItem, TypeItemController.getTypeItem)
route.patch(
	'/:id',
	validationTypeItemDisableEnableTypeItem,
	TypeItemController.disableEnableTypeItem
)

export default route
