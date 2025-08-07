import { BOOLEAN, INTEGER, STRING, Model } from 'sequelize'

class Company extends Model {}

const CompanyAttributes = {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	company: {
		type: STRING(50),
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: {
				msg: 'Nome da empresa não informado!',
			},
			len: {
				args: [2, 50],
				msg: 'A empresa deve ter no minimo 2 caracteres!',
			},
			set(value) {
				this.setDataValue('company', value.trim().toLowerCase())
			},
		},
	},
	active: {
		type: BOOLEAN,
		defaultValue: true,
	},
}

const CompanyOptions = {
	tableName: 'company',
}

export { Company, CompanyAttributes, CompanyOptions }
