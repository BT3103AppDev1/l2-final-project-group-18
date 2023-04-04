import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store.js'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import Chart from 'chart.js/auto'

// import './assets/main.css'

const app = createApp(App)

app.use(store).use(router)
    .use(VueChartkick, { adapter: Chart })
    .mount('#app')
