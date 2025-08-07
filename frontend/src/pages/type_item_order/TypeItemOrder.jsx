import React from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Checkbox from '../../components/checkbox/Checkbox'
import Button from '../../components/button/Button'
import Table from '../../components/table/Table'
import Td from '../../components/table/Td'
import Tr from '../../components/table/Tr'
import styles from './TypeItemOrder.module.css'

export default function TypeItemOrder() {
	const header = [
		{ label: 'Tipo', key: 'description', sortable: true, typeBtn: 'sort' },
		{ label: 'Status', key: 'active', sortable: true, typeBtn: 'connect' },
		{ label: 'Ações', sortable: false },
	]
	return (
		<Container titlePage='Tipo do item do Pedido'>
			<Form className={styles.form_type_item_order}>
				<Input
					labelName='Descrição'
					containerClassName={styles.container_input}
					labelClassName={styles.label}
					inputClassName={styles.input}
				/>
				<Checkbox
					classNameContainerCheckbox={styles.checkbox_container}
					classNameCheckbox={styles.checkbox}
					labelName='Ativo'
				/>
				<div className={styles.container_buttons}>
					<Button>Incluir</Button>
					<Button>Novo</Button>
				</div>
			</Form>
			<Table></Table>
		</Container>
	)
}
