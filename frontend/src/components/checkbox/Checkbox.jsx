import React from 'react'
import styles from './Checkbox.module.css'

export default function Checkbox({
	name,
	labelName,
	disabled,
	value,
	checked,
	toggleChange,
	style,
	styleContainerCheckbox,
	classNameContainerCheckbox = '',
	classNameCheckbox = '',
}) {
	return (
		<div
			className={`${styles.container} ${classNameContainerCheckbox}`}
			style={styleContainerCheckbox}>
			<label htmlFor={name}>{labelName}</label>
			<input
				className={classNameCheckbox}
				type='checkbox'
				id={name}
				name={name}
				disabled={disabled}
				value={value}
				checked={checked}
				onChange={toggleChange}
				style={style}
			/>
		</div>
	)
}
