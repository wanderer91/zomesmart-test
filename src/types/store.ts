export interface IUserState {
    access_token: string | null
    refresh_token: string | null
    email: string | null
}

export interface IStoreState {
    loading: Boolean
    user: IUserState
}
