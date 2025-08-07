import { Company } from '../models/index.model.js'

async function createCompany(company) {
	const { id } = await Company.create(company)
	return await getCompany(id)
}

async function updateCompany(id, company) {
	await Company.update(company, {
		where: { id },
	})
	return await getCompany(id)
}

async function getAllCompanies(activeFilter) {
	return await Company.findAll({
		where: activeFilter,
	})
}

async function getCompany(id) {
	return await Company.findByPk(id)
}

async function disableEnableCompany(id, active) {
	await Company.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getCompany(id)
}

export default {
	createCompany,
	updateCompany,
	getAllCompanies,
	getCompany,
	disableEnableCompany,
}
