import { defineStore } from 'pinia'
import { type IAppState } from '@/types/app'

export const useAppStore = defineStore('app', {
    state: (): IAppState => ({ loading: false }),
    actions: {
        SET_LOADING(loading: Boolean) {
            this.loading = loading
        }
    }
})
