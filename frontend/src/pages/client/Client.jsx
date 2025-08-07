import React, { useCallback, useEffect, useState } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Checkbox from '../../components/checkbox/Checkbox'
import Button from '../../components/button/Button'
import Table from '../../components/table/Table'
import Tr from '../../components/table/Tr'
import Td from '../../components/table/Td'
import Pagination from '../../components/pagination/Pagination'
import { handleError } from '../../utils/error_handler.utils'
import { handleSuccess } from '../../utils/success_handler.utils'
import {
	createClient,
	updateClient,
	getAllClients,
	patchDisableEnableClient,
} from '../../services/client.service'
import { validatorClient } from '../../validators/client.validator'
import { sortData } from '../../utils/sort_data.utils'

export default function Client() {
	// form states
	const [id, setId] = useState('')
	const [client, setClient] = useState('')
	const [active, setActive] = useState(true)
	const [nameBtn, setNameBtn] = useState('Incluir')
	const [btnDisabled, setBtnDisabled] = useState(false)

	// states list and search
	const [listClients, setListClients] = useState([]) // All clients list
	const [filteredClients, setFilteredClients] = useState([]) // Filtered list
	const [hideClientsDisabled, setHideClientsDisabled] = useState(true)
	const [search, setSearch] = useState('')

	// pagination states
	const [clientsPerPage, setClientsPerPage] = useState(4)
	const [totalPages, setTotalPages] = useState(1)
	const [actualPage, setActualPage] = useState(1)

	// sorting states
	const [sortConfig, setSortConfig] = useState({
		key: 'client',
		direction: 'asc',
	})

	// action and submission of form
	async function handleOnSubmit(e) {
		e.preventDefault()
		setBtnDisabled(true)
		const clientData = { id, client, active }
		try {
			if (!id) {
				validatorClient('create', clientData)
				delete clientData.id
				await createClient(clientData)
				handleSuccess('Cliente incluído com sucesso!')
			} else {
				validatorClient('update', clientData)
				await updateClient(clientData)
				handleSuccess('Cliente alterado com sucesso!')
			}
		} catch (error) {
			handleError(error)
		} finally {
			setBtnDisabled(false)
			handleClear()
		}
	}

	// function to take all clients
	const takeAllClients = useCallback(async () => {
		try {
			const data = await getAllClients(false) //take all without initial filter
			setListClients(data || [])
		} catch (error) {
			handleError(error, 'Erro ao carregar os clientes!')
		}
	}, [])

	// load all clients initial component
	useEffect(() => {
		takeAllClients()
	}, [takeAllClients])

	// filter, sort and paginate the data
	useEffect(() => {
		let currentList = [...listClients]

		// 1. Apply the filter of status (enable/disable)
		if (hideClientsDisabled) {
			currentList = currentList.filter((client) => client.active === true)
		}

		// 2. Apply the filter for search
		if (search) {
			currentList = currentList.filter((client) =>
				client.client.toLowerCase().includes(search.toLowerCase())
			)
		}

		// 3. Apply sorting
		currentList = sortData(currentList, sortConfig.key, sortConfig.direction)

		// 4. Update the list filtered, create the pagination and calculate the total of pages
		setFilteredClients(currentList)
		const newTotalPages = Math.ceil(currentList.length / clientsPerPage)
		setTotalPages(newTotalPages)
		setActualPage(1) // Reset the page for the first
	}, [listClients, hideClientsDisabled, search, clientsPerPage, sortConfig])

	// function to sort the data
	function handleSort(key) {
		let direction = 'asc'
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc'
		}
		setSortConfig({ key, direction })
	}

	// Functions for navigation of pagination
	function handleNextPage() {
		if (actualPage < totalPages) {
			setActualPage(actualPage + 1)
		}
	}

	function handlePreviousPage() {
		if (actualPage > 1) {
			setActualPage(actualPage - 1)
		}
	}

	function handleOnFirstPage() {
		if (listClients.length > 0) {
			setActualPage(1)
		}
	}

	function handleOnLastPage() {
		if (listClients.length > 0) {
			setActualPage(totalPages)
		}
	}

	// Logical to rendering the clients of actual page
	const lastItemIndex = actualPage * clientsPerPage
	const firstItemIndex = lastItemIndex - clientsPerPage
	const clientsByPage = filteredClients.slice(firstItemIndex, lastItemIndex)

	// Functions of manipulation the state
	function handleEdit(clientToEdit) {
		setId(clientToEdit.id)
		setClient(clientToEdit.client)
		setActive(clientToEdit.active)
		setNameBtn('Editar')
	}

	async function disableEnableClient(clientToUpdate) {
		try {
			await patchDisableEnableClient(clientToUpdate.id, !clientToUpdate.active)
			handleClear()
		} catch (error) {
			handleError(error)
		}
	}

	function handleClear() {
		setId('')
		setClient('')
		setActive(true)
		setNameBtn('Incluir')
		takeAllClients()
	}

	const header = [
		{ label: 'Cliente', key: 'client', sortable: true, typeBtn: 'sort' },
		{ label: 'Status', key: 'active', sortable: true, typeBtn: 'connect' },
		{ label: 'Ações', sortable: false },
	]

	const paginationText = `Página ${actualPage} de ${totalPages}`

	return (
		<Container titlePage='Cadastro de clientes'>
			<Form
				style={{
					display: 'flex',
					maxWidth: '80%',
					gap: '2rem',
					padding: '1rem .5rem',
				}}
				handleSubmit={handleOnSubmit}>
				<Input
					name='client'
					labelName='Cliente'
					value={client}
					handleChange={(e) => setClient(e.currentTarget.value)}
				/>
				<Checkbox
					name='active'
					labelName='Ativo'
					checked={active}
					value={active}
					toggleChange={() => setActive(!active)}
					styleContainerCheckbox={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						width: '5%',
					}}
					style={{ width: '100%' }}
				/>
				<Button
					name='add'
					type='submit'
					variant={nameBtn === 'Incluir' ? 'button' : 'edit'}
					disabled={btnDisabled}>
					{nameBtn}
				</Button>

				<Button
					name='clear'
					type='button'
					handleClick={() => handleClear()}>
					Novo
				</Button>
			</Form>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '80%',
					margin: '1rem auto',
					gap: '1rem',
					border: '1px solid #c1c1c1',
					borderRadius: '.5rem',
					padding: '.5rem',
				}}>
				{/*Search text */}
				<Checkbox
					labelName='Apenas clientes ativos?'
					checked={hideClientsDisabled}
					value={hideClientsDisabled}
					toggleChange={() => setHideClientsDisabled(!hideClientsDisabled)}
					styleContainerCheckbox={{ width: '31%' }}
					style={{ width: 'auto' }}
				/>

				<Input
					labelName='Pesquisa'
					name='search'
					value={search}
					handleChange={(e) => setSearch(e.currentTarget.value)}
				/>
			</div>

			<Table
				header={header}
				colSpan={2}
				onSort={handleSort} // send the function of classification to the table
				sortConfig={sortConfig}>
				{/*send the state of classification to the table*/}
				{clientsByPage.map((client) => {
					return (
						<Tr
							isDisabled={!client.active && 'disabled'}
							key={client.id}>
							<Td>{client.client.toUpperCase()}</Td>
							<Td>{client.active ? 'Sim' : 'Não'}</Td>
							<Td>
								<Button
									typeBtn='icon'
									btnIcon='edit'
									handleClick={() => handleEdit(client)}
									type='button'
									title={`Clique para editar o cliente ${client.client.toUpperCase()}`}
									variant='button_icon_edit'
								/>
							</Td>
							<Td>
								<Button
									typeBtn='icon'
									btnIcon={client.active ? 'disable' : 'enable'}
									title={
										client.active
											? `Clique para desativar o cliente ${client.client.toUpperCase()}`
											: `Clique para ativar o cliente ${client.client.toUpperCase()}`
									}
									type='button'
									handleClick={() => disableEnableClient(client)}
								/>
							</Td>
						</Tr>
					)
				})}
			</Table>
			<Pagination
				labelNameItemsPerPage='Clientes por pagina'
				valueActualPage={paginationText}
				handleClickPrevious={handlePreviousPage}
				handleClickNext={handleNextPage}
				totalPages={totalPages}
				valueItemsPerPage={clientsPerPage}
				handleChangeItemsPerPage={(e) =>
					setClientsPerPage(Number(e.currentTarget.value))
				}
				handleClickFirstPage={handleOnFirstPage}
				handleClickLastPage={handleOnLastPage}
			/>
		</Container>
	)
}
