/** @format */

// src/components/Button.test.js
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

/**
 * @description -> Mock the CSS class to tests don't broken.
 * @description -> The styles CSS will be returned like a string blank.
 */
jest.mock('./Button.module.css', () => ({
	button: 'button-class',
	button_icon: 'button-icon-class',
	edit: 'edit-class',
	disabled: 'disabled-class',
}))

/**
 * @description -> Mock the icon list to do tests.
 * @description -> Fot to do the tests, will user a icon simple for simulate the behavior.
 */
jest.mock('../../data/list_btn_icons.data', () => {
	return {
		listBtnIcons: {
			/**
			 * @returns -> Instead of return JSX, return a function of component that return the JSX.
			 */
			editIcon: () => <svg data-testid='edit-icon' />,
		},
	}
})

describe('Button Component', () => {
	/**
	 * @description -> Test 1: Basic rendering of the button with text.
	 */
	test('Must rendering the button with the text passed with children.', () => {
		render(<Button>Clique aqui</Button>)
		const buttonElement = screen.getByText('Clique aqui')
		expect(buttonElement).toBeInTheDocument()
	})

	/**
	 * @description -> Test 2: Verifying the click event.*/
	test('Must call the function handleClick when the button it is clicked.', () => {
		const handleClick = jest.fn()
		render(<Button handleClick={handleClick}>Teste Click</Button>)

		const buttonElement = screen.getByText('Teste Click')
		fireEvent.click(buttonElement)

		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	/**
	 * @description -> Test 3: Behavior of the disable button.*/
	test('Must rendering the button with disabled when the prop disabled it is true.', () => {
		render(<Button disabled={true}>Botão Desabilitado</Button>)
		const buttonElement = screen.getByText('Botão Desabilitado')
		expect(buttonElement).toBeDisabled()
	})

	/**
	 * @description -> Test 4: Verifying the rendering of the icon button.*/
	test('Must rendering the button with an icon when typeBtn it is "icon".', () => {
		render(
			<Button
				typeBtn='icon'
				btnIcon='editIcon'
			/>
		)
		expect(screen.getByTestId('edit-icon')).toBeInTheDocument()
	})

	/**
	 * @description -> Test 5: Verifying that icon button don't show children.*/
	test("The button icon mustn't to render children.", () => {
		render(
			<Button
				typeBtn='icon'
				btnIcon='editIcon'>
				Não me mostre
			</Button>
		)
		/**
		 * @description -> Use queryByText to verifying if the element exist.*/
		const textElement = screen.queryByText('Não me mostre')
		expect(textElement).not.toBeInTheDocument()
	})

	/**
	 * @description -> Test 6: Icon button disabled.*/
	test('The button of ico must be disabled when the prop disabled it is true.', () => {
		render(
			<Button
				typeBtn='icon'
				btnIcon='editIcon'
				disabled={true}
			/>
		)
		const buttonElement = screen.getByRole('button')
		expect(buttonElement).toBeDisabled()
	})

	/**
	 * @description -> Verifying the attribute `title`. */
	test('Must rendering the attribute title with the passed value.', () => {
		const customTitle = 'Botão para editar'
		render(<Button title={customTitle}>Editar</Button>)
		const buttonElement = screen.getByRole('button', { name: 'Editar' })
		expect(buttonElement).toHaveAttribute('title', customTitle)
	})

	/**
	 * @description -> Verifying that handleClick don't is called when the button is disabled.*/
	test(`Mustn't call the handleClick when the button it s disabled.`, () => {
		const handleClick = jest.fn()
		render(
			<Button
				disabled={true}
				handleClick={handleClick}>
				Desabilitado
			</Button>
		)
		const buttonElement = screen.getByRole('button', { name: 'Desabilitado' })

		fireEvent.click(buttonElement)

		expect(handleClick).not.toHaveBeenCalled()
	})
})
