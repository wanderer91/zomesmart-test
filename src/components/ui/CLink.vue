<template lang="pug">
    a(:href='url' class='link')
        slot(name='content')
</template>

<script lang="ts">
export default {
    props: {
        url: {
            type: String,
            default: '/'
        }
    }
}
</script>

<style scoped lang="scss">
.link {
    transition: all var(--transition-duration) ease-in-out;

    &:link,
    &:visited {
        color: var(--color-green);
    }

    &:link,
    &:hover,
    &:active,
    &:visited {
        text-decoration: none;
    }

    &:hover {
        color: var(--color-fourth-green);
    }
}
</style>
