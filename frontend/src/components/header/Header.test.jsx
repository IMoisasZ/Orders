/** @format */

// src/components/header/Header.test.jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'
import { linksHeader } from '../../data/header_links.data'

// Remova todos os blocos de jest.mock daqui

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
