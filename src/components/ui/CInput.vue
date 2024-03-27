<template lang="pug">
    .input-wrapper
        label(class='input-label' :class="label_class")
            div(v-if="label" :for="name" class='input-label-text') {{ label }} 
            input(
                :type="inputType"
                class='input'
                :class="input_class"
                :name="name"
                :id="name"
                :placeholder="placeholder"
                @keydown="checkMask"
                @input="onUpdateValue"
                :required="required"
                :disabled="disabled"
                :checked="checked && is_checkbox"
                :value="value"
                )
            CIcon(v-if="is_password_input" type='eye' class='icon-input' @click.prevent="togglePassword")
            .input-note(v-if="$slots.note")
                slot(name='note')
</template>

<script lang="ts">
import CIcon from '@/components/ui/CIcon.vue'

export default {
    components: {
        CIcon
    },
    props: {
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
        },
        checked: {
            type: Boolean,
            default: false
        },
        half_checked: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: ''
        },
        mask: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            inputType: '' as string
        }
    },
    beforeMount() {
        this.inputType = this.type
    },
    emits: ['update:modelValue'],
    computed: {
        input_class() {
            return {
                'input-checkbox': this.type === 'checkbox',
                'input-checkbox-half': this.half_checked,
                'input-small': this.size === 'small'
            }
        },
        label_class() {
            return {
                'input-label-password': this.is_password_input,
                'input-label-email': this.type === 'email'
            }
        },
        is_password_input() {
            return this.type === 'password'
        },
        is_checkbox() {
            return this.type === 'checkbox'
        }
    },
    methods: {
        togglePassword() {
            this.inputType = this.inputType === 'password' ? 'text' : 'password'
        },
        checkMask(e: KeyboardEvent) {
            if (!this.mask) {
                return
            }

            const regExp = new RegExp(`[^${this.mask}]`)
            if (e.key.length === 1 && regExp.test(e.key)) {
                e.preventDefault()
            }
        },
        onUpdateValue(e: InputEvent) {
            const target: EventTarget | null = e.target
            let value = this.is_checkbox ? +target?.checked : target?.value

            this.$emit('update:modelValue', value)
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

    &-small {
        height: calc(var(--input-height) * 0.6);
        padding: 8px 10px;
    }

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

    &-checkbox {
        position: relative;
        width: 19px;
        height: 19px;
        padding: 0;
        background-color: transparent;
        border-color: var(--color-grey);
        margin: 0;

        &,
        &:focus {
            box-shadow: none;
        }

        &:checked {
            border-color: var(--color-green);
            background-color: var(--color-green);

            &:after {
                position: absolute;
                content: '';
                width: 10px;
                height: 4px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, calc(-50% - 2px)) rotate(-55deg);
                border: 3px solid var(--color-white);
                border-top: none;
                border-right: none;
            }
        }

        &-half {
            &:checked {
                &:after {
                    height: 3px;
                    border: none;
                    transform: translate(-50%, -50%);
                    background-color: var(--color-white);
                }
            }
        }
    }
}
</style>
