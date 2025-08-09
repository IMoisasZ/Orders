import statusOrder from '../data/status_order.data.json' with { type: 'json' }
import typeOrder from '../data/type_order.data.json' with { type: 'json' }

const processOrderItemWithStatus = (orderItem) => {
	const plainOrderItem = orderItem.toJSON
		? orderItem.toJSON()
		: { ...orderItem }

	const foundTypeOrderDescription = typeOrder.find(
		(type) => type.id === parseInt(plainOrderItem.type_item_id)
	)

	const foundStatusDescription = statusOrder.find(
		(status) => status.id === parseInt(plainOrderItem.status_id, 10)
	)?.description

	plainOrderItem.type_order =
		foundTypeOrderDescription || 'Tipo de pedido desconhecido'

	plainOrderItem.status = foundStatusDescription || 'Status desconhecido'

	return plainOrderItem
}

function orderStatusDescription(data) {
	if (Array.isArray(data)) {
		return data.map(processOrderItemWithStatus)
	} else if (data && typeof data === 'object') {
		return processOrderItemWithStatus(data)
	} else {
		console.warn(
			'orderStatusDescription: Tipo de dado inesperado recebido. Retornando o original:',
			typeof data,
			data
		)
		return data
	}
}

export { orderStatusDescription }
