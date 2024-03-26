import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import type { AuthData } from '@/types/auth'
import type { CreateTokenData, RefreshTokenData } from '@/types/token'
import type { IAuthState } from '@/types/auth'

export const useAuthStore = defineStore('auth', {
    state: (): IAuthState => ({ access_token: null, refresh_token: null, email: null }),
    getters: {
        is_guest: (state): Boolean => !state.email
    },
    actions: {
        async postLogin(data: AuthData): Promise<CreateTokenData> {
            const res = await (<Promise<AxiosResponse>>(
                axios.post(`${import.meta.env.VITE_API_HOST}api/user/jwt/create/`, data)
            ))

            const resData: CreateTokenData = res.data
            this.SET_ACCESS_TOKEN(resData.access)
            this.SET_REFRESH_TOKEN(resData.refresh)
            this.SET_EMAIL(data.email)
            return resData
        },
        async refreshToken() {
            const res = await (<Promise<AxiosResponse>>(
                axios.post(`${import.meta.env.VITE_API_HOST}api/user/jwt/refresh/`, { refresh: this.refresh_token })
            ))

            const resData: RefreshTokenData = res.data
            this.SET_ACCESS_TOKEN(resData.access)
        },
        postLogout() {
            this.SET_EMAIL(null)
            this.SET_ACCESS_TOKEN(null)
            this.SET_REFRESH_TOKEN(null)
        },
        SET_ACCESS_TOKEN(token: string | null) {
            this.access_token = token
        },
        SET_REFRESH_TOKEN(token: string | null) {
            this.refresh_token = token
        },
        SET_EMAIL(email: string | null) {
            this.email = email
        }
    },
    persist: true
})
