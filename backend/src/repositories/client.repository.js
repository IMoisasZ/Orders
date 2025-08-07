import { Client } from '../models/index.model.js'

/**
 * @param {object} client - Data object client to be added.
 * @returns {object} - Return an object with the new client that was add into the database.
 */
async function createClient(client) {
	return await Client.create(client)
}

/**
 * @param {number} id -Id of client.
 * @param {object} client - Data object client to be updated.
 * @returns {object} - Return an object that with updated.
 */
async function updateClient(id, client) {
	await Client.update(client, {
		where: {
			id,
		},
	})
	return await getClient(id)
}

/**
 * @param {object} whereClause - Object with a param about status of client.
 * @returns {object} - Return an object with all clients following the whereClause.
 */
async function getAllClients(whereClause) {
	return await Client.findAll({
		where: whereClause,
	})
}

/**
 * @param {number} id - Id of client.
 * @returns {object} - Return an object with data client.
 */
async function getClient(id) {
	return await Client.findByPk(id)
}

/**
 * @param {id} id  - Id of client.
 * @param {boolean} active - Status client to be enabled or disabled.
 * @returns {object} - Return an object with data client tha was enabled or disabled.
 */
async function patchDisableEnableClient(id, active) {
	await Client.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getClient(id)
}

export default {
	createClient,
	updateClient,
	getAllClients,
	getClient,
	patchDisableEnableClient,
}
