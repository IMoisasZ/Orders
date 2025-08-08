/** @format */
import React from 'react'
import styles from './Container.module.css'

/**
 * @param {children} children -> Attribute to info the another components can be add into this component.
 * @param {style} style -> Attribute to create some style for this component.
 * @param {className} className -> Attribute to create any style.
 * @param {titlePage} titlePage -> Attribute to show the name of page that will be using this component.
 * @returns -> Returns the component with the attributes wish.
 */

export default function Container({
	children,
	style = { backgroundColor: '#FFFFFF' },
	className = '',
	titlePage = '',
}) {
	return (
		<div
			className={`${styles.container} ${className}`}
			style={style}>
			{titlePage && <h1>{titlePage}</h1>}
			{children}
		</div>
	)
}
