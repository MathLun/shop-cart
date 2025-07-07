import bcrypt from 'bcrypt'

export const validatePassowrdHash = async (accountPassword: string, inputPassword: string): Promise<boolean> => {
    const match = await bcrypt.compare(inputPassword, accountPassword)
    return match
}