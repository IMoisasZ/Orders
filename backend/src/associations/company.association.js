export function companyAssociation(Order, Company) {
	Company.hasMany(Order, { foreignKey: 'company_id' })
	console.warn('Company associations created!')
}
