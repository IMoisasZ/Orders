import { showMessage } from '../components/message/Message'

/**
 * @param {error} error -> Receive the errors of application
 * @param {defaultMessage} defaultMessage -> Its a message default case the message doesn't be informed.
 */
export function handleError(
	error,
	defaultMessage = 'Ocorreu um erro inesperado.'
) {
	/**
	 * @description -> Error of deploy.
	 */
	console.error({ error })

	/**
	 * @description -> Array of errors.
	 */
	const messagesToDisplay = []

	/**
	 * @description -> Verify if have errors and put into the variable messagesToDisplay.
	 */
	if (error.response && error.response.data) {
		if (error.response.data.error) {
			messagesToDisplay.push(error.response.data.error)
		}

		/**
		 * @description -> Verify if have errors in another place and put into the variable messagesToDisplay.
		 */
		if (
			error.response.data.errors &&
			Array.isArray(error.response.data.errors)
		) {
			error.response.data.errors.forEach((err) => {
				messagesToDisplay.push(err)
			})
		}
	} else if (error.message) {
		messagesToDisplay.push(error.message)
	}

	/**
	 * @description -> If haven't errors into the messagesToDisplay so put the defaultMessage.
	 */
	if (messagesToDisplay.length === 0) {
		messagesToDisplay.push(defaultMessage)
	}

	/**
	 * @description -> Show message.
	 */
	messagesToDisplay.forEach((msg) => {
		showMessage.error(msg)
	})
}
