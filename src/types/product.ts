export type Product = {
    account: string
    brand_id: number | string
    brand_name: string
    category_id: number | string
    category_name: string | null
    created: string
    discount: number | string
    id: number | string
    images: Array<string>
    is_removed: Boolean
    max_price: number | null
    min_price: number | null
    on_sale: Boolean
    price: number
    quantity: number
    remote_id: number | string
    sku: string
    strategy: null
    title: string
    undiscounted_price: number
    url: string
}

export interface IProductsState {
    count: number
    products: Product[]
    limit: number
    max_call_count: number
    call_count: number
}

export interface ProductErrorResponse {
    detail: string
    code: string
    messages: string[]
}

export type ProductsResponse = {
    count: number
    next: string
    results: Product[]
}
