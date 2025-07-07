import { Client } from "./client";
import ClientRepo from "./client-repo";

export default class GetAllClients {
    constructor(readonly clientRepo: ClientRepo) {}

    async exec(): Promise<Output<Client>> {
        try {
            const clients = await this.clientRepo.list()
            return { message: "Lista de Clientes cadastrados.", data: clients }
        } catch (error) {
            return { message: "Erro ao listar todos clientes" }
        }
    }
}

type Output<T> = {
    message: string
    data?: T[]
}