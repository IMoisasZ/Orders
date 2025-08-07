export function orderAssociations(Order, Company, Client, OrderDetails) {
	Order.belongsTo(Company, {
		foreignKey: 'company_id',
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})

	Order.belongsTo(Client, {
		foreignKey: 'client_id',
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})

	Order.hasMany(OrderDetails, { foreignKey: 'order_id' })

	console.warn('Order associations created!')
}
