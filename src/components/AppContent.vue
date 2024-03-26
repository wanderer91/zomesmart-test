<template lang="pug">
    .content
        RouterView
</template>

<script lang="ts">
import { RouterView } from 'vue-router'

export default {}
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
