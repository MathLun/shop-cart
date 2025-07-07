import bcrypt from 'bcrypt'

export const createPasswordHash = async (password: string): Promise<void|any> => {
    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt)
    return passwordHash
}