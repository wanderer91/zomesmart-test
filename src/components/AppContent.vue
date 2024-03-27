<template lang="pug">
    .content(:style="{'padding-top': is_guest ? 0 : '100px', 'padding-bottom': is_guest ? 0 : '50px'}")
        RouterView
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import { mapState } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export default {
    computed: {
        ...mapState(useAuthStore, ['is_guest'])
    }
}
</script>

<style scoped lang="scss">
.content {
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    padding-top: var(--header-height);
    min-height: 100vh;
}
</style>
