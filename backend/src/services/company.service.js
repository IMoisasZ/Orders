import CompanyRepository from '../repositories/company.repository.js'
import {
	CompanyAlReadyExistError,
	CompanyNotFoundError,
} from '../errors/company.error.js'
import { UniqueConstraintError } from 'sequelize'

async function createCompany(company) {
	try {
		return await CompanyRepository.createCompany(company)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw CompanyAlReadyExistError(`EMpresa ja cadastrada!`)
		}
		throw error
	}
}

async function updateCompany(id, company) {
	const existCompany = await CompanyRepository.getCompany(id)
	if (!existCompany) {
		throw CompanyNotFoundError(`Empresa com ID${id} inexistente!`)
	}
	try {
		return await CompanyRepository.updateCompany(id, company)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw CompanyAlReadyExistError(`Empresa já cadastrada!`)
		}
		throw error
	}
}

async function getAllCompanies(active) {
	let activeFilter = {}

	if (active === 'true') {
		activeFilter = { active: true }
		return await CompanyRepository.getAllCompanies(activeFilter)
	}
	return await CompanyRepository.getAllCompanies(activeFilter)
}

async function getCompany(id) {
	const company = await CompanyRepository.getCompany(id)

	if (!company) {
		throw CompanyNotFoundError(`Empresa não existe!`)
	}

	return company
}

async function disableEnableCompany(id, active) {
	const company = await CompanyRepository.getCompany(id)

	if (!company) {
		throw CompanyNotFoundError(`Empresa não existe!`)
	}

	return await CompanyRepository.disableEnableCompany(id, active)
}

export default {
	createCompany,
	updateCompany,
	getAllCompanies,
	getCompany,
	disableEnableCompany,
}
