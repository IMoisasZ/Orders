/** @format */
import React from 'react'
import styles from './Checkbox.module.css'

/**
 * @param {name} name -> Name of componente that will be rendering.
 * @param {labelName} labelName -> Define what is the label name of component.
 * @param {disabled} disabled -> Show if the component will be disabled or enabled. Its depends that it is 'true' or 'false'.
 * @param {value} value -> Info the value of the component will be show.
 * @param {checked} checked -> Info if the component will be 'true' or 'false'.
 * @param {toggleChange} toggleChange -> Its a function to execute some thing when it'll clicked.
 * @param {children} children -> Information of button, like the name of button.
 * @param {classNameContainerCheckbox, classNameCheckbox} classNameContainerCheckbox/classNameCheckbox -> Attribute to create some style to the component.
 * @returns -> Returns the component with the attributes wish.
 */

export default function Checkbox({
	name,
	labelName,
	disabled,
	value,
	checked,
	toggleChange = null,
	classNameContainerCheckbox = '',
	classNameCheckbox = '',
	type = 'checkbox',
}) {
	if (type !== 'checkbox') {
		return null
	}
	return (
		<div className={`${styles.container} ${classNameContainerCheckbox}`}>
			<label htmlFor={name}>{labelName}</label>
			<input
				className={classNameCheckbox}
				type={type}
				id={name}
				name={name}
				disabled={disabled}
				value={value}
				checked={checked}
				onChange={toggleChange}
			/>
		</div>
	)
}
