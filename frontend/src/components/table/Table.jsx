import React from 'react' // Remova o useState
import styles from './Table.module.css'
import Button from '../button/Button'

export default function Table({
	header,
	name,
	id = name,
	colSpan = 2,
	children,
	onSort, // Nova prop: a função de ordenação do componente pai
	sortConfig, // Nova prop: o objeto de configuração da ordenação
}) {
	// Agora o estado `sort` e a função `handleSort` não são mais necessários aqui

	return (
		<div>
			<table
				className={styles.table}
				id={id}
				name={name}>
				<thead>
					<tr>
						{header?.map((headItem) => {
							const sortable = headItem.sortable !== false // A coluna é ordenável por padrão, a menos que seja explicitamente 'false'
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
