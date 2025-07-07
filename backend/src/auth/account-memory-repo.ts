import { Account } from "./account";
import AccountRepo from "./account-repo";

export default class AccountMemoryRepo implements AccountRepo {
    accounts: Account[];

    constructor() {
        this.accounts = []
    }

    async save(account: Account): Promise<void> {
        this.accounts.push(account)
    }
    async update(account: Account): Promise<void> {}

    async get(id: string): Promise<Account> {
        const account = this.accounts.find(account => account._id === id)
        if (!account) throw new Error()
        return account
    }

    async getByUsername(username: string): Promise<Account> {
        const account = this.accounts.find(account => account.getUsername() === username)
        if (!account) throw new Error()
        return account
    }
}