import React from 'react'
import styles from './Table.module.css'

export default function Td({ children }) {
	return <td className={styles.td}>{children}</td>
}
