<template lang="pug">
    a(:href='url' class='link' :class="link_class" @click="handleClick")
        slot(name='content')
</template>

<script lang="ts">
export default {
    props: {
        url: {
            type: String,
            default: '/'
        },
        color: {
            type: String,
            default: ''
        },
        anchor: {
            type: Boolean,
            default: false
        }
    },
    emits: ['click'],
    computed: {
        link_class() {
            return {
                'link-grey': this.color === 'grey'
            }
        }
    },
    methods: {
        handleClick(e: Event) {
            if (!this.anchor) {
                e.preventDefault()
            }
            this.$emit('click')
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

    &-grey {
        &:link,
        &:visited {
            color: var(--color-dark-blue);
        }

        &:hover {
            color: var(--color-fourth-green);
        }
    }
}
</style>
