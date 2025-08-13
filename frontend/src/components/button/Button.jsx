/** @format */
import React from 'react'
import styles from './Button.module.css'
import { listBtnIcons } from '../../data/list_btn_icons.data'

/**
 * @param {name} name -> Name of componente that will be rendering.
 * @param {type} type -> Type of button like 'button','submit' or 'reset'.
 * @param {disabled} disabled -> Show if the component will be disabled or enabled. Its depends that it is 'true' or 'false'.
 * @param {handleClick} handleClick -> Its a function to execute some thing when it'll clicked.
 * @param {children} children -> Information of button, like the name of button.
 * @param {classNameBtn, classNameBtnIcon} classNameBtn/classNameBtnIcon -> Attribute to create some style of the component.
 * @param {variant} variant -> Choose the wich types of button you want create like for example 'edit'.
 * @param {typeBtn} typeBtn -> Showwhat type of component you want create. In this case its about a 'button' with text name or a 'button' with icon.
 * @param {title} title -> Attribute to show info about the component.
 * @param {btnIcon} btnIon -> Type of button that show taking this information the listBtnIcons.
 * @param {className} className -> Using to take the className and to choose what kint type of component will be using.
 * @returns -> Returns the component with the attributes wish.
 */

export default function Button({
	name,
	type = 'button',
	disabled = false,
	handleClick,
	children, // Information about button
	classNameBtn = '',
	classNameBtnIcon = '',
	typeBtn = '',
	variant = '', // Variant is about the many forms to access the button on different types.
	title = 'inform title of button',
	btnIcon = null,
	className,
}) {
	/**
	 * Function for create the CSS classes
	 * @returns -> Return the class selected.
	 */
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
		const Icon = listBtnIcons[btnIcon]

		return (
			<button
				className={`${getButtonClasses()} ${classNameBtn}`}
				id={name}
				title={title}
				disabled={disabled}
				onClick={handleClick}
				type={type}>
				{<Icon />}
			</button>
		)
	}

	return (
		<button
			className={`${getButtonClasses()} ${classNameBtnIcon}`}
			id={name}
			name={name}
			title={title}
			type={type}
			disabled={disabled}
			onClick={handleClick}>
			{children}
		</button>
	)
}
