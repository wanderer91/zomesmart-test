import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import type { IProductsState, ProductsResponse, Product } from '@/types/product'
import { useAuthStore } from '@/stores/auth'

export const useProductStore = defineStore('product', {
    state: (): IProductsState => ({ count: 0, products: [], limit: 10, max_call_count: 10, call_count: 0 }),
    actions: {
        async fetchProducts(offset: number = 0) {
            const { access_token, refreshToken } = useAuthStore()

            this.SET_CALL_COUNT(this.call_count + 1)
            const res = await (<Promise<AxiosResponse>>axios.get(
                `${import.meta.env.VITE_API_HOST}api/product/?limit=${this.limit}${offset ? `&offset=${offset}` : ''}`,
                {
                    headers: {
                        Authorization: `JWT ${access_token}`
                    }
                }
            ))
                .then((res: AxiosResponse) => {
                    const resData: ProductsResponse = res.data
                    this.SET_PRODUCTS(resData.results, resData.count)
                    this.SET_CALL_COUNT(0)
                })
                .catch(async (reason) => {
                    if (this.call_count >= this.max_call_count) {
                        this.SET_CALL_COUNT(0)
                        return
                    }

                    if (reason.response.status === 401) {
                        await refreshToken()
                        this.fetchProducts()
                    }
                })
        },
        SET_PRODUCTS(products: Product[], count: number) {
            this.products = products
            this.count = count
        },
        SET_PRODUCT(num: number, product: Product) {
            this.products[num] = product
        },
        SET_PRODUCT_MIN_PRICE(num: number, value: number | null) {
            const product: Product = this.products[num]
            product.min_price = value
            this.SET_PRODUCT(num, product)
        },
        SET_PRODUCT_MAX_PRICE(num: number, value: number | null) {
            const product: Product = this.products[num]
            product.max_price = value
        },
        SET_CALL_COUNT(count: number = 0) {
            this.call_count = count
        }
    }
})
