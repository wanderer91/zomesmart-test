<template lang="pug">
    a(:href='url' class='link' :class="link_class" @click="handleClick")
        CIcon(:type="icon" v-if="icon")
        slot(name='content')
</template>

<script lang="ts">
import CIcon from '@/components/ui/CIcon.vue'

export default {
    components: {
        CIcon
    },
    props: {
        url: {
            type: String,
            default: '/'
        },
        icon: {
            type: String,
            default: ''
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
        },
        bold: {
            type: Boolean,
            default: false
        },
        ignore_hover: {
            type: Boolean,
            default: false
        },
        back_color: {
            type: Boolean,
            default: false
        }
    },
    emits: ['click'],
    computed: {
        link_class() {
            return {
                [this.class]: true,
                'link-grey': this.color === 'grey',
                'link-underlined': this.underline,
                'link-bold': this.bold,
                'link-nohover': this.ignore_hover,
                'link-back': this.back_color,
                'link-icon': !!this.icon
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

    &:not(&-nohover):hover {
        color: var(--color-fourth-green);
    }

    &-icon {
        line-height: calc(var(--font-size) * 1.2);

        .icon {
            vertical-align: middle;
        }
    }

    &-back {
        border-radius: 6px;
        padding: 8px 10px;
    }

    &-grey {
        &:link,
        &:visited {
            color: var(--color-dark-blue);
        }
    }

    &-grey.link-back {
        background-color: var(--color-second-light-grey);
    }

    &-grey:not(&-nohover) {
        &:hover {
            color: var(--color-fourth-green);
        }
    }

    &-grey.link-underlined {
        border-bottom: 1px dashed var(--color-dark-blue);
    }

    &-grey.link-underlined:not(&-nohover) {
        &:hover {
            border-color: var(--color-fourth-green);
        }
    }

    &-bold {
        font-weight: 600;
    }

    .icon {
        display: inline-block;
        margin-right: 10px;
    }
}
</style>
