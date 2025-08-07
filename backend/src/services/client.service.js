import { Client } from '../models/index.model.js'
import {
	ClientAlreadyExistError,
	ClientIDNotFoundError,
	ClientNotFoundError,
} from '../errors/client.error.js'
import { UniqueConstraintError } from 'sequelize'

/**
 * @param {object} client - Object client to create a new client.
 * @throws {error} - Return an error if client already added.
 * @returns {object} - Return the client added.
 */
async function createClient(client) {
	try {
		return await Client.createClient(client)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw ClientAlreadyExistError(
				`O cliente ${client.client} já foi cadastrado!`
			)
		}
		throw error
	}
}

/**
 * @param {number} id - Id the client.
 * @param {object} client - Object with data of client to be updated.
 * @throws {error} - Return an error if the id doesn't exist.
 * @returns {object} - Return the object with data client updated.
 **/
async function updateClient(id, client) {
	console.log(id)

	const existClient = await Client.getClient(id)

	if (!existClient) {
		throw new Error(`Cliente com id ${id} inexistente!`)
	}
	try {
		return await Client.updateClient(id, client)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw ClientAlreadyExistError(
				`O cliente ${client.client.toLowerCase()} já foi cadastrado!`
			)
		}
		throw error
	}
}

/**
 * @param {string} active - If active is 'true', show just clients enabled or all clients if active is different of 'true'.
 * @returns {object} - Return an object with clients following the params.
 */
async function getAllClients(active) {
	const whereClause = active === 'true' ? { active: true } : {}
	return await Client.getAllClients(whereClause)
}

/**
 * @param {number} id - Id of client.
 * @throws {error} - Return an error if the id is null and undefined.
 * @throws {error} - Return an error if the client doesn't exist.
 * @returns {object} - Return an object with client added.
 */
async function getClient(id) {
	if (!id) {
		throw ClientIDNotFoundError(`O id não foi informado!`)
	}
	const client = await Client.getClient(id)
	if (!client) {
		throw ClientNotFoundError(`Cliente com id ${id} inexistente!`)
	}
	return client
}

/**
 * @param {id} id - Id of client.
 * @param {boolean} active - New status of client . If true, enable the client and false disable.
 * @throws {error} - Return an error if id id null and undefined.
 * @returns {object} = Return an object with client that was enabled or disabled.
 */
async function patchDisableEnableClient(id, active) {
	if (!id) {
		throw ClientIDNotFoundError(`O id não foi informado!`)
	}
	const client = await Client.getClient(id)
	if (!client) {
		throw ClientNotFoundError(`Cliente com id ${id} inexistente!`)
	}
	return await Client.patchDisableEnableClient(id, active)
}

export default {
	createClient,
	updateClient,
	getAllClients,
	getClient,
	patchDisableEnableClient,
}
