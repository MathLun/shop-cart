import { privateKey } from '../constants/private-key'
import jwt from 'jsonwebtoken'

export const createTokenFromAccess = async (input: Input): Promise<TokenData> => {
    const expiresIn = 60 * 60 // an hour
    const token = jwt.sign(input.data, privateKey, {
        algorithm: 'HS256',
        expiresIn: expiresIn
    })
    return { token, expiresIn }
}

type Input = {
    data: {}
}

type TokenData = {
    token: string
    expiresIn: number
}