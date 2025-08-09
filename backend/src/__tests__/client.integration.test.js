/** @format */
import request from 'supertest'
/**
 * @description -> Import Express instance.
 */
import app from '../app.js'

import { getDbConnection } from '../connection/db.connection.js'
import { initializeModels, syncModels } from '../models/index.model.js'
import {
	Client,
	Company,
	TypeItem,
	Order,
	OrderDetails,
} from '../models/index.model.js'

describe('Client API', () => {
	let DbConnection

	/**
	 * @description Before all of tests
	 */
	beforeAll(async () => {
		/**
		 * @description -> Connect to the database in memory or tests.
		 * @description On environment test, we can use the temp database in memory.
		 */
		process.env.NODE_ENV = 'test'
		DbConnection = await getDbConnection()

		/**
		 * @description -> Sync the models. Use force: True to guarantee a clear state.
		 */
		initializeModels(DbConnection)
		await syncModels(DbConnection)
	})

	/**
	 * @description -> Clear the database after each test to avoid interference.
	 */

	afterEach(async () => {
		// Disable the FKs
		await DbConnection.query('SET FOREIGN_KEY_CHECKS = 0')
		await OrderDetails.truncate({ force: true })
		await Order.truncate({ force: true })
		await TypeItem.truncate({ force: true })
		await Company.truncate({ force: true })
		await Client.truncate({ force: true })
		// Enable the FKs
		await DbConnection.query('SET FOREIGN_KEY_CHECKS = 1')
	})

	/**
	 * @description -> Close the connection of database after of all tests.
	 */
	afterAll(async () => {
		await DbConnection.close()
	})

	/**
	 * @description -> Create the tests (POST)
	 */
	describe('POST /client', () => {
		it('should create a new client and return 201', async () => {
			/**@description -> Define the variable to the name of client. */
			// const clientName = 'Fiat'
			const newClient = { client: 'fiat', active: true }

			const response = await request(app)
				.post('/client')
				.send(newClient)
				.expect('Content-Type', /json/)
				.expect(201)

			/**
			 * @description -> Verify if response have the correct data.
			 */
			expect(response.body).toHaveProperty('id')
			expect(response.body.client).toBe('fiat')
			expect(response.body.active).toBe(true)
		})

		it('should return 400 if client is not provided', async () => {
			const newClient = {}

			await request(app)
				.post('/client')
				.send(newClient)
				.expect('Content-Type', /json/)
				.expect(400)
		})
	})

	/**
	 * @description -> Test of read - GET
	 */
	describe('GET /client/:id', () => {
		it('should return a client by id', async () => {
			/**@description -> First of all, create a client to have something to search. */
			const createdClient = await request(app)
				.post('/client')
				.send({ client: 'Fiat' })

			const clientId = createdClient.body.id

			const response = await request(app)
				.get(`/client/${clientId}`)
				.expect('Content-Type', /json/)
				.expect(200)

			expect(response.body.id).toBe(clientId)
			expect(response.body.client).toBe('fiat')
		})

		it('should return 404 if client id does not exist', async () => {
			const nonExistentId = 999
			await request(app).get(`/client/${nonExistentId}`).expect(404)
		})
	})

	/**
	 * @description -> Tests of update - PUT
	 */
	describe('PUT /client/:id', () => {
		it('should update a client and return 200', async () => {
			const createdClient = await request(app)
				.post('/client')
				.send({ client: 'ford' })
			const clientId = createdClient.body.id
			const updatedClientData = { client: 'Ford Atualizado' }

			const response = await request(app)
				.put(`/client/${clientId}`)
				.send(updatedClientData)
				.expect('Content-Type', /json/)
				.expect(200)

			expect(response.body.id).toBe(clientId)
			expect(response.body.client).toBe('ford atualizado')
		})

		it('should return 400 if an invalid value is passed to the client field', async () => {
			const createdClient = await request(app)
				.post('/client')
				.send({ client: 'Jeep' })
			const clientId = createdClient.body.id
			const invalidData = { client: 123 } /**@description -> Invalid error. */

			await request(app)
				.put(`/client/${clientId}`)
				.send(invalidData)
				.expect('Content-Type', /json/)
				.expect(400)
		})
	})

	/**
	 * @description -> Tests of disable - PATCH
	 */
	describe('PATCH /client/:id', () => {
		it('should disable a client and return 200', async () => {
			const createdClient = await request(app)
				.post('/client')
				.send({ client: 'BMW' })
			const clientId = createdClient.body.id

			const response = await request(app)
				.patch(`/client/${clientId}`)
				.send({ active: false })
				.expect('Content-Type', /json/)
				.expect(200)

			expect(response.body.id).toBe(clientId)
			expect(response.body.active).toBe(false)
		})

		it('should return 404 if client to be disabled does not exist', async () => {
			const nonExistentId = 999
			await request(app)
				.patch(`/client/${nonExistentId}`)
				.send({ active: false })
				.expect(404)
		})
	})
})
