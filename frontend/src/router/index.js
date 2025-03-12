import { createWebHistory, createRouter } from 'vue-router'

import HelloWord from '../components/HelloWorld.vue'
import Login from '../views/authentication/Login.vue'
import Home from '../views/Home.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/test', component: HelloWord },
    { path: '/login', component: Login },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    
    // const sessionStore = useSessionStore();
    // current page view title
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