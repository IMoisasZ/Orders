import { OrderDetails, TypeItem } from '../models/index.model.js'

async function createOrderDetails(item) {
	const { id } = await OrderDetails.create(item)
	return await getOrderDetails(id)
}

async function updateOrderDetails(id, item) {
	await OrderDetails.update(item, {
		where: {
			id,
		},
	})
	return await getOrderDetails(id)
}

async function getAllOrderDetails(whereClause) {
	console.log(whereClause)

	return await OrderDetails.findAll({
		where: whereClause,
		include: [
			{
				model: TypeItem,
			},
		],
	})
}

async function getOrderDetails(id) {
	return await OrderDetails.findByPk(id, {
		include: {
			model: TypeItem,
		},
	})
}

async function changeStatusOrderDetails(id, status_id) {
	await OrderDetails.update(
		{ status_id },
		{
			where: {
				id,
			},
		}
	)
	return await getOrderDetails(id)
}

async function deleteOrderDetailsItem(id) {
	await OrderDetails.destroy({
		where: {
			id,
		},
	})
	return true
}

export default {
	createOrderDetails,
	updateOrderDetails,
	getAllOrderDetails,
	getOrderDetails,
	changeStatusOrderDetails,
	deleteOrderDetailsItem,
}
