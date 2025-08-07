import { Order, Client, Company } from '../models/index.model.js'

async function createOrder(order) {
	const { id } = await Order.create(order)
	return await getOrder(id)
}

async function updateOrder(id, order) {
	await Order.update(order, {
		where: {
			id,
		},
	})
	return await getOrder(id)
}

async function getAllOrders(clauseWhere) {
	return await Order.findAll({
		where: clauseWhere,

		include: [
			{
				model: Client,
				attributes: ['client'],
			},
			{
				model: Company,
				attributes: ['company'],
			},
		],
	})
}

async function getOrder(id) {
	try {
		return await Order.findByPk(id, {
			include: [
				{
					model: Client,
					attributes: ['client'],
				},
				{
					model: Company,
					attributes: ['company'],
				},
			],
		})
	} catch (error) {
		console.log({ error })
	}
}

async function getOrdersByClient(client_id) {
	console.log('repo', client_id)

	return await Order.findAll({
		where: {
			client_id,
		},
		include: [
			{
				model: Client,
				attributes: ['client'],
			},
			{
				model: Company,
				attributes: ['company'],
			},
		],
	})
}

async function getOrdersByCompany(company_id) {
	return await Order.findAll({
		where: {
			company_id,
		},
		include: [
			{
				model: Client,
				attributes: ['client'],
			},
			{
				model: Company,
				attributes: ['company'],
			},
		],
	})
}

async function getOrderByTypeOrder(type_order_id) {
	return await Order.findAll({
		where: {
			type_order_id,
		},
		include: [
			{
				model: Client,
				attributes: ['client'],
			},
			{
				model: Company,
				attributes: ['company'],
			},
		],
	})
}

async function changeStatusOrder(id, status_id) {
	await Order.update(
		{ status_id },
		{
			where: {
				id,
			},
		}
	)
	return await getOrder(id)
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
