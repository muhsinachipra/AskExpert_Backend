import jwt from 'jsonwebtoken'
import IJwt from '../../usecaseLayer/interface/services/IJwt'

export default class JwtPassword implements IJwt {
    createJWT(userId: string, email: string, role: string, name: string): string {
        const jwtKey = process.env.JWT_KEY
        if (jwtKey) {
            const token: string = jwt.sign(
                { id: userId, email: email, role: role, name: name },
                jwtKey
            )
            return token
        }
        throw new Error("JWT_KEY is not defined")
    }
}