<template lang="pug">
    header(class='header' :class="header_class")
        Logo(v-if="is_guest")
        Support(v-if="is_guest")
        User(v-else)
</template>

<script lang="ts">
import Logo from '@/components/Logo.vue'
import Support from '@/components/Support.vue'
import User from '@/components/User.vue'

export default {
    components: {
        Logo,
        Support,
        User
    },
    props: {
        is_guest: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        header_class() {
            return {
                'header-align-end': !this.is_guest,
                'header-white': !this.is_guest,
                'header-small': !this.is_guest
            }
        }
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

    &-align-end {
        justify-content: flex-end;
    }

    &-white {
        background-color: var(--color-white);
    }

    &-small {
        padding-top: 28px;
        padding-bottom: 28px;
        padding-left: 30px;
        padding-right: 30px;
    }
}
</style>
