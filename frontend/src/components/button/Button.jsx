import React from 'react'
import styles from './Button.module.css'

// Sugestão de refatoração do list_btn_icons.data para um objeto/mapa
// export const listBtnIcons = {
//     'edit': 'icone_de_edicao',
//     'a/z': 'icone_de_ordenacao_asc',
//     'z/a': 'icone_de_ordenacao_desc',
//     ...
// };
import { listBtnIcons } from '../../data/list_btn_icons.data'

export default function Button({
	name,
	id = name,
	type = 'button',
	disabled = false,
	handleClick,
	children, // Information about button
	style,
	styleBtnIcon,
	variant = '', // Variant is about the many forms to access the button on different types.
	typeBtn = '',
	title = 'inform title of button',
	btnIcon = null,
	className, //
}) {
	// Function for create the CSS classes clearly
	const getButtonClasses = () => {
		const classes = [styles.button]
		if (typeBtn === 'icon') {
			classes.push(styles.button_icon)
			if (variant === 'button_icon_edit') {
				classes.push(styles.button_icon_edit)
			}
		} else {
			if (variant === 'edit') {
				classes.push(styles.edit)
			} else if (disabled) {
				classes.push(styles.disabled)
			} else {
				classes.push(styles.btn)
			}
		}
		if (className) {
			classes.push(className)
		}
		return classes.join(' ')
	}

	if (typeBtn === 'icon') {
		const icon = listBtnIcons[btnIcon]

		return (
			<button
				className={getButtonClasses()}
				style={styleBtnIcon}
				title={title}
				disabled={disabled}
				onClick={handleClick}
				type={type}>
				{icon}
			</button>
		)
	}

	return (
		<button
			className={getButtonClasses()}
			name={name}
			type={type}
			disabled={disabled}
			onClick={handleClick}
			style={style}
			id={id}>
			{children}
		</button>
	)
}
