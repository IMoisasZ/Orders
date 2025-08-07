import { BOOLEAN, INTEGER, STRING, Model } from 'sequelize'

class Client extends Model {
	/**
	 * @param {object} clientData - Data object to be added.
	 * @returns {Promise<Client>} - Returns a promise that resolves  to the new client.
	 */
	static async createClient(clientData) {
		return await this.create(clientData)
	}

	/**
	 * @param {number} id - Id of the client to update.
	 * @param {object} clientData - Data object to be updated.
	 * @returns {Promise<Client | null>} - Returns a promise that resolves to update client or null if no one row it wasn't affected.
	 */
	static async updateClient(id, clientData) {
		const [affectedRows] = await this.update(clientData, { where: { id } })

		if (affectedRows > 0) {
			return await this.getClient(id)
			// return this.findByPk(id)
		}
		return null
	}

	/**
	 * @param {object} whereClause - Object with criteria to filtering clients.
	 * @returns {Promise<Client>} - Returns a promise that resolves all clients filtering.
	 */
	static async getAllClients(whereClause) {
		return await this.findAll({ where: whereClause })
	}

	/**
	 * @param {number} id - Id of the client to retrieve.
	 * @returns {Promise<Client>} - Returns a promise that resolves a client filtered.
	 */
	static async getClient(id) {
		return await this.findByPk(id)
	}

	/**
	 * @param {number} id - Id of the client to be filtered.
	 * @param {*} active - Status of client to be updated.
	 * @returns {Promise <Client | null>} = Returns a promise that resolves a client or null.
	 */
	static async patchDisableEnableClient(id, active) {
		const [affectedRows] = await this.update({ active }, { where: { id } })

		if (affectedRows > 0) {
			return await this.getClient(id)
		}

		return null
	}
}

const ClientAttributes = {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	client: {
		type: STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: {
				msg: 'Cliente não informado!',
			},
			len: {
				args: [2, 100],
				msg: 'O cliente deve ter no minimo 2 caracteres!',
			},
		},
	},
	active: {
		type: BOOLEAN,
		defaultValue: true,
	},
}

const ClientOptions = {
	tableName: 'client',
	hooks: {
		beforeSave: (instance, options) => {
			if (instance.client) {
				instance.client = instance.client.toLowerCase()
			}
		},
	},
}

export { Client, ClientAttributes, ClientOptions }
