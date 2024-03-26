<template lang="pug">
    .auth
        CBlock
            AuthForm(@submit="login")
</template>

<script lang="ts">
import CBlock from '@/components/ui/CBlock.vue'
import AuthForm from '@/components/AuthForm.vue'
import type { AuthData } from '@/types/auth'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

export default {
    components: {
        CBlock,
        AuthForm
    },
    methods: {
        async login(data: AuthData) {
            const { SET_LOADING } = useAppStore()
            const { postLogin } = useAuthStore()

            SET_LOADING(true)
            await postLogin(data)
            SET_LOADING(false)

            this.$router.push('/')
        }
    }
}
</script>

<style scoped lang="scss">
.auth {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
