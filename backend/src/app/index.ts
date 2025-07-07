import express, { Application } from 'express'
import { authRouter } from '../routes/auth'
import { clientsRouter } from '../routes/clients'

export const app: Application = express()
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/clients', clientsRouter)