// backend\src\infrastructureLayer\services\jwt.ts

import jwt from 'jsonwebtoken'
import IJwt from '../../usecaseLayer/interface/services/IJwt'

export default class JwtPassword implements IJwt {
    // createJWT(userId: string, email: string, role: string, name: string): string {
    //     const accessKey = process.env.ACCESS_TOKEN_SECRET
    //     const refreshKey = process.env.REFRESH_TOKEN_SECRET
    //     if (accessKey && refreshKey) {
    //         const accessToken: string = jwt.sign(
    //             { id: userId, email: email, role: role, name: name },
    //             accessKey,
    //             { expiresIn: '60s' }
    //         )
    //         const refreshToken: string = jwt.sign(
    //             { id: userId, email: email, role: role, name: name },
    //             refreshKey,
    //             { expiresIn: '1d' }
    //         )
    //         return accessToken
    //     }
    //     throw new Error("JWT_KEY is not defined")
    // }
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

    verifyJWT(token: string): Promise<{ userId: string; email: string; role: string; name: string }> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_KEY as string, (err, decoded) => {
                if (err) {
                    return reject(new Error("Token not verified"));
                }
                resolve(decoded as { userId: string; email: string; role: string; name: string });
            });
        });
    }
}