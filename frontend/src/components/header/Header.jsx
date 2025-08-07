import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../../assets/images/logo_mizp.jpeg'
import styles from './Header.module.css'
import { linksHeader } from '../../data/header_links.data'

export default function Header({ nameHeader = '' }) {
	const [userName, _] = useState('Moisés')
	const navigate = useNavigate()
	return (
		<header className={styles.app_header}>
			{/* Section 1: Logo */}
			<div className={styles.header_logo}>
				<img
					src={logo}
					alt='Logo da Aplicação'
				/>
				{nameHeader && <h1>{nameHeader.toUpperCase()}</h1>}
			</div>

			{/* Section 2: Navigation links */}
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

			{/* Section 3: User info */}
			<div className={styles.header_user_info}>
				{/* Avatar user */}
				<button
					className={styles.user_avatar}
					onClick={() => navigate('/user')}>
					{userName.slice(0, 1)}
				</button>
				{/* Nome do usuário e botão de sair */}
				<div className={styles.user_details}>
					{/* The name of user will be included after the logical of login be created*/}
					<p>{`Olá, ${userName}`}</p>

					{/* It'll be better when the logical about logout to be created*/}
					<button onClick={() => navigate('/')}>Sair</button>
				</div>
			</div>
		</header>
	)
}
