import { DataTypes, DATE, INTEGER, STRING, Model } from 'sequelize'

class Order extends Model {}

const OrderAttributes = {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	date: {
		type: DATE,
		defaultValue: DataTypes.NOW,
		validate: {
			customValidator(value) {
				// separate the date of the time let the time 0 (hours, minutes, seconds and milliseconds)
				const inputDate = new Date(value)
				inputDate.setHours(0, 0, 0, 0)

				// separate the date of the time let the time 0 (hours, minutes, seconds and milliseconds)
				const today = new Date()
				today.setHours(0, 0, 0, 0)

				// verify if date showed is bigger than today
				if (inputDate.getTime() > today.getTime()) {
					throw new Error(
						`Data não pode ser maior que da data de hoje ${today.toLocaleDateString(
							'pt-BR'
						)}`
					)
				}
			},
		},
	},
	client_id: {
		type: INTEGER,
		allowNull: false,
		validate: {
			isNumeric: {
				msg: 'Aceito apenas valores do tipo numérico!',
			},
		},
	},
	order_number: {
		type: STRING(30),
		allowNull: true,
		set(value) {
			if (value) {
				// verify if have information
				this.setDataValue('order_number', value.trim())
			} else {
				this.setDataValue('order_number', null) // if isnull left null
			}
		},
		validate: {
			len: {
				args: [1, 30],
				msg: 'Numero do pedido deve ter entre 1 e 30 caracteres!',
			},
		},
	},
	type_order_id: {
		type: INTEGER,
		allowNull: false,
		validate: {
			isNumeric: {
				msg: 'Informe apenas numeros!',
			},
		},
	},
	company_id: {
		type: INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Empresa não informada!',
			},
			isNumeric: {
				msg: 'Empresa deve ser numerico!',
			},
		},
	},
	status_id: {
		type: INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Status não informado!',
			},
		},
	},
}

const OrderOptions = {
	tableName: 'order',
	hooks: {
		beforeSave: (instance, options) => {
			if (instance.order_number) {
				instance.order_number = instance.order_number.toLowerCase()
			}
		},
	},
}

export { Order, OrderAttributes, OrderOptions }
