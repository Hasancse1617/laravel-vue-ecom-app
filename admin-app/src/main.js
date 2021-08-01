import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router/Router';
import Toast, { POSITION  } from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'sweetalert2/dist/sweetalert2.min.css';



const token = localStorage.getItem('myToken');
if(token){
    store.dispatch('auth/user', token);
}else{
    store.dispatch('auth/logout');
}

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Toast,{position: POSITION.TOP_RIGHT})
app.mount('#app')