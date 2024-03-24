import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '@/views/Auth.vue'
import Home from '@/views/Home.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/auth',
            component: Auth
        },
        {
            path: '/',
            component: Home
        }
    ]
})

export default router
