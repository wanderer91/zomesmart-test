<template lang="pug">
    .product-table
        table
            thead
                tr
                    th(class='product-cell product-table-header')
                        CInput(
                            type='checkbox'
                            :half_checked="!!all_selected && !!selected.length && selected.length !== products.length"
                            :checked="all_selected || products.length === selected.length"
                            v-model="all_selected"
                            )
                    th(class='product-cell product-table-header') Images
                    th(class='product-cell product-table-header') Remote ID
                    th(class='product-cell product-brand-cell product-table-header')
                        span Brand
                        CIcon(type='grey-arrow')
                    th(class='product-cell product-title-cell product-table-header') Title
                    th(class='product-cell product-table-header')
                        span Quantity
                        CIcon(type='grey-arrow')
                    th(class='product-cell product-table-header')
                        span Price
                        CIcon(type='grey-arrow')
                    th(class='product-cell product-table-header')
                        span Min Price
                        CIcon(type='grey-arrow')
                    th(class='product-cell product-table-header')
                        span Max Price
                        CIcon(type='grey-arrow')
                    th(class='product-cell product-table-header') Remove
                tr(v-if="selected.length" class='product product-actions')
                    th(colspan='4' class='product-cell product-actions-cell product-summary-cell')
                        span Выбрано {{ selected.length }} из {{ products.length }}
                        CLink(
                            color='grey'
                            :bold="true"
                            @click="removeSelected"
                            :anchor="true"
                            icon='bold-delete'
                            :ignore_hover="true"
                            :back_color="true"
                            )
                            template(#content) Удалить выделенные
                    th(colspan='3' class='product-cell product-actions-cell product-actions-cell-selected')
                        span Для всех выделенных
                    th(class='product-cell product-actions-cell')
                        CInput(size='small' placeholder='₽' mask="\\d|\\." v-model="new_min_price" :value="new_min_price")
                    th(class='product-cell product-actions-cell')
                        CInput(size='small' placeholder='₽' mask="\\d|\\." v-model="new_max_price" :value="new_max_price")
                    th(class='product-cell product-actions-cell')    
            tbody        
                tr(v-for="(pr, i) in products" class='product' :key="`product_${i + 1}`")
                    td(class='product-cell')
                        CInput(
                            type='checkbox'
                            @update:model-value="val => toggleProduct(val, i + 1)"
                            :init_value="i + 1"
                            :checked="selected.includes(i + 1)"
                            )
                    td(class='product-cell')
                        img(:src="pr?.images[0] || ''" class='product-image')
                    td(class='product-cell')  {{ pr?.remote_id || '' }}  
                    td(class='product-cell product-brand-cell' :title="pr?.brand_name || ''")  {{ pr?.brand_name || '' }}
                    td(class='product-cell product-title-cell' :title="pr?.title || ''")  {{ pr?.title || '' }}
                    td(class='product-cell')  {{ pr?.quantity || 0 }}
                    td(class='product-cell')  {{ pr.price ? `${pr.price.toLocaleString('ru')} ₽` : '' }}
                    td(class='product-cell')  
                        CInput(
                            size='small'
                            placeholder='₽'
                            mask="\\d|\\."
                            :value="pr.min_price"
                            v-model="pr.min_price"
                            )
                    td(class='product-cell')
                        CInput(
                            size='small'
                            placeholder='₽'
                            mask="\\d|\\."
                            :value="pr.max_price"
                            )
                    td(class='product-cell')
                        CIcon(type='delete')
        .product-pagination(v-if="count > limit")
            CLink(
                @click="pageChanged(page - 1)"
                class='product-page product-page-prev'
                :class="{'hidden': page === 1}"
                :anchor="true"
                )
                template(#content)
                    CIcon(type='left-arrow')
            CLink(
                v-for="index in max_pages" class="product-page"
                :class="{'active': index === page}" 
                @click="pageChanged(index)"
                :anchor="true"
                )
                template(#content) {{ index }}
            CLink(
                @click="pageChanged(page + 1)"
                class='product-page product-page-next'
                :anchor="true"
                :class="{'hidden': page === max_pages}"
                )
                template(#content)
                    CIcon(type='right-arrow')
</template>

<script lang="ts">
import { useProductStore } from '@/stores/product'
import { useAppStore } from '@/stores/app'
import { mapState, mapActions } from 'pinia'
import CIcon from '@/components/ui/CIcon.vue'
import CLink from '@/components/ui/CLink.vue'
import CInput from '@/components/ui/CInput.vue'

export default {
    components: {
        CIcon,
        CLink,
        CInput
    },
    data() {
        return {
            page: 1,
            selected: [] as Array<number>,
            all_selected: false,
            new_min_price: '',
            new_max_price: ''
        }
    },
    methods: {
        ...mapActions(useProductStore, ['fetchProducts', 'SET_PRODUCT_MIN_PRICE', 'SET_PRODUCT_MAX_PRICE']),
        ...mapActions(useAppStore, ['SET_LOADING']),
        async pageChanged(page: number = 1) {
            if (this.page === page) {
                return
            }

            this.page = page
            this.all_selected = false

            this.SET_LOADING(true)
            await this.fetchProducts(this.limit * (page - 1))
            this.SET_LOADING(false)
        },
        toggleProduct(val: number, num: number) {
            if (val) {
                this.selected.push(num)
            } else {
                const numIndex = this.selected.findIndex((n) => n === num)
                this.selected.splice(numIndex, 1)
            }

            if (!this.selected.length) {
                this.all_selected = false;
            }
        },
        removeSelected() {
            console.log(`Удалены элементы: [${this.selected.join(', ')}]`)
        }
    },
    computed: {
        ...mapState(useProductStore, ['products', 'count', 'limit']),
        max_pages(): number {
            return Math.ceil(this.count / this.limit)
        }
    },
    watch: {
        new_min_price(val: number | null) {
            this.selected.map((num) => {
                this.SET_PRODUCT_MIN_PRICE(num - 1, val)
            })
        },
        new_max_price(val: number | null) {
            this.selected.map((num) => {
                this.SET_PRODUCT_MAX_PRICE(num - 1, val)
            })
        },
        all_selected(val: boolean) {
            this.all_selected = val
            if (val) {
                this.selected = new Array(this.products.length).fill(0).map((n, i) => i + 1)
            } else {
                this.selected.splice(0)
            }
        }
    }
}
</script>

<style scoped lang="scss">
.product {
    border-bottom: 1px solid var(--color-black-033);

    &-actions {
        border-top: 1px solid var(--color-black-033);
        background-color: var(--color-third-grey);

        &-cell {
            font-weight: 400;
            text-align: left;

            &-selected {
                text-align: right;
            }
        }
    }

    &-summary-cell {
        padding-left: 20px;

        .link {
            margin-left: 10px;
        }
    }

    &-brand-cell,
    &-title-cell {
        width: 390px;
        max-width: 390px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &-brand-cell {
        width: 120px;
        max-width: 120px;
    }

    &-image {
        max-width: 50px;
    }

    &-cell {
        padding-top: 6px;
        padding-bottom: 6px;
        padding-right: 20px;
        vertical-align: middle;
        height: 60px;
        white-space: nowrap;
    }

    &-table {
        table {
            border-collapse: collapse;
            width: 100%;
        }

        &-header {
            color: var(--color-grey);
            font-weight: 400;
            text-align: left;

            .icon {
                position: relative;
                top: -2px;
                margin-left: 8px;
                display: inline-block;
            }
        }

        .input-wrapper {
            margin-bottom: 0;
        }
    }

    &-pagination {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &-page {
        border-radius: 6px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all var(--transition-duration) ease-in-out;

        &:link,
        &:active,
        &:hover,
        &:visited {
            color: var(--color-black) !important;
        }

        &:hover {
            background-color: var(--color-second-light-grey);
        }

        &.active,
        &:active {
            background-color: var(--color-third-grey);
        }

        &.hidden {
            visibility: hidden;
            position: relative;
            opacity: 0;
            left: -9999px;
        }
    }
}
</style>
