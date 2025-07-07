import { Client } from "./client";

export default interface ClientRepo {
    save(client: Client): Promise<void>
    list(): Promise<Client[]>
}