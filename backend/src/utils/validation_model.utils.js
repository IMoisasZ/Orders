export const customValidators = {
	isDecimal: {
		args: true,
		msg: 'Informe apenas valores numéricos!',
	},
	isNumeric: {
		args: true,
		msg: 'Informe apenas valores numéricos!',
	},
	dateAfterToday(value) {
		const inputDate = new Date(value)
		inputDate.setHours(0, 0, 0, 0)

		const today = new Date()
		today.setHours(0, 0, 0, 0)

		if (inputDate.getTime() > today.getTime()) {
			throw new Error(
				`Data não pode ser maior que da data de hoje ${today.toLocaleDateString(
					'pt-BR'
				)}`
			)
		}
	},
	lengthValidator(value) {
		if (value > 10) {
			throw new Error(`Não é aceito mais que 10 parcelas!`)
		}
	},
	notNegative: (value) => {
		if (typeof value === 'number' && value < 0) {
			throw new Error('Não são aceitos valores negativos!')
		}
	},
}
