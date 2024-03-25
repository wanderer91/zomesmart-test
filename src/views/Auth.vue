<template lang="pug">
    .auth
        CBlock
            AuthForm(@submit="login")
</template>

<script lang="ts">
import CBlock from '@/components/ui/CBlock.vue'
import AuthForm from '@/components/AuthForm.vue'
import type { AuthType } from '@/types/auth'

export default {
    components: {
        CBlock,
        AuthForm
    },
    methods: {
        login(data: AuthType) {}
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
