import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from '../form/Form'
import Checkbox from '../checkbox/Checkbox'
import Button from '../button/Button'

jest.mock('./Form.module.css', () => ({
	form_container: 'form-container-class',
}))

describe('Form component', () => {
	/**@description -> Test 1: Rendering data children */
	test(`Must rendering the components through of prop "children"`, () => {
		render(
			<Form>
				<Checkbox
					name='checkbox1'
					labelName='Children on form'
				/>
			</Form>
		)
		const formElement = screen.getByRole('checkbox', {
			name: 'Children on form',
		})
		expect(formElement).toBeInTheDocument()
	})

	/**@description -> Test 2: Called the handleSubmit */
	test(`Must call the handleSubmit when the element button is clicked.`, () => {
		const handleSubmit = jest.fn()
		render(
			<Form handleSubmit={handleSubmit}>
				<Button type='submit'>Executing handleSubmit</Button>
			</Form>
		)
		const buttonElement = screen.getByRole('button', {
			name: 'Executing handleSubmit',
		})
		fireEvent.click(buttonElement)
		expect(handleSubmit).toHaveBeenCalled()
	})

	/**@description -> Test 3: Mustn't call the handle submit */
	test(`Mustn't called the handleSubmit if the type of element don't be "submit".`, () => {
		const handleSubmit = jest.fn()
		render(
			<Form handleSubmit={handleSubmit}>
				<Button type='button'>Don't execute handleSubmit</Button>
			</Form>
		)
		const buttonElement = screen.getByRole('button', {
			name: `Don't execute handleSubmit`,
		})
		fireEvent.click(buttonElement)
		expect(handleSubmit).not.toHaveBeenCalled()
	})
})
