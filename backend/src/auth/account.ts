import crypto from 'crypto'

type Props = {
    username: string
    storename: string
    email: string
    password: string
    role: string
}

export class Account {
    private _id: string;
    private account: Required<Props>;

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

    public getStorename(): string {
        return this.account.storename
    }

    public getEmail(): string {
        return this.account.email
    }

    public getRole(): string {
        return this.account.role
    }

    public getPassword(): string {
        return this.account.password
    }

}