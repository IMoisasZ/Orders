/** @format */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Checkbox from '../checkbox/Checkbox'

jest.mock('../checkbox/Checkbox.module.css', () => ({
	container: 'container-class',
}))

describe('Checkbox Component', () => {
	/**@description -> Test 1: Basic rendering with the labelName. */
	test('Must render the checkbox with the text passed `labelName`', () => {
		render(<Checkbox labelName='Label checkbox' />)
		const checkboxElement = screen.getByText('Label checkbox')
		expect(checkboxElement).toBeInTheDocument()
	})

	/**@description -> Test 2: Behavior the checkbox be disabled.  */
	test('Must render the checkbox disabled when the prop disabled it is true', () => {
		const labelText = 'Checkbox disabled'

		render(
			<Checkbox
				disabled={true}
				name='checkbox1'
				labelName={labelText}
			/>
		)
		const checkboxElement = screen.getByRole('checkbox', {
			name: labelText,
		})
		expect(checkboxElement).toBeDisabled()
	})

	/**@description -> Test 3: Verifying the toggleChange don't is called when the checkbox is disabled. */
	test(`Don't have be called if the checkbox event it is disabled`, () => {
		const labelText = 'Checkbox disabled 1'
		const toggleChange = jest.fn()
		render(
			<Checkbox
				name='checkbox-disabled'
				labelName={labelText}
				disabled={true}
				toggleChange={toggleChange}
			/>
		)
		const checkboxElement = screen.getByRole('checkbox', { name: labelText })
		fireEvent.change(checkboxElement)
		expect(toggleChange).not.toHaveBeenCalled()
	})

	/**@description -> Test 4: Verifying if the checkbox it is checked. */
	test('Must render the checkbox checked when the prop checked it is true', () => {
		const labelText = 'Checkbox checked'

		render(
			<Checkbox
				checked={true}
				name='checkbox2'
				labelName={labelText}
			/>
		)
		const checkboxElement = screen.getByRole('checkbox', { name: labelText })
		expect(checkboxElement).toBeChecked()
	})

	/**@description -> Test 5: Don't render the component if the type of checkbox it is different of checkbox. */
	test(`Don't have be rendering the component if the type it is different checkbox`, () => {
		const labelText = 'Checkbox error'
		render(
			<Checkbox
				type='text'
				name='checkbox3'
				labelName={labelText}
			/>
		)
		const checkboxElement = screen.queryByRole(labelText)
		expect(checkboxElement).not.toBeInTheDocument()
	})

	/**@description -> Verifying the click event. */
	test('Must call the toggleChange when the checkbox it is changed', () => {
		const labelText = 'Checkbox toggleOnChange'
		const toggleChange = jest.fn()
		render(
			<Checkbox
				name='checkbox-toggleOnChange'
				labelName={labelText}
				toggleChange={toggleChange}
			/>
		)
		const checkboxElement = screen.getByRole('checkbox', { name: labelText })
		fireEvent.click(checkboxElement)
		expect(toggleChange).toHaveBeenCalledTimes(1)
	})
})
