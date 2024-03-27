<template lang="pug">
    CBlock(size="big" class="products")
        h1(class='products-title')
            span Мои товары
            CIcon(type='help')
            span(class='products-count' v-if="products.length") {{ products.length }} из {{ count }}
        .products-desc
            p Добавьте товары вашего магазина из одной товарной и ценовой категории (разница цены не больше 15%)
            p Для добавления нескольких товаров введите несколько артикулов через запятую или используя клавишу Enter
        CForm(class='products-form' :horiz="true")
            template(#content)
                CInput(
                    label='Добавление товаров'
                    placeholder='Введите артикул продавца, артикул WB или ссылку на товар'
                    :disabled="true"
                    )
                    template(#note)
                        span Например ваши товары:&nbsp;
                        CLink(color='grey' :underline="true" :anchor="true")
                            template(#content) 119203059
                        span ,&nbsp;
                        CLink(color='grey' :underline="true" :anchor="true")
                            template(#content) 124366343
                        span ,&nbsp;
                        CLink(color='grey' :underline="true" :anchor="true")
                            template(#content) 59801844

                CButton(type='submit' text='Добавить' :disabled="true")
        ProductTable
</template>

<script lang="ts">
import CBlock from '@/components/ui/CBlock.vue'
import CIcon from '@/components/ui/CIcon.vue'
import CForm from '@/components/ui/CForm.vue'
import CInput from '@/components/ui/CInput.vue'
import CButton from '@/components/ui/CButton.vue'
import CLink from '@/components/ui/CLink.vue'
import ProductTable from '@/components/ProductTable.vue'
import { mapState, mapActions } from 'pinia'
import { useAppStore } from '@/stores/app'
import { useProductStore } from '@/stores/product'

export default {
    components: {
        CBlock,
        CIcon,
        CForm,
        CInput,
        CButton,
        CLink,
        ProductTable
    },
    computed: {
        ...mapState(useProductStore, ['count', 'products'])
    },
    methods: {
        ...mapActions(useAppStore, ['SET_LOADING']),
        ...mapActions(useProductStore, ['fetchProducts'])
    },
    async mounted() {
        this.SET_LOADING(true)
        await this.fetchProducts()
        this.SET_LOADING(false)
    }
}
</script>

<style scoped lang="scss">
.products {
    &-title {
        font-size: calc(var(--font-size) * 1.75);
        color: var(--color-black);
        font-weight: 600;
        display: flex;
        align-items: center;
        .icon {
            margin-left: 10px;
            margin-right: 20px;
            cursor: pointer;
        }
    }

    &-count {
        font-size: var(--font-size);
        color: var(--color-grey);
    }

    &-form {
        max-width: 1000px;
        margin-top: 30px;
        margin-bottom: 30px;

        .btn-wrapper {
            padding-top: 0;
            padding-bottom: 0;
        }

        .input-wrapper {
            margin-bottom: 0;
            flex-grow: 1;
        }
    }
}
</style>
