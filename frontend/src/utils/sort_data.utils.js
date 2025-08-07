export function sortData(data, key, type = 'asc') {
	if (!Array.isArray(data) || data.length === 0 || !key) return data

	const sortedData = [...data] //copy of the data

	const firstValue = data[0]?.[key]
	const valueType = typeof firstValue

	switch (valueType) {
		case 'string':
			return sortedData.sort((a, b) => {
				const valA = a[key] ?? ''
				const valB = b[key] ?? ''
				return type === 'asc'
					? String(valA).localeCompare(String(valB))
					: String(valB).localeCompare(String(valA))
			})

		case 'number':
			return sortedData.sort((a, b) => {
				const valA = Number(a[key]) || 0
				const valB = Number(b[key]) || 0
				return type === 'asc' ? valA - valB : valB - valA
			})

		case 'boolean':
			return sortedData.sort((a, b) => {
				// Convert the values booleans to numbers (true -> 1, false -> 0)
				const valA = Number(!!a[key])
				const valB = Number(!!b[key])
				return type === 'asc' ? valA - valB : valB - valA
			})

		default:
			return data
	}
}
