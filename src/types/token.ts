export interface RefreshTokenData {
    access: string
}

export interface CreateTokenData extends RefreshTokenData {
    refresh: string
}
