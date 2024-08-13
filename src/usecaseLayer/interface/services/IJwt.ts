// backend\src\usecaseLayer\interface\services\IJwt.ts

export default interface IJwt {
    createJWT(userId: string, email: string, role: string, name: string): string
    verifyJWT(token: string): Promise<{ userId: string; email: string; role: string; name: string }>
}