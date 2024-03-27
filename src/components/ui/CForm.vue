<template lang="pug">
    form(class='form' :class="form_class" @submit.prevent="$emit('submit')")
        h1(class='form-title')
            slot(name='title')
        .form-subtitle
            slot(name='sub_title')
        .form-content
            slot(name='content')
</template>

<script lang="ts">
export default {
    props: {
        class: {
            type: String,
            default: ''
        },
        horiz: {
            type: Boolean,
            default: false
        }
    },
    emits: ['submit'],
    methods: {
        submit() {}
    },
    computed: {
        form_class() {
            return {
                [this.class]: true,
                'form-horizontal': this.horiz
            }
        }
    }
}
</script>

<style scoped lang="scss">
.form {
    &-title {
        color: var(--color-black);
        font-size: calc(var(--font-size) * 2.8);
        line-height: calc(var(--font-size) * 2.8);
        margin-top: 0;
    }

    &-title,
    &-subtitle {
        margin-bottom: 20px;
    }

    &-horizontal &-content {
        flex-wrap: wrap;
        display: flex;
        gap: 20px;
        align-items: center;
    }
}
</style>
