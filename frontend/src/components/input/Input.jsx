import React from 'react'
import styles from './Input.module.css'

export default function Input({
	name,
	id = name,
	labelName,
	type = 'text',
	value,
	handleChange,
	disabled = false,
	containerStyle = {
		display: 'flex',
		flexDirection: 'column',
	},
	style,
	labelStyle,
	min,
	max,
	containerClassName = '',
	inputClassName = '',
	labelClassName = '',
}) {
	return (
		<div
			className={`${styles.container} ${containerClassName}`}
			style={containerStyle}>
			<label
				className={`${styles.input_label} ${labelClassName}`}
				id={id}
				htmlFor={name}
				style={labelStyle}>
				{labelName}
			</label>
			<input
				className={`${styles.input} ${inputClassName}`}
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={handleChange}
				disabled={disabled}
				style={style}
				min={min}
				max={max}
			/>
		</div>
	)
}
