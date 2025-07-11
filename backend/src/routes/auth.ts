import { Router, Request, Response, NextFunction } from 'express'
import { CreateNewAccount } from '../auth/create-new-account'
import GetAccountByUsername from '../auth/get-account-by-username'
import CreateNewClient from '../clients/create-new-client'
import { createPasswordHash } from '../utils/create-password-hash'
import { validatePassowrdHash } from '../utils/validate-password-hash'
import { accountRepo, adminRepo, clientRepo } from '../repos'
import CreateNewAdmin from '../admin/create-new-admin'
import { createTokenFromAccess } from '../utils/create-token-from-access'

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
        const isExistsAccount = await getAccountByUsername.exec({ username: username })
        if (isExistsAccount.data) {
            res.json({
                status: 301,
                message: 'Este usuario existe, tente novamente com outro nome!'
            })
        } else {
            const passwordHash = await createPasswordHash(password)
            const isClient = role === "client"
            const isAdmin = role === "admin"
            const { message, data } = await createNewAccount.exec({ username, storename, email, password: passwordHash, role })
            const tokenData = await createTokenFromAccess({ data: {
                username: data?.getUsername(),
                storename: data?.getStorename(),
                email: data?.getEmail(),
                password: data?.getPassword(),
                role: data?.getRole()
            }})
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
                data: { username: account.data?.getUsername(), role: account.data?.getRole(), token: tokenData.token }
            })
        }         
    } catch (error) {
        console.error('Error: ao criar a conta -> ', error)
    }   
})

authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body
        const isExistsAccount = await getAccountByUsername.exec({ username })
        if (!isExistsAccount.data) {
            res.json({
                message: "Nome ou senha invalida, tente novamente"
            })
        } else {
            const account = await getAccountByUsername.exec({ username })
            const accountPassword = account.data?.getPassword() || ''
            const isPasswordValid = await validatePassowrdHash(accountPassword, password)
            const tokenData = await createTokenFromAccess({ data: {
                username: account.data?.getUsername(),
                storename: account.data?.getStorename(),
                email: account.data?.getEmail(),
                password: account.data?.getPassword(),
                role: account.data?.getRole()
            }})
            account && isPasswordValid && res.json({ status: 201, data: account, token: tokenData.token })
        }
    } catch (e) {
        console.error(e)
    }
})