import { Client } from "./client";
import ClientRepo from "./client-repo";

export default class CreateNewClient {
    constructor(readonly clientRepo: ClientRepo) {}

    async exec(input: Input): Promise<Output> {
        try {
            const client = new Client({
                username: input.username,
                storename: input.storename,
                email: input.email,
                password: input.password
            }, input._id)
            await this.clientRepo.save(client)
            return { message: "Novo client criado com sucesso" }
        } catch (error) {
            return { message: "Erro ao criar o client!" }
        }
    }
}

type Input = {
    _id?: string
    username: string
    storename: string
    email: string
    password: string
}

type Output = {
    message: string
}