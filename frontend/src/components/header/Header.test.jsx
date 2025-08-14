/** @format */

// src/components/header/Header.test.jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Header from './Header'
import { linksHeader } from '../../data/header_links.data'

jest.mock('./Header.module.css', () => ({
	app_header: 'app-header-class',
	header_logo: 'header-logo-class',
}))

describe('Header Component', () => {
	test('deve renderizar todos os links de navegação', () => {
		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		)

		linksHeader.forEach((link) => {
			const navLink = screen.getByRole('link', { name: link.description })
			expect(navLink).toBeInTheDocument()
			expect(navLink.closest('a')).toHaveAttribute('href', link.path)
		})
	})
})
