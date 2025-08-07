import { DATE, DECIMAL, INTEGER, STRING, Model } from 'sequelize'

class OrderDetails extends Model {}

const OrderDetailsAttributes = {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	order_id: {
		type: INTEGER,
		allowNull: false,
		validate: {
			isNumeric: {
				msg: 'ID do pedido deve ser numerico!',
			},
		},
	},
	preview_date_delivery: {
		type: DATE,
		allowNull: true,
	},
	description: {
		type: STRING(300),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Descrição não informada!',
			},
			set(value) {
				this.setDataValue('description', value.trim().toLowerCase())
			},
		},
	},
	type_item_id: {
		type: INTEGER,
		allowNull: false,
		validate: {
			isNumeric: {
				msg: 'Aceito apenas valores numericos!',
			},
		},
	},
	di: {
		type: STRING(50),
		allowNull: true,
		set(value) {
			if (value) {
				this.setDataValue('di', value.trim())
			}
		},
	},
	price_without_ipi: {
		type: DECIMAL(10, 4),
		allowNull: false,
		validate: {
			isDecimal: {
				msg: 'Informe apenas valores!',
			},
		},
	},
	icms: {
		type: DECIMAL(10, 4),
		allowNull: true,
		defaultValue: 8.8,
		validate: {
			isDecimal: {
				msg: 'Informe apenas valores!',
			},
		},
	},
	pis_cofins: {
		type: DECIMAL(10, 4),
		allowNull: true,
		defaultValue: 9.25,
		validate: {
			isDecimal: {
				msg: 'Informe apenas valores!',
			},
		},
	},
	ipi: {
		type: DECIMAL(10, 4),
		allowNull: true,
		defaultValue: 0,
		validate: {
			isDecimal: {
				msg: 'Informe apenas valores!',
			},
		},
	},
	iss: {
		type: DECIMAL(10, 4),
		allowNull: true,
		defaultValue: 0,
		validate: {
			isDecimal: {
				msg: 'Informe apenas valores!',
			},
		},
	},
	simples_nacional: {
		type: DECIMAL(10, 4),
		allowNull: true,
		defaultValue: 0,
		validate: {
			isDecimal: {
				msg: 'Informe apenas valores!',
			},
		},
	},
	status_id: {
		type: INTEGER,
		allowNull: false,
		validate: {
			isNumeric: {
				msg: 'Informe apenas valores!',
			},
		},
	},
}

const OrderDetailsOptions = {
	tableName: 'order_details',
}

export { OrderDetails, OrderDetailsAttributes, OrderDetailsOptions }
