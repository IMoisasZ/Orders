import { Router } from 'express'
import ClientController from '../controllers/client.controller.js'
import {
	validationClientCreate,
	validationClientUpdate,
	validationClientGetAllClient,
	validationClientGetClient,
	validationClientPatchDisableEnableClient,
} from '../middlewares/client.middleware.js'

const route = Router()

route.post('/', validationClientCreate, ClientController.createClient)
route.put('/:id', validationClientUpdate, ClientController.updateClient)
route.get('/', validationClientGetAllClient, ClientController.getAllClients)
route.get('/:id', validationClientGetClient, ClientController.getClient)
route.patch(
	'/:id',
	validationClientPatchDisableEnableClient,
	ClientController.patchDisableEnableClient
)

export default route
