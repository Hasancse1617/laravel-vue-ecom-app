<template>
  <div class="wrapper">
    <Header v-if="$route.name !== 'AdminLogin' && $route.name !== 'ForgotPassword' && $route.name !== 'ResetPassword'"></Header>
    <Sidebar v-if="$route.name !== 'AdminLogin' && $route.name !== 'ForgotPassword' && $route.name !== 'ResetPassword'"></Sidebar>
    <router-view></router-view>
    <Footer v-if="$route.name !== 'AdminLogin' && $route.name !== 'ForgotPassword' && $route.name !== 'ResetPassword'"></Footer>
  </div>
</template>

<script>
import Header from './components/layouts/Header.vue';
import Footer from './components/layouts/Footer.vue';
import Sidebar from './components/layouts/Sidebar.vue';

export default {
  name: 'App',
  components: {
     Header,
     Footer,
     Sidebar,
  }
}
</script>

<style>
.login-box, .register-box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 17%);
}
.card {
  margin-top: 1rem;
}
aside.main-sidebar.sidebar-dark-primary {
    background-color: #0B5345;
    position: fixed;
}
.sidebar {
  height: calc(100vh - (3.5rem + 1px));
}
nav.main-header {
  background-color: #bad4b6;
}
.bg-info {
  background-color: #18616d!important;
}
.bg-warning {
  background-color: #c59e28!important;
}
.bg-success {
  background-color: #188430!important;
}
.bg-danger {
  background-color: #a0202c!important;
}

/* width */
.sidebar::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.sidebar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
.sidebar::-webkit-scrollbar-thumb {
  background: hsl(192, 100%, 35%); 
  border-radius: 10px;
}

/* Handle on hover */
.sidebar::-webkit-scrollbar-thumb:hover {
  background: hsla(192, 100%, 35%, 0.596); 
}
input[type=checkbox], input[type=radio] {
  margin-top: 12px;
}

</style>
