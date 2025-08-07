import { API } from '../api/api'

async function createClient(client) {
	try {
		const { data } = await API.post('client', client)
		return data
	} catch (error) {
		throw error
	}
}

async function updateClient(dataClient) {
	const { id, ...client } = dataClient

	try {
		const { data } = await API.put(`client/${id}`, client)
		return data
	} catch (error) {
		throw error
	}
}

async function getAllClients(active) {
	try {
		const { data } = await API.get(`client?active=${active}`)

		return data
	} catch (error) {
		throw error
	}
}

async function getClient(id) {
	try {
		const { data } = await API.get(`client/${id}`)
		return data
	} catch (error) {
		throw error
	}
}

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
