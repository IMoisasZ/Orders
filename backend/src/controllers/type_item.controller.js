import TypeItemService from '../services/type_item.service.js'

async function createTypeItem(req, res, next) {
	try {
		const type_item = req.body
		res.status(201).send(await TypeItemService.createTypeItem(type_item))
		logger.info(`POST - /type_item - ${JSON.stringify(type_item)}`)
	} catch (error) {
		next(error)
	}
}

async function updateTypeItem(req, res, next) {
	try {
		const { id } = req.params
		const type_item = req.body
		res.status(200).send(await TypeItemService.updateTypeItem(id, type_item))
		logger.info(`PUT - /type_item/:id=${id} - ${JSON.stringify(type_item)}`)
	} catch (error) {
		next(error)
	}
}

async function getAllTypeItems(req, res, next) {
	try {
		const { active } = req.query
		res.status(200).send(await TypeItemService.getAllTypeItems(active))

		const loggerMessage =
			active === 'true'
				? `GET - /type_item/status?active=${active}`
				: `GET - /type_item/status?active=null`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getTypeItem(req, res, next) {
	try {
		const { id } = req.params
		res.status(200).send(await TypeItemService.getTypeItem(id))
		logger.info(`GET - /type_item/:id=${id}`)
	} catch (error) {
		next(error)
	}
}

async function disableEnableTypeItem(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		res
			.status(200)
			.send(await TypeItemService.disableEnableTypeItem(id, active))
		const loggerMessage = active
			? `PATCH - /type_item/:id=${id} - type item was enabled`
			: `PATCH - /type_item/:id=${id} - type item was disabled`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createTypeItem,
	updateTypeItem,
	getAllTypeItems,
	getTypeItem,
	disableEnableTypeItem,
}
