import { createWebHistory, createRouter } from 'vue-router'

import HelloWord from '../components/HelloWorld.vue'

const routes = [
    { path: '/test', component: HelloWord }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;