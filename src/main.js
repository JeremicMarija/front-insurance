import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



// Bootstrap CSS, JS
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

//Font Awesome Icons
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

import "./styles.css"

createApp(App).use(store).use(router).mount('#app')
