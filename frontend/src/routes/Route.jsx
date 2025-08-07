/** @format */

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Client from '../pages/client/Client'
import TypeItemOrder from '../pages/type_item_order/TypeItemOrder'

export default function OrderRoutes() {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Layout />}>
					<Route
						path='clients'
						element={<Client />}
					/>
					<Route
						path='type_item_order'
						element={<TypeItemOrder />}
					/>
				</Route>
			</Routes>
		</Router>
	)
}
