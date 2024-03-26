import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '@/views/Auth.vue'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import { useAppStore } from '@/stores'
import type { RouteLocationNormalized } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/auth',
            component: Auth,
            name: 'auth'
        },
        {
            path: '/',
            component: Home,
            name: 'home'
        },
        {
            path: '/:notFound',
            component: NotFound,
            name: 'not_found'
        }
    ]
})

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const { is_guest } = useAppStore()
    if (is_guest && to.name !== 'auth') {
        return '/auth'
    }
})

export default router
