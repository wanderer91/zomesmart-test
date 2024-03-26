<script lang="ts">
import NavBar from '@/components/Navbar.vue'
import AppContent from '@/components/AppContent.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import { mapState } from 'pinia'
import { useAppStore } from '@/stores'

export default {
    components: {
        NavBar,
        AppContent,
        Loading
    },
    computed: {
        ...mapState(useAppStore, ['is_guest', 'is_loading'])
    }
}
</script>

<template lang="pug">
    NavBar(:is_guest="is_guest")
    AppContent
    Loading(
        v-model:active="is_loading"
        :is-full-page="true"
        color="var(--color-green)"
        loader="dots"
        )
</template>

<style lang="scss">
:root {
    --color-white: #fff;
    --color-black: #000;
    --color-black-005: rgba(0, 0, 0, 0.05);
    --color-black-016: rgba(0, 0, 0, 0.16);
    --color-black-025: rgba(0, 0, 0, 0.25);
    --color-black-040: rgba(0, 0, 0, 0.4);
    --color-grey: #999999;
    --color-second-grey: #cececf;
    --color-grey-016: rgba(30, 52, 71, 0.16);
    --color-light-grey: #f2f2f2;
    --color-second-light-grey: #f2f1f3;
    --color-green: #2ed2ba;
    --color-second-green: #2cc7b1;
    --color-third-green: #29bda7;
    --color-fourth-green: #20ebcd;
    --color-dark-blue: #132639;
    --logo-height: 30px;
    --font-size: 15px;
    --transition-duration: 400ms;
    --input-height: 50px;
}

body {
    margin: 0;
    font-family: Roboto, sans-serif;
    background-color: var(--color-light-grey);
    font-size: var(--font-size);
}

* {
    box-sizing: border-box;
}
</style>
