export type AuthData = {
    email: string
    password: string
}

export interface IAuthState {
    access_token: string | null
    refresh_token: string | null
    email: string | null
}
