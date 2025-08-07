import { Router } from 'express'
import CompanyController from '../controllers/company.controller.js'
import {
	validationCompanyCreate,
	validationCompanyUpdate,
	validationCompanyGetCompanyById,
	validationCompanyDisableEnableCompany,
} from '../middlewares/company.middleware.js'

const route = Router()

route.post('/', validationCompanyCreate, CompanyController.createCompany)
route.put('/:id', validationCompanyUpdate, CompanyController.updateCompany)
route.get('/', CompanyController.getAllCompanies)
route.get('/:id', validationCompanyGetCompanyById, CompanyController.getCompany)
route.patch(
	'/:id',
	validationCompanyDisableEnableCompany,
	CompanyController.disableEnableCompany
)

export default route
