/** @format */
import React from 'react'
import styles from './Form.module.css'

/**
 * @param {children} children -> Attribute to info the another components can be add into this component.
 * @param {handleSubmit} style -> Function to execute some thing fot who call.
 * @param {className} className -> Attribute to create any style.
 * @returns -> Returns the component with the attributes wish.
 */

export default function MyForm({ children, handleSubmit, className = '' }) {
	return (
		<form
			className={`${styles.form_container} ${className}`}
			onSubmit={handleSubmit}>
			{children}
		</form>
	)
}
