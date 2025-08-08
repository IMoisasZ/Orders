/** @format */

import axios from 'axios'
import { handleError } from '../utils/error_handler.utils'

/**
 * @description variable to create the connection between backend (API) to frontend
 */
export const API = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
})

/**
 * @description Function to intercept the response error about the routes
 */
API.interceptors.response.use(
	(response) => response,
	(error) => {
		// Extrai a mensagem de erro da resposta da API, se disponível
		const errorMessage =
			error.response?.data?.message || 'Ocorreu um erro na requisição.'

		// Chama a função global para exibir a notificação de erro
		handleError.error(errorMessage)
		console.error(error)

		// Rejeita a Promise para que o erro possa ser tratado localmente
		return Promise.reject(error)
	}
)
