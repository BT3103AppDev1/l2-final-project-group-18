import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store.js'

// import './assets/main.css'

const app = createApp(App)

app.use(store).use(router).mount('#app')
