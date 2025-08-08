import { API } from '../api/api'

/**
 * @param {client} client -> Data client to execute the creation a new client.
 * @returns -> Returns the client created.
 */
async function createClient(client) {
	try {
		const { data } = await API.post('client', client)
		return data
	} catch (error) {
		throw error
	}
}

/**
 * @param {dataClient} dataClient -> Data client to execute the update the client.
 * @returns -> Returns the client updated.
 */
async function updateClient(dataClient) {
	const { id, ...client } = dataClient

	try {
		const { data } = await API.put(`client/${id}`, client)
		return data
	} catch (error) {
		throw error
	}
}

/**
 * @param {active} active -> Information (true = enabled or false = disabled) about the clients.
 * @returns -> Returns all clients like the param informed.
 */
async function getAllClients(active) {
	try {
		const { data } = await API.get(`client?active=${active}`)

		return data
	} catch (error) {
		throw error
	}
}

/**
 * @param {id} id -> Information about the number of client that exist on database.
 * @returns -> Returns the client like the param informed.
 */
async function getClient(id) {
	try {
		const { data } = await API.get(`client/${id}`)
		return data
	} catch (error) {
		throw error
	}
}

/**
 * @param {id} id -> Information about the number of client that exist on database.
 * @param {active} active -> Information (true = enabled or false = disabled) about the clients.
 * @returns -> Returns the client like the params informed.
 */
async function patchDisableEnableClient(id, active) {
	try {
		const { data } = await API.patch(`client/${id}`, { active })
		console.log(data)

		return data
	} catch (error) {
		throw error
	}
}

export {
	createClient,
	updateClient,
	getAllClients,
	getClient,
	patchDisableEnableClient,
}
