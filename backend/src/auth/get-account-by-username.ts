import { Account } from "./account";
import AccountRepo from "./account-repo";

export default class GetAccountByUsername {
    constructor(readonly accountRepo: AccountRepo) {}

    async exec(input: Input): Promise<Output<Account>> {
        try {
            const account = await this.accountRepo.getByUsername(input.username)
            return { message: "[Ok]", data: account }
        } catch (error) {
            return { message: "[Error]" }
        }
    }
}

type Input = {
    username: string
}

type Output<T> = {
    message: string
    data?: T
}
