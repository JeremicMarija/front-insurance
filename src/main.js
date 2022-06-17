import { Vue, createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
const self = this;
axios.interceptors.request.use(
 (config) => {
  if(localStorage.getItem('Authorization')){
   config.headers['Authorization'] = `Bearer ${localStorage.getItem('Authorization')}`;
  }
  return config;
 },
 (error) => {
  return Promise.reject(error);
 });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
 // Do something with response data
 // console.log(response, 'response');
 return response;
}, function (error) {
 // Do something with response error
 //return self.$router.push('/login');
 localStorage.removeItem("Authorization");
 window.location.href = "login";
 return Promise.reject(error);
});






// Bootstrap CSS, JS
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

//Font Awesome Icons
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

import "./styles.css"

createApp(App).use(router).mount('#app')
