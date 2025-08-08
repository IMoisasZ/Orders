/** @format */
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Message from '../message/Message'

export default function Layout() {
	return (
		<>
			<Header />
			<Message />
			{/**@description Outlet is where the route content is add. Its like the page Client, will be rendering.  */}
			<main>
				<Outlet />
			</main>
		</>
	)
}
