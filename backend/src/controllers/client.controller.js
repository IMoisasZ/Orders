import ClientService from '../services/client.service.js'

/**
 *
 * @param {req} req - Param to take the information sent by body, like data of client.
 * @param {res} res - Param to sent information for who call.
 * @param {nex} next - Pass the error for default error. The default error is inside the file app.js.
 */
async function createClient(req, res, next) {
	try {
		const client = req.body
		res.status(201).send(await ClientService.createClient(client))
		const loggerMessage = `POST - /client - ${JSON.stringify(client)}`
		req.logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateClient(req, res, next) {
	try {
		const { id } = req.params
		const client = req.body
		res.status(200).send(await ClientService.updateClient(id, client))
		const loggerMessage = `PUT - /client/:id=${id} - ${JSON.stringify(client)}`
		req.logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getAllClients(req, res, next) {
	try {
		const { active } = req.query
		res.status(200).send(await ClientService.getAllClients(active))
		const loggerMessage =
			active === 'true'
				? `GET - /client?active=${active}`
				: `GET - /client (all clients)`
		req.logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getClient(req, res, next) {
	try {
		const { id } = req.params
		res.status(200).send(await ClientService.getClient(id))
		const loggerMessage = `GET - /client/:id=${id}`
		req.logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function patchDisableEnableClient(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		res
			.status(200)
			.send(await ClientService.patchDisableEnableClient(id, active))
		const loggerMessage = active
			? `PATCH - /client/:id=${id} - Client enabled`
			: `PATCH - /client/:id=${id} - Client disabled`
		req.logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createClient,
	updateClient,
	getAllClients,
	getClient,
	patchDisableEnableClient,
}
