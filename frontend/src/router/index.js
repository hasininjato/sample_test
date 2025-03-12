import { createWebHistory, createRouter } from 'vue-router'

import HelloWord from '../components/HelloWorld.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import Home from '../views/Home.vue'
import TransactionList from '../views/transaction/TransactionList.vue'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                component: Home,
                name: 'Home'
            }
        ]
    },
    {
        path: '/transaction',
        component: MainLayout,
        children: [
            {
                path: 'list',
                component: TransactionList,
                name: 'TransactionList'
            }
        ]
    },
    { path: '/test', component: HelloWord },
    { path: '/login', component: Login, name: "login" },
    { path: '/register', component: Register, name: "register" },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    document.title = 'Sample app test';
    next();
    // Scroll page to top on every route change
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});

export default router;