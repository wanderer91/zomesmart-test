<template lang="pug">
    .user
        CIcon(type='notifications')
        .user-email(@click="handleClick")
            span {{ user.email }}
            CIcon(type='arrow')
            CBlock(v-show="show_user_dropdown" class='user-dropdown' size='mini')
                CLink(color='grey' @click="logout" :anchor="true" url="#")
                    template(#content) Выйти
</template>

<script lang="ts">
import CIcon from '@/components/ui/CIcon.vue'
import CBlock from '@/components/ui/CBlock.vue'
import CLink from '@/components/ui/CLink.vue'
import { mapState } from 'pinia'
import { useAppStore } from '@/stores'

export default {
    components: {
        CIcon,
        CBlock,
        CLink
    },
    data() {
        return {
            show_user_dropdown: false
        }
    },
    computed: {
        ...mapState(useAppStore, ['user'])
    },
    methods: {
        handleClick() {
            this.show_user_dropdown = !this.show_user_dropdown
        },
        logout() {
            const { postLogout } = useAppStore()
            postLogout()
            this.$router.push('/auth')
        }
    }
}
</script>

<style scoped lang="scss">
.user {
    display: flex;
    align-items: center;

    &-email {
        position: relative;
        margin-left: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;

        .icon {
            margin-left: 8px;
        }
    }

    &-dropdown {
        position: absolute;
        right: 0;
        top: calc(100% + 10px);
    }
}
</style>
