import { Account } from "./account";
import AccountRepo from "./account-repo";

export class CreateNewAccount {
    constructor(readonly accountRepo: AccountRepo) {}

    async exec(input: Input): Promise<Output<Account>> {
        try {
            const account = new Account(input)
            await this.accountRepo.save(account)
            return { message: "[Ok]", data: account }
        } catch (error) {
            return { message: "Falhou!" }
        }
    }
}

type Input = {
    username: string
    storename: string
    email: string
    password: string
    role: string
}

type Output<T> = {
    message: string,
    data?: T
}