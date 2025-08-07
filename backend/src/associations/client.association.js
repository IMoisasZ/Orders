export function clientAssociation(Order, Client) {
	Client.hasMany(Order, { foreignKey: 'client_id' })
	console.warn('Client associations created!')
}
