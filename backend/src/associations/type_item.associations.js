export function typeItemAssociations(OrderDetails, TypeItem) {
	TypeItem.hasMany(OrderDetails, { foreignKey: 'type_item_id' })
}
