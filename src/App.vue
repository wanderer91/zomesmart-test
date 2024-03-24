<script lang="ts">
import NavBar from '@/components/Navbar.vue'
import AppContent from '@/components/AppContent.vue'
export default {
    components: {
        NavBar,
        AppContent
    }
}
</script>

<template lang="pug">
    .app
        NavBar
        AppContent
</template>

<style lang="scss">
body {
    margin: 0;
    font-family: Roboto, sans-serif;
}

* {
    box-sizing: border-box;
}

:root {
    --color-white: #fff;
    --color-black: #000;
    --color-black-016: rgba(0, 0, 0, 0.16);
    --color-grey: #999999;
    --color-grey-016: rgba(30, 52, 71, 0.16);
    --color-light-grey: #f2f2f2;
    --color-green: #2ed2ba;
    --logo-height: 30px;
    --font-size: 15px;
}

.app {
    background-color: var(--color-light-grey);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--font-size);
}
</style>
