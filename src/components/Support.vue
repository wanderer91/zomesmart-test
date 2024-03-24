<template lang="pug">
    .support
        span Поддержка
        img(src='@/assets/tg.svg' class='support-icon')
        img(src='@/assets/wa.svg' class='support-icon')
</template>

<script lang="ts">
export default {}
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
