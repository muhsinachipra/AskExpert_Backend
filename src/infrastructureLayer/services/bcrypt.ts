import bcrypt from 'bcryptjs'
import IHashPassword from '../../usecaseLayer/interface/services/IHashPassword'

export default class Encrypt implements IHashPassword {
    async createHash(password: string): Promise<string> {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    }

    async compare(password: string, hashPassword: string): Promise<boolean> {
        const match = await bcrypt.compare(password, hashPassword)
        return match
    }
}
