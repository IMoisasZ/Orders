/** @format */

import React from 'react' // Remova o useState
import styles from './Table.module.css'
import Button from '../button/Button'

/**
 * @param {header} header -> Array with head of table.
 * @param {name} name -> Name of component.
 * @param {colSpan} colSpan -> Attribute to use the number specify of columns for one information.
 * @param {children} children -> Information yhat will be included into this component.
 * @param {onSort} onSort -> Function that do sort of data this component.
 * @param {sortConfig} sortConfig -> Object of configuration to the config.
 * @returns
 */
export default function Table({
	header,
	name,
	colSpan = 2,
	children,
	onSort,
	sortConfig,
}) {
	return (
		<div>
			<table
				className={styles.table}
				id={name}
				name={name}>
				<thead>
					<tr>
						{header?.map((headItem) => {
							/**@description The column is ordering for default, less then be explicitly 'false' */
							const sortable = headItem.sortable !== false
							const isSorted = sortConfig && sortConfig.key === headItem.key
							let sortIcon = ''
							let sortTitle = ''
							if (headItem.typeBtn === 'connect') {
								sortIcon =
									isSorted && sortConfig.direction === 'asc'
										? 'connected'
										: 'disconnected'
								sortTitle =
									isSorted && sortConfig.direction === 'asc'
										? `Clique para classificar por status ativos!`
										: `Clique para classificar por status desativados!`
							} else {
								sortIcon =
									isSorted && sortConfig.direction === 'asc' ? 'a/z' : 'z/a'
								sortTitle =
									isSorted && sortConfig.direction === 'asc'
										? `Clique para classificar decrescente!`
										: `Clique para classificar crescente!`
							}

							return headItem.label === 'Ações' ? (
								<th
									key={headItem.key}
									colSpan={colSpan}>
									{headItem.label}
								</th>
							) : (
								<th
									key={headItem.key}
									className={styles.th}>
									{sortable ? (
										<div>
											<Button
												typeBtn='icon'
												btnIcon={sortIcon}
												handleClick={() => onSort(headItem.key)}
												title={sortTitle}
											/>
											{headItem.label}
										</div>
									) : (
										<>{headItem.label}</>
									)}
								</th>
							)
						})}
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
		</div>
	)
}
