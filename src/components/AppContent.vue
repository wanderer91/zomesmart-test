<template lang="pug">
    div(class='content')
        RouterView
</template>

<script lang="ts">
import { RouterView } from 'vue-router'

export default {}
</script>

<style scoped lang="scss">
.content {
    max-width: 1600px;
    padding-top: var(--header-height);
    min-height: 100vh;
}
</style>
