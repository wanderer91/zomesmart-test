<template lang="pug">
    CForm(@submit="submit")
        template(#title)
            span Вход
        template(#sub_title)
            span Нет аккаунта?&nbsp;
            CLink
                template(#content) Зарегистрироваться
        template(#content)        
            CInput(name='email' type='email' placeholder='yourmail@mail.ru' label='Email' v-model="email")
            CInput(name='password' type='password' placeholder='Ваш пароль' label='Пароль' v-model="password")
            CLink
                template(#content)
                    span Забыли пароль?
            CButton(type='submit' text='Войти' :disabled="!email || !password")
</template>

<script lang="ts">
import CInput from '@/components/ui/CInput.vue'
import CButton from '@/components/ui/CButton.vue'
import CForm from '@/components/ui/CForm.vue'
import CLink from '@/components/ui/CLink.vue'

export default {
    components: {
        CInput,
        CButton,
        CForm,
        CLink
    },
    emits: ['submit'],
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        submit() {
            this.$emit('submit', {
                email: this.email,
                password: this.password
            })
        }
    },
    computed: {}
}
</script>

<style scoped lang="scss"></style>
