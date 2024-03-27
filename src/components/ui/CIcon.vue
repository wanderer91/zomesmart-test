<template lang="pug">
    span(class='icon' :class="icon_class")
</template>

<script lang="ts">
export default {
    props: {
        type: {
            type: String,
            default: ''
        },
        class: {
            type: String,
            default: ''
        }
    },
    computed: {
        icon_class() {
            return {
                [this.class]: !!this.class,
                [`icon-${this.type}`]: !!this.type
            }
        }
    }
}
</script>

<style scoped lang="scss">
.icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    &-tg {
        background-image: url('@/assets/tg.svg');
    }

    &-wa {
        background-image: url('@/assets/wa.svg');
    }

    &-eye {
        width: 25px;
        background-image: url('@/assets/eye.svg');
    }

    &-notifications {
        width: 25px;
        height: 25px;
        background-image: url('@/assets/notifications.svg');
    }

    &-arrow,
    &-grey-arrow {
        width: 11px;
        height: 5px;
        background-image: url('@/assets/arrow.svg');
    }

    &-grey-arrow {
        background-image: url('@/assets/grey-arrow.svg');
    }

    &-help {
        width: 25px;
        height: 25px;
        background-image: url('@/assets/help.svg');
    }

    &-delete {
        width: 25px;
        height: 25px;
        background-image: url('@/assets/delete.svg');
    }

    &-left-arrow,
    &-right-arrow {
        width: 5px;
        height: 11px;
    }

    &-left-arrow {
        background-image: url('@/assets/left-arrow.svg');
    }

    &-right-arrow {
        background-image: url('@/assets/right-arrow.svg');
    }

    &-input {
        position: absolute;
        right: 20px;
        bottom: 0;
        display: flex;
        height: var(--input-height);
        cursor: pointer;
    }
}
</style>
