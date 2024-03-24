<template lang="pug">
    header(class='header')
        Logo
        Support
</template>

<script lang="ts">
import Logo from '@/components/Logo.vue'
import Support from '@/components/Support.vue'
export default {
    components: {
        Logo,
        Support
    }
}
</script>

<style scoped lang="scss">
.header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    padding: 40px;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
