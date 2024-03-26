<template lang="pug">
    .input-wrapper
        label(class='input-label' :class="label_class")
            div(v-if="label" :for="name" class='input-label-text') {{ label }} 
            input(
                :type="inputType"
                class='input'
                :name="name"
                :id="name"
                :placeholder="placeholder"
                @input="$emit('update:modelValue', $event.target.value)"
                v-model="value"
                :required="required"
                :disabled="disabled"
                )
            CIcon(v-if="is_password_input" type='eye' class='icon-input' @click.prevent="togglePassword")
            .input-note
                slot(name='note')
</template>

<script lang="ts">
import CIcon from '@/components/ui/CIcon.vue'

export default {
    components: {
        CIcon
    },
    props: {
        modelValue: String,
        type: {
            type: String,
            default: 'text'
        },
        name: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            inputType: '',
            value: ''
        }
    },
    beforeMount() {
        this.inputType = this.type
    },
    emits: ['update:modelValue'],
    computed: {
        label_class() {
            return {
                'input-label-password': this.is_password_input,
                'input-label-email': this.type === 'email'
            }
        },
        is_password_input() {
            return this.type === 'password'
        }
    },
    methods: {
        togglePassword() {
            this.inputType = this.inputType === 'password' ? 'text' : 'password'
        }
    }
}
</script>

<style scoped lang="scss">
.input {
    width: 100%;
    height: var(--input-height);
    appearance: none;
    background-color: var(--color-second-light-grey);
    border-radius: 6px;
    border: 1px solid transparent;
    box-shadow: 0px 1px 2px 0px var(--color-black-025) inset;
    padding: 12px 22px;
    line-height: calc(var(--font-size) * 1.6);
    transition: all var(--transition-duration) ease-in-out;

    &-wrapper {
        margin-bottom: 20px;
    }

    &-label {
        user-select: none;
        display: block;
        position: relative;

        &-text {
            margin-bottom: 8px;
        }
    }

    &-label-text,
    &-note {
        font-size: calc(var(--font-size) * 0.8);
        color: var(--color-grey);
    }

    &-note {
        margin-top: 8px;
    }

    &-label-password & {
        padding-right: 60px;
    }

    &:focus {
        outline: none;
        border-color: var(--color-dark-blue);
        box-shadow: 0px 1px 2px 0px var(--color-black-040) inset;
    }
}
</style>
