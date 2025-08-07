import CompanyService from '../services/company.service.js'

async function createCompany(req, res, next) {
	try {
		const company = req.body
		res.status(201).send(await CompanyService.createCompany(company))
		logger.info(`POST - /company - ${JSON.stringify(company)}`)
	} catch (error) {
		next(error)
	}
}

async function updateCompany(req, res, next) {
	try {
		const { id } = req.params
		const company = req.body
		res.status(200).send(await CompanyService.updateCompany(id, company))
		logger.info(`PUT - /company/:id=${id} - ${JSON.stringify(company)}`)
	} catch (error) {
		next(error)
	}
}

async function getAllCompanies(req, res, next) {
	try {
		const { active } = req.query
		console.log(typeof active)

		res.status(200).send(await CompanyService.getAllCompanies(active))
		active === 'true'
			? logger.info(
					`GET - /company/?active=${active} - show only enabled companies`
			  )
			: logger.info(`GET - /company/?active=${active} - show all companies`)
	} catch (error) {
		next(error)
	}
}

async function getCompany(req, res, next) {
	try {
		const { id } = req.params
		res.status(200).send(await CompanyService.getCompany(id))
		logger.info(`GET - /company/:id=${id} - show only company with id ${id}`)
	} catch (error) {
		next(error)
	}
}

async function disableEnableCompany(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		res.status(200).send(await CompanyService.disableEnableCompany(id, active))
		active
			? logger.info(
					`PATCH - /company/:id=${id} - company with ID ${id} was enabled`
			  )
			: logger.info(
					`PATCH - /company/:id=${id} - company with ID ${id} was disabled`
			  )
	} catch (error) {
		next(error)
	}
}

export default {
	createCompany,
	updateCompany,
	getAllCompanies,
	getCompany,
	disableEnableCompany,
}
