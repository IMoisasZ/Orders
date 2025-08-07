export function orderDetailsAssociation(Order, OrderDetails, TypeItem) {
	OrderDetails.belongsTo(Order, {
		foreignKey: 'order_id',
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})

	OrderDetails.belongsTo(TypeItem, {
		foreignKey: 'type_item_id',
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})

	console.warn('Order details associations created!')
}
