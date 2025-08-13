/** @format */
import React from 'react'
import styles from './Input.module.css'

/**
 * @param {name} name -> Name of componente that will be rendering.
 * @param {labelName} labelName -> Name the label of component.
 * @param {type} type -> Type of component that will be created, like: 'text','number','email'...
 * @param {disabled} disabled -> Show if the component will be disabled or enabled. Its depends that it is 'true' or 'false'.
 * @param {value} value -> Value that puted into the component.
 * @param {handleChange} handleChange -> Its a function to execute some thing when this component will go modified.
 * @param {containerStyle} containerStyle -> Attribute that is possivel to do specify styles.
 * @param {classNameBtn, classNameBtnIcon} classNameBtn/classNameBtnIcon -> Attribute to create some style of the component.
 * @param {min, max} min/max -> This attributes can be using when the type of component is number.
 * @param {classNameInput} classNameInput -> Attribute to create styles for this component.
 * @returns -> Returns the component with the attributes wish.
 */

export default function Input({
	name,
	labelName,
	type = 'text',
	disabled = false,
	value,
	handleChange,
	containerStyle = {
		display: 'flex',
		flexDirection: 'column',
	},
	min,
	max,
	classNameContainerInput = '',
	classNameInput = '',
}) {
	return (
		<div
			className={`${styles.container} ${classNameContainerInput}`}
			style={containerStyle}>
			<label
				className={`${styles.input_label} ${classNameInput}`}
				id={name}
				htmlFor={name}>
				{labelName}
			</label>
			<input
				className={`${styles.input} ${classNameInput}`}
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={handleChange}
				disabled={disabled}
				min={min}
				max={max}
			/>
		</div>
	)
}
