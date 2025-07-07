import Client from "./client"

type Props = {
    storename: string
    email: string
    password: string
}

export default class Admin {
    private _id: string
    private data: Required<Props>

    constructor(data: Props, id?: string) {
        this._id = id || ''
        this.data = data
    }

    public getId(): string {
        return this._id
    }

    public getStoreName(): string {
        return this.data.storename
    }

    public getEmail(): string {
        return this.data.email
    }

    public getPassword(): string {
        return this.data.password
    }
}