<template lang="pug">
    div(class='block' :class="block_class")
        slot
</template>

<script lang="ts">
export default {
    props: {
        size: {
            type: String,
            default: 'small'
        },
        class: {
            type: String,
            default: ''
        }
    },
    computed: {
        block_class() {
            return {
                [this.class]: true,
                'block-small': this.size === 'small',
                'block-big': this.size === 'big',
                'block-mini': this.size === 'mini'
            }
        }
    }
}
</script>

<style scoped lang="scss">
.block {
    background-color: var(--color-white);
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0px 6px 8px 0px var(--color-black-016);

    &-small {
        width: 430px;
    }

    &-mini {
        width: 200px;
        padding: 10px 12px;
        border-radius: 6px;
    }

    &-big {
        width: 100%;
    }
}
</style>
