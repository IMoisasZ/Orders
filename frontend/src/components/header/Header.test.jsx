import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'

jest.mock('../header/Header.module.css', () => ({
	app_header: 'app-header-class',
	header_logo: 'header-logo-class',
	header_nav: 'header-nav-class',
	header_user_info: 'header-user-info-class',
	user_avatar: 'user-avatar-class',
	user_details: 'user-details-class',
}))

describe(`Component Header`, () => {
	test(`Should render the component with the default className`, () => {
		render(
			<BrowserRouter>
				<Header></Header>
			</BrowserRouter>
		)
		const headerComponent = screen.getByRole('img')
		expect(headerComponent).toBeInTheDocument()
	})
})
