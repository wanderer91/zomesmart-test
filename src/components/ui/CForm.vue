<template lang="pug">
    form(class='form' @submit.prevent="$emit('submit')")
        h1(class='form-title')
            slot(name='title')
        .form-subtitle
            slot(name='sub_title')
        slot(name='content')
</template>

<script lang="ts">
import CInput from '@/components/ui/CInput.vue'
import CButton from '@/components/ui/CButton.vue'

export default {
    components: {
        CInput,
        CButton
    },
    emits: ['submit'],
    methods: {
        submit() {}
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
}
</style>
