import React from 'react'
import styles from './Table.module.css'

export default function Tr({ children, isDisabled, key }) {
	return (
		<tr
			className={`${styles.tr} ${isDisabled && styles.disabled}`}
			key={key}>
			{children}
		</tr>
	)
}
