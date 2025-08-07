import { TypeItem } from '../models/index.model.js'

async function createTypeItem(type_item) {
	const { id } = await TypeItem.create(type_item)
	return await getTypeItem(id)
}

async function updateTypeItem(id, type_item) {
	await TypeItem.update(type_item, {
		where: {
			id,
		},
	})
	return await getTypeItem(id)
}

async function getAllTypeItems(whereClause) {
	return await TypeItem.findAll({
		where: whereClause,
		order: [['last_item', 'ASC']],
	})
}

async function getTypeItem(id) {
	return await TypeItem.findByPk(id)
}

async function searchTypeItemLastItemAndDisableIt() {
	const { id } = await TypeItem.findOne({
		where: {
			last_item: true,
		},
	})

	await TypeItem.update(
		{ last_item: false },
		{
			where: {
				id,
			},
		}
	)
	return true
}

async function disableEnableTypeItem(id, active) {
	await TypeItem.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getTypeItem(id)
}

export default {
	createTypeItem,
	updateTypeItem,
	getAllTypeItems,
	getTypeItem,
	searchTypeItemLastItemAndDisableIt,
	disableEnableTypeItem,
}
