import TypeItemRepository from '../repositories/type_item.repository.js'
import { UniqueConstraintError } from 'sequelize'
import {
	TypeItemAlReadyError,
	TypeItemNotFoundError,
} from '../errors/type_item.error.js'

async function createTypeItem(type_item) {
	try {
		return await TypeItemRepository.createTypeItem(type_item)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw TypeItemAlReadyError(
				`O item ${type_item.description} já foi cadastrado!`
			)
		}
		throw error
	}
}

async function updateTypeItem(id, type_item) {
	const existTypeItem = await TypeItemRepository.getTypeItem(id)
	if (!existTypeItem) {
		throw TypeItemNotFoundError(`O tipo de item com ID ${id} não existe!`)
	}

	const updateLastItem = type_item.last_item

	if (updateLastItem) {
		await TypeItemRepository.searchTypeItemLastItemAndDisableIt()
		return await TypeItemRepository.updateTypeItem(id, type_item)
	}

	return await TypeItemRepository.updateTypeItem(id, type_item)
}

async function getAllTypeItems(active) {
	const whereClause = active === 'true' ? { active: true } : {}

	return await TypeItemRepository.getAllTypeItems(whereClause)
}

async function getTypeItem(id) {
	const typeItem = await TypeItemRepository.getTypeItem(id)

	if (!typeItem) {
		throw TypeItemNotFoundError(`O tipo de item com ID ${id} não existe!`)
	}

	return typeItem
}

async function disableEnableTypeItem(id, active) {
	const existTypeItem = await TypeItemRepository.getTypeItem(id)
	if (!existTypeItem) {
		throw TypeItemNotFoundError(`Tipo item com ID ${id} não existe!`)
	}

	return await TypeItemRepository.disableEnableTypeItem(id, active)
}

export default {
	createTypeItem,
	updateTypeItem,
	getAllTypeItems,
	getTypeItem,
	disableEnableTypeItem,
}
