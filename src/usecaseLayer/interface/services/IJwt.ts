export default interface IJwt {
    createJWT(userId: string, email: string, role: string, name: string): string
}