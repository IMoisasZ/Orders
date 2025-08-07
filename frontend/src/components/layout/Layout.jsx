// Layout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Message from '../message/Message'

export default function Layout() {
	return (
		<>
			<Header />
			<Message />
			{/* O Outlet é onde o conteúdo da rota, como a página Client, será renderizado */}
			<main>
				<Outlet />
			</main>
		</>
	)
}
