import Admin from "./admin";
import AdminRepo from "./admin-repo";

export default class AdminMemoryRepo implements AdminRepo<Admin> {
    private _admins: Admin[]

    constructor () {
        this._admins = []
    }

    async save(admin: Admin): Promise<void> {
        this._admins.push(admin)
    }

    async get(_id: string): Promise<Admin> {
        const admin = this._admins.find(_admin => _admin.getId() === _id)
        if (!admin) throw new Error()
        return admin
    }
}