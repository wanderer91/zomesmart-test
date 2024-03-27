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
        },
        underline: {
            type: Boolean,
            default: false
        },
        class: {
            type: String,
            default: ''
        }
    },
    emits: ['click'],
    computed: {
        link_class() {
            return {
                [this.class]: true,
                'link-grey': this.color === 'grey',
                'link-underlined': this.underline
            }
        }
    },
    methods: {
        handleClick(e: Event) {
            if (this.anchor) {
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

    &-grey.link-underlined {
        border-bottom: 1px dashed var(--color-dark-blue);

        &:hover {
            border-color: var(--color-fourth-green);
        }
    }
}
</style>
