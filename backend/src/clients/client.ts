type Props = {
    username: string
    storename: string
    email: string
    password: string
}

export class Client {
    _id: string
    client: Required<Props>;

    constructor(client: Props, id?: string) {
        this._id = id || ''
        this.client = client
    }

    public getId(): string {
        return this._id
    }

    public getUsername(): string {
        return this.client.username
    }

    public getEmail(): string {
        return this.client.email
    }

    public getPassowrd(): string {
        return this.client.password
    }
}

