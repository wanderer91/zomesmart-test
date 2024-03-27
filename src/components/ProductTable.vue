<template lang="pug">
    .product-table
        table
            tr
                th(class='product-cell product-table-header')
                th(class='product-cell product-table-header') Images
                th(class='product-cell product-table-header') Remote ID
                th(class='product-cell product-table-header')
                    span Brand
                    CIcon(type='grey-arrow')
                th(class='product-cell product-table-header') Title
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
            tr(v-for="pr in products" class='product')
                td(class='product-cell')
                td(class='product-cell')
                    img(:src="pr?.images[0] || ''" class='product-image')
                td(class='product-cell')  {{ pr?.remote_id || '' }}  
                td(class='product-cell')  {{ pr?.brand_name || '' }}
                td(class='product-cell')  {{ pr?.title || '' }}
                td(class='product-cell')  {{ pr?.quantity || 0 }}
                td(class='product-cell')  {{ pr?.price || 0 }}
                td(class='product-cell')  {{ pr?.min_price || 0 }}
                td(class='product-cell')  {{ pr?.max_price || 0 }}
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

export default {
    components: {
        CIcon,
        CLink
    },
    data() {
        return {
            page: 1
        }
    },
    methods: {
        ...mapActions(useProductStore, ['fetchProducts']),
        ...mapActions(useAppStore, ['SET_LOADING']),
        async pageChanged(page: number = 1) {
            if (this.page === page) {
                return
            }

            this.page = page

            this.SET_LOADING(true)
            await this.fetchProducts(this.limit * (page - 1))
            this.SET_LOADING(false)
        }
    },
    computed: {
        ...mapState(useProductStore, ['products', 'count', 'limit']),
        max_pages(): number {
            return Math.ceil(this.count / this.limit)
        }
    }
}
</script>

<style scoped lang="scss">
.product {
    border-bottom: 1px solid var(--color-black-033);

    &-image {
        max-width: 50px;
    }

    &-cell {
        padding-top: 6px;
        padding-bottom: 6px;
        padding-right: 10px;
        vertical-align: middle;
        height: 60px;
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
            color: var(--color-black);
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
