import { createWebHistory, createRouter } from 'vue-router'

import HelloWord from '../components/HelloWorld.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import Home from '../views/Home.vue'
import TransactionList from '../views/transaction/TransactionList.vue'
import TransactionCreate from '../views/transaction/TransactionCreate.vue'
import MainLayout from '../layouts/MainLayout.vue'
import { useAuthStore } from "../store/auth.store";


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
            },
            {
                path: 'create',
                component: TransactionCreate,
                name: 'TransactionCreate'
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
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    const authStore = useAuthStore();
    if (userLocalStorage) {
        // we need to check first if the access token is not yet expired
        const isValid = await authStore.validateToken()
        if (!isValid) {
            localStorage.removeItem('user');
            return next("/login");
        }
    }
    if (to.name == "login") {
        if (userLocalStorage) {
            return next("/");
        }
        next();
    } else {
        if (userLocalStorage == null) {
            return next("/login");
        }
        next();
    }
});

export default router;