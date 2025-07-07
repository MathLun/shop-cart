import { Account } from "./account";

export default interface AccountRepo {
    save(account: Account): Promise<void>
    update(account: Account): Promise<void>
    get(id: string): Promise<Account>
    getByUsername(username: string): Promise<Account>
}