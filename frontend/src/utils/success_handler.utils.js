import { showMessage } from '../components/message/Message'

export function handleSuccess(message = 'Operação realizada com sucesso!') {
	showMessage.success(message)
}
