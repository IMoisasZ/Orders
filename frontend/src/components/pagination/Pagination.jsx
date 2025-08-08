/** @format */

import React from 'react'
import Button from '../button/Button'
import Input from '../input/Input'
import styles from './Pagination.module.css'

/**
 * @param {handleClickPrevious,
 * handleClickNext,
 * valueItemsPerPage,
 * valueActualPage,
 * handleChangeItemsPerPage,
 * handleChangeActualPage,
 * handleClickFirstPage,
 * handleClickLastPage,
 * labelNameItemsPerPage } params -> All of params to execute this component. like show the buttons and inputs will be show information the actual page or total page.
 * @returns
 */
export default function Pagination({
	handleClickPrevious,
	handleClickNext,
	valueItemsPerPage,
	valueActualPage,
	handleChangeItemsPerPage = null,
	handleChangeActualPage = null,
	handleClickFirstPage = null,
	handleClickLastPage = null,
	labelNameItemsPerPage,
}) {
	return (
		<div className={styles.pagination_container}>
			<div className={styles.pagination_controls}>
				<Button
					typeBtn='icon'
					btnIcon='first'
					name='btn_pagination_first_page'
					nameBtn='Primeira pagina'
					handleClick={handleClickFirstPage}
				/>
				<Button
					typeBtn='icon'
					btnIcon='previous'
					name='btn_pagination'
					nameBtn='Anterior'
					handleClick={handleClickPrevious}
				/>
				<Input
					name='actual_page'
					value={valueActualPage}
					handleChange={handleChangeActualPage}
					style={{ textAlign: 'center' }}
					style_label={{ textAlign: 'center' }}
				/>
				<Button
					typeBtn='icon'
					btnIcon='next'
					name='btn_pagination'
					nameBtn='Proxima'
					handleClick={handleClickNext}
				/>
				<Button
					typeBtn='icon'
					btnIcon='last'
					name='btn_pagination_last_page'
					nameBtn='Ultima pagina'
					handleClick={handleClickLastPage}
				/>
			</div>
			<div>
				<Input
					name='itens_per_page'
					labelName={labelNameItemsPerPage}
					value={valueItemsPerPage}
					handleChange={handleChangeItemsPerPage}
					type='number'
					style={{ textAlign: 'center', marginBottom: '1rem' }}
					min={2}
					max={5}
				/>
			</div>
		</div>
	)
}
