import { Account } from "./account";
import AccountRepo from "./account-repo";

export class CreateNewAccount {
    constructor(readonly accountRepo: AccountRepo) {}

    async exec(input: Input): Promise<Output> {
        try {
            const account = new Account(input)
            await this.accountRepo.save(account)
            return { message: "Nova conta criada com sucesso!" }
        } catch (error) {
            return { message: "Erro ao criar uma nova conta" }
        }
    }
}

type Input = {
    username: string
    email: string
    password: string
    role: string
}

type Output = {
    message: string
}