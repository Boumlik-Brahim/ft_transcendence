export type JwtPayload = {
    id: string,
    email: string,
    isTwoFactorEnabled?: Boolean,
    isTwoFactorAuthenticated?: Boolean
}