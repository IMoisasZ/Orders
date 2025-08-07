// models
import { Client, ClientAttributes, ClientOptions } from './client.model.js'
import { Company, CompanyAttributes, CompanyOptions } from './company.model.js'
import {
	TypeItem,
	TypeItemAttributes,
	TypeItemOptions,
} from './type_item.model.js'
import { Order, OrderAttributes, OrderOptions } from './order.model.js'
import {
	OrderDetails,
	OrderDetailsAttributes,
	OrderDetailsOptions,
} from './order_details.model.js'

// associations
import { clientAssociation } from '../associations/client.association.js'
import { companyAssociation } from '../associations/company.association.js'
import { typeItemAssociations } from '../associations/type_item.associations.js'
import { orderAssociations } from '../associations/order.association.js'
import { orderDetailsAssociation } from '../associations/order_details.association.js'

const { NODE_ENV } = process.env

// function for initialize the associations
export function initializeModels(DbConnection) {
	Client.init(ClientAttributes, {
		...ClientOptions,
		sequelize: DbConnection,
		modelName: 'Client',
	})
	Company.init(CompanyAttributes, {
		...CompanyOptions,
		sequelize: DbConnection,
		modelName: 'Company',
	})
	TypeItem.init(TypeItemAttributes, {
		...TypeItemOptions,
		sequelize: DbConnection,
		modelName: 'TypeItem',
	})
	Order.init(OrderAttributes, {
		...OrderOptions,
		sequelize: DbConnection,
		modelName: 'Order',
	})
	OrderDetails.init(OrderDetailsAttributes, {
		...OrderDetailsOptions,
		sequelize: DbConnection,
		modelName: 'OrderDetails',
	})

	clientAssociation(Order, Client)
	companyAssociation(Order, Company)
	typeItemAssociations(OrderDetails, TypeItem)
	orderAssociations(Order, Company, Client, OrderDetails)
	orderDetailsAssociation(Order, OrderDetails, TypeItem)
}

export async function syncModels(DbConnection) {
	try {
		if (NODE_ENV === 'development') {
			await DbConnection.sync({ force: true })
			console.warn('Database synced with force: true (development only)')
		} else if (NODE_ENV === 'production') {
			await DbConnection.sync({ alter: true })
			console.warn('Database synced with alter: true (production)')
		} else {
			await DbConnection.sync()
			console.warn('Database synced without force or alter')
		}
	} catch (error) {
		throw error
	}
}

export { Client, Company, TypeItem, Order, OrderDetails }
