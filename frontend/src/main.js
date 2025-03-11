import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'

// vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const vuetify = createVuetify();

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')