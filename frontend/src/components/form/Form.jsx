import React from 'react'
import styles from './Form.module.css'

export default function MyForm({
	children,
	style,
	handleSubmit,
	className = '',
}) {
	return (
		<form
			className={`${styles.form_container} ${className}`}
			style={style}
			onSubmit={handleSubmit}>
			{children}
		</form>
	)
}
