/** @format */

// src/components/header/Header.test.jsx
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Header from './Header'
import { linksHeader } from '../../data/header_links.data'

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

jest.mock('./Header.module.css', () => ({
	app_header: 'app-header-class',
	header_logo: 'header-logo-class',
	header_nav: 'header-nav-class',
	header_user_info: 'header-user-info-class',
	user_avatar: 'user-avatar-class',
	user_details: 'user-details-class',
}))

const renderHeader = () => {
	return render(
		<BrowserRouter>
			<Header />
		</BrowserRouter>
	)
}

describe('Header Component', () => {
	beforeEach(() => {
		mockNavigate.mockClear()
	})

	test('Should render the component with logo', () => {
		renderHeader()
		const componentLogo = screen.getByAltText('Logo da Aplicação')
		expect(componentLogo).toBeInTheDocument()
	})

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

	test('Should render the button with the initials of user and send to path.', () => {
		renderHeader()
		const buttonComponent = screen.getByRole('button', { name: 'M' })
		expect(buttonComponent).toBeInTheDocument()

		fireEvent.click(buttonComponent)
		expect(mockNavigate).toHaveBeenCalledTimes(1)
	})

	test('Should render the name of user logged.', () => {
		renderHeader()
		const userDetailsComponent = screen.getByText('Olá, Moisés')
		expect(userDetailsComponent).toBeInTheDocument()
	})
})
