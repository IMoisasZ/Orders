import { BOOLEAN, INTEGER, STRING, Model } from 'sequelize'

class TypeItem extends Model {}

const TypeItemAttributes = {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	description: {
		type: STRING(50),
		allowNull: false,
		unique: true,
		set(value) {
			this.setDataValue('description', value.trim().toLowerCase())
		},
		validate: {
			notEmpty: {
				msg: 'O tipo do item não informado!',
			},
			len: {
				args: [3, 50],
				msg: 'A descrição deve ter entre 3 e 50 caracteres!',
			},
		},
	},
	last_item: {
		type: BOOLEAN,
		defaultValue: false,
	},
	active: {
		type: BOOLEAN,
		defaultValue: true,
	},
}

const TypeItemOptions = {
	tableName: 'type_item',
}

export { TypeItem, TypeItemAttributes, TypeItemOptions }
