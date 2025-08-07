import { showMessage } from '../components/message/Message'

export function handleError(
	error,
	defaultMessage = 'Ocorreu um erro inesperado.'
) {
	// error of deploy
	console.error({ error })

	// array of errors
	const messagesToDisplay = []

	// verify if have errors and put into the variable messagesToDisplay
	if (error.response && error.response.data) {
		if (error.response.data.error) {
			messagesToDisplay.push(error.response.data.error)
		}

		// verify if have errors in another place and put into the variable messagesToDisplay
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

	// if haven't errors into the messagesToDisplay so put the defaultMessage
	if (messagesToDisplay.length === 0) {
		messagesToDisplay.push(defaultMessage)
	}

	// show message
	messagesToDisplay.forEach((msg) => {
		showMessage.error(msg)
	})
}
