import React from 'react'
import styles from './Container.module.css'

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
