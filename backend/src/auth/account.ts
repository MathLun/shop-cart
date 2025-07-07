import crypto from 'crypto'

type Props = {
    username: string
    email: string
    password: string
    role: string
}

export class Account {
    _id: string;
    account: Required<Props>;

    constructor(account: Props, id?: string) {
        this._id = id || crypto.randomUUID()
        this.account = account
    }

    public getId(): string {
        return this._id
    }

    public getUsername(): string {
        return this.account.username
    }

    public getEmail(): string {
        return this.account.email
    }

    public getRole(): string {
        return this.account.role
    }
}