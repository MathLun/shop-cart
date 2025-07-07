import Admin from "./admin";
import AdminRepo from "./admin-repo";

export default class CreateNewAdmin {
    constructor(readonly adminRepo: AdminRepo<Admin>) {}

    async exec(input: Input): Promise<Output> {
        try {
            const admin = new Admin({ storename: input.storename, email: input.email, password: input.password }, input._id)
            await this.adminRepo.save(admin)
            return { message: '[Ok]' }
        } catch (e) {
            return { message: 'Falhou!' }
        }
    }
}

type Input = {
    _id?: string
    storename: string
    email: string
    password: string
}

type Output = {
    message: string
}