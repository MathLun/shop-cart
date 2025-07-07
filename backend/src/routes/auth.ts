import { Router, Request, Response, NextFunction } from 'express'
import { CreateNewAccount } from '../auth/create-new-account'
import GetAccountByUsername from '../auth/get-account-by-username'
import CreateNewClient from '../clients/create-new-client'
import { createPasswordHash } from '../utils/create-password-hash'
import { validatePassowrdHash } from '../utils/validate-password-hash'
import { accountRepo, adminRepo, clientRepo } from '../repos'
import CreateNewAdmin from '../admin/create-new-admin'

/* UseCases: Account */
const createNewAccount: CreateNewAccount = new CreateNewAccount(accountRepo)
const getAccountByUsername: GetAccountByUsername = new GetAccountByUsername(accountRepo)

/* UseCases: Client*/
const createNewClient: CreateNewClient = new CreateNewClient(clientRepo)

/* UseCases: Admin */
const createNewAdmin: CreateNewAdmin = new CreateNewAdmin(adminRepo)

export const authRouter: Router = Router()
authRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, storename, email, password, role } = req.body
        const passwordHash = await createPasswordHash(password)
        const isClient = role === "client"
        const isAdmin = role === "admin"

        const { message } = await createNewAccount.exec({ username, storename, email, password: passwordHash, role })
        console.log("CreateNewAccount: ", message)

        const account = await getAccountByUsername.exec({ username: username })
        const accountId = account.data?.getId()
        console.log("GetAccountByUsername: ", account.message)

        if (isClient) {
            const { message } = await createNewClient.exec({ _id: accountId, username, storename, email, password: passwordHash })
            console.log("CreateNewClient: ", message)
        }

        if (isAdmin) {
            const { message } = await createNewAdmin.exec({ _id: accountId, storename: storename, email, password: passwordHash })
            console.log("CreateNewAdmin: ", message)
        }

        res.json({
            status: 201,
            message: 'Conta criada com sucesso!',
            data: { username: account.data?.getUsername(), role: account.data?.getRole() }
        })
    } catch (error) {
        console.error('Error: ao criar a conta -> ', error)
    }
})


authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body
        const account = await getAccountByUsername.exec({ username })
        const accountPassword = account.data?.getPassword() || ''
        const isPasswordValid = await validatePassowrdHash(accountPassword, password)
        
        account && isPasswordValid && res.json({ status: 201, data: account })
    } catch (e) {
        console.error(e)
    }
})