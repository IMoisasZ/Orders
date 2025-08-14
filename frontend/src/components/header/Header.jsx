/** @format */
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../../assets/images/logo_mizp.jpeg'
import styles from './Header.module.css'
import { linksHeader } from '../../data/header_links.data'

/**
 * @param {nameHeader} nameHeader -> Using this attribute to create a name that will be show on the side of image.
 * @returns -> Returns the component with the attributes wish.
 */

export default function Header({ nameHeader = '' }) {
	const [userName, _] = useState('Moisés')
	const navigate = useNavigate()
	return (
		<header
			className={styles.app_header}
			data-testid='header'>
			{/**@description Section 1: Logo. */}
			<div
				className={styles.header_logo}
				data-testid='logo'>
				<img
					src={logo}
					alt='Logo da Aplicação'
				/>
				{nameHeader && <h1>{nameHeader.toUpperCase()}</h1>}
			</div>

			{/**@description Section 2: Navigation links. */}
			<nav className={styles.header_nav}>
				<ul>
					{linksHeader.map((link) => {
						return (
							<li key={link.id}>
								<Link to={link.path}>{link.description}</Link>
							</li>
						)
					})}
				</ul>
			</nav>

			{/**@description Section 3: User info. */}
			<div className={styles.header_user_info}>
				{/**
				 * @description Avatar user. */}
				<button
					className={styles.user_avatar}
					onClick={() => navigate('/user')}>
					{userName.slice(0, 1)}
				</button>
				{/**
				 * @description User name and exit button.
				 */}
				<div className={styles.user_details}>
					{/**@description The name of user will be included after the logical of login be created. */}
					<p>{`Olá, ${userName}`}</p>

					{/** @description It'll be better when the logical about logout to be created. */}
					<button onClick={() => navigate('/')}>Sair</button>
				</div>
			</div>
		</header>
	)
}
