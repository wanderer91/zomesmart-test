import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import type { AuthData } from '@/types/auth'
import type { CreateTokenData } from '@/types/token'
import type { IStoreState } from '@/types/store'

export const useAppStore = defineStore('app', {
    state: (): IStoreState => ({ loading: false, user: { access_token: null, refresh_token: null, email: null } }),
    getters: {
        is_loading: (state) => state.loading,
        email: (state) => state.user.email,
        is_guest: (state) => !state.user.email,
        access_token: (state) => state.user.access_token,
        refresh_token: (state) => state.user.refresh_token
    },
    actions: {
        async postLogin(data: AuthData): Promise<CreateTokenData> {
            this.SET_LOADING(true)
            const res = await (<Promise<AxiosResponse>>(
                axios.post(`${import.meta.env.VITE_API_HOST}api/user/jwt/create/`, data)
            ))

            const resData: CreateTokenData = res.data
            this.SET_ACCESS_TOKEN(resData.access)
            this.SET_REFRESH_TOKEN(resData.refresh)
            this.SET_EMAIL(data.email)
            this.SET_LOADING(false)
            return resData
        },
        postLogout() {
            this.SET_EMAIL(null)
            this.SET_ACCESS_TOKEN(null)
            this.SET_REFRESH_TOKEN(null)
        },
        SET_ACCESS_TOKEN(token: string | null) {
            this.user.access_token = token
        },
        SET_REFRESH_TOKEN(token: string | null) {
            this.user.refresh_token = token
        },
        SET_EMAIL(email: string | null) {
            this.user.email = email
        },
        SET_LOADING(loading: Boolean) {
            this.loading = loading
        }
    },
    persist: true
})
