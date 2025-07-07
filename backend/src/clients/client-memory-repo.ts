import { Client } from "./client";
import ClientRepo from "./client-repo";

export default class ClientMemoryRepo implements ClientRepo {
    clients: Client[]

    constructor() {
        this.clients = []
    }
    
    async save(client: Client): Promise<void> {
        this.clients.push(client)
    }

    async list(): Promise<Client[]> {
        return this.clients
    }

}