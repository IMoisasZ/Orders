import React from 'react'
import { ToastContainer, toast } from 'react-toastify'

export default function Message() {
	return (
		<div>
			<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
		</div>
	)
}

export const showMessage = {
	success: (message, options) => toast.success(message, options),
	error: (message, options) => toast.error(message, options),
	warn: (message, options) => toast.warn(message, options),
	info: (message, options) => toast.info(message, options),
	default: (message, options) => toast(message, options),
	custom: (content, options) => toast(content, options),
}
