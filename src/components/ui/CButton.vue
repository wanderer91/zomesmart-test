<template lang="pug">
    .btn-wrapper
        button(class='btn' :class="btn_class" :type="type" :disabled="disabled") {{ text }}
</template>

<script lang="ts">
export default {
    props: {
        type: {
            type: String,
            default: 'button'
        },
        text: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        btn_class() {
            return {
                'btn-disabled': this.disabled
            }
        }
    }
}
</script>

<style scoped lang="scss">
.btn {
    appearance: none;
    padding: 17px 30px;
    border-radius: 6px;
    font-weight: 600;
    color: var(--color-white);
    background-color: var(--color-green);
    cursor: pointer;
    font-size: var(--font-size);
    border: none;
    transition: all var(--transition-duration) ease-in-out;
    height: var(--input-height);

    &:not(&-disabled):hover {
        background-color: var(--color-second-green);
    }

    &:not(&-disabled):active {
        background-color: var(--color-third-green);
    }

    &-disabled {
        color: var(--color-second-grey);
        background: var(--color-second-light-grey);
        cursor: default;
    }

    &-wrapper {
        padding-top: 40px;
        padding-bottom: 20px;
    }
}
</style>
