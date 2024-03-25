<template lang="pug">
    .support
        span Поддержка
        CIcon(type='tg' class='support-icon')
        CIcon(type='wa' class='support-icon')
</template>

<script lang="ts">
import CIcon from '@/components/ui/CIcon.vue'
export default {
    components: {
        CIcon
    }
}
</script>

<style scoped lang="scss">
.support {
    display: flex;
    align-items: center;
    color: var(--color-grey);

    &-icon {
        margin-left: 10px;
    }
}
</style>
