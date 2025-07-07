import { clientRepo } from "../repos";
import GetAllClients from "../clients/get-all-clients";
import { Request, Response, Router } from "express";

/* UseCases: Client */
const getAllClients: GetAllClients = new GetAllClients(clientRepo)

export const clientsRouter: Router = Router()
clientsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const clients = await getAllClients.exec()
        res.json({ status: 201, data: clients })
    } catch (error) {
        console.error(error)
    }
})