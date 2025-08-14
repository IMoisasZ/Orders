/** @format */

// src/components/header/Header.test.jsx
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Header from './Header'
import { linksHeader } from '../../data/header_links.data'

/**@description -> Mock the react-router-dom useNavigate and Link */
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate,
	Link: ({ to, children }) => (
		<a
			href={to}
			onClick={() => mockNavigate(to)}>
			{children}
		</a>
	),
}))

/**@description -> Mock the classes the header. */
jest.mock('./Header.module.css', () => ({
	app_header: 'app-header-class',
	header_logo: 'header-logo-class',
	header_nav: 'header-nav-class',
	header_user_info: 'header-user-info-class',
	user_avatar: 'user-avatar-class',
	user_details: 'user-details-class',
}))

/**@description -> Funtion for render the Header. */
const renderHeader = () => {
	return render(
		<BrowserRouter>
			<Header />
		</BrowserRouter>
	)
}

/**@description -> Function describe about the Header component. */
describe('Header Component', () => {
	/**@description -> Function to reset the mockNavigate on each call test. */
	beforeEach(() => {
		mockNavigate.mockClear()
	})

	/**@description -> Test 1: Test of logo. */
	test('Should render the component with logo', () => {
		renderHeader()
		const componentLogo = screen.getByAltText('Logo da Aplicação')
		expect(componentLogo).toBeInTheDocument()
	})

	/**@description -> Test 2: test of list navigation. */
	test('Should render the list of navigation and send to path.', () => {
		renderHeader()
		linksHeader.forEach((link) => {
			const navLink = screen.getByRole('link', { name: link.description })
			expect(navLink).toBeInTheDocument()
			expect(navLink).toHaveAttribute('href', link.path)

			mockNavigate.mockClear()

			fireEvent.click(navLink)

			expect(mockNavigate).toHaveBeenCalledTimes(1)
			expect(mockNavigate).toHaveBeenCalledWith(link.path)
		})
	})

	/**@description -> Test 3: Test of button and send to path. */
	test('Should render the button with the initials of user and send to path.', () => {
		renderHeader()
		const buttonComponent = screen.getByRole('button', { name: 'M' })
		expect(buttonComponent).toBeInTheDocument()

		fireEvent.click(buttonComponent)
		expect(mockNavigate).toHaveBeenCalledTimes(1)
	})

	/**@description -> Test 4: Test of user logged. */
	test('Should render the name of user logged.', () => {
		renderHeader()
		const userDetailsComponent = screen.getByText('Olá, Moisés')
		expect(userDetailsComponent).toBeInTheDocument()
	})
})
