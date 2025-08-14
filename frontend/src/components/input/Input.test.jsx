/** @format */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Input from './Input'

const renderInput = (props = {}) => {
	const defaultProps = {
		name: 'test_input',
		labelName,
		type: 'text',
		disabled: false,
		handleChange: jest.fn(),
	}
	return render(
		<Input
			{...defaultProps}
			{...props}
		/>
	)
}

describe(`Input Component`, () => {
	let inputElement
	const labelName = 'Test input'
	beforeEach(() => {
		renderInput()
		inputElement = screen.getByRole('textbox', { name: labelName })
	})
	test('Should render the input component by labelName', () => {
		expect(inputElement).toBeInTheDocument()
	})

	test('Should type different of `checkbox`', () => {
		const nameInput = 'test_input'
		const labelName = 'Test input'
		const type = 'text'
		renderInput({ name: nameInput, labelName, type })
		const labelElement = screen.getByText(labelName)
		expect(labelElement).toBeInTheDocument()

		const inputElementTypeCheckbox = screen.queryByRole('checkbox', {
			name: labelName,
		})
		expect(inputElementTypeCheckbox).not.toBeInTheDocument()

		const inputElement = screen.getByRole('textbox', { name: labelName })
		expect(inputElement).toBeInTheDocument()
	})

	test('Should render the component disabled', () => {
		const disabled = true
		const labelName = 'Test input'
		const nameInput = 'test_input'
		renderInput({ name: nameInput, disabled, labelName })
		const inputElement = screen.getByRole('textbox', { name: labelName })
		expect(inputElement).toBeInTheDocument()
		expect(inputElement).toBeDisabled()
	})

	test('Should render the component enabled', () => {
		const disabled = false
		const labelName = 'Test input'
		const nameInput = 'test_input'
		renderInput({ name: nameInput, disabled, labelName })
		const inputElement = screen.getByRole('textbox', { name: labelName })
		expect(inputElement).toBeInTheDocument()
		expect(inputElement).toBeEnabled()
	})

	test('Should render the component to change', () => {
		const disabled = false
		const labelName = 'Test input'
		const nameInput = 'test_input'
	})
})
