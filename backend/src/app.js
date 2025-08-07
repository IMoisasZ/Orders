import express from 'express'
import cors from 'cors'
import errorHandler from './middlewares/error.middleware.js'
import { getLogger } from './config/logger.config.js'
import {
	ClientRoutes,
	CompanyRoutes,
	OrderDetailsRoutes,
	OrderRoutes,
	TypeItemRoutes,
} from './routes/index.route.js'

const app = express()

app.use(express.json())

app.use(cors())

// global.logger
app.use((req, res, next) => {
	req.logger = getLogger()
	next()
})

// routes
app.use('/client', ClientRoutes)
app.use('/company', CompanyRoutes)
app.use('/type_item', TypeItemRoutes)
app.use('/order', OrderRoutes)
app.use('/order_details', OrderDetailsRoutes)

// error default
app.use(errorHandler)

export default app
