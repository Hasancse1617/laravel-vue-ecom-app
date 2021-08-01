<template>
        <div class="login-box">

        <div class="login-logo">
            <a href=""><b>Forgot Password</b></a>
        </div>
        <!-- {/* /.login-logo */} -->
        <div class="card">
        <div class="card-body login-card-body">
        <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>

        <form @submit.prevent="handleSubmit" >
            <div class="input-group mb-3">
            <input type="email" name="email" v-model="state.email" class="form-control" placeholder="Email"/>
            <div class="input-group-append">
                <div class="input-group-text">
                <span class="fas fa-envelope"></span>
                </div>
            </div>
            </div>
            <div class="row">
            <div class="col-12">
                <button type="submit" class="btn btn-primary btn-block">Request new password</button>
            </div>
            </div>
        </form>

        <p class="mt-3 mb-1">
            Already have an account? Please <router-link :to="{name: 'AdminLogin'}">Login !!!</router-link>
        </p>
        </div>
    </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
   name: 'ForgotPassword',
   data(){
       return{
           state:{
               email:''
           }
       }
   },
   methods:{
      ...mapActions({ForgotPassword: 'auth/ForgotPassword'}),
      handleSubmit(){
          this.ForgotPassword(this.state)
          this.state.email='';
      }
   }
}
</script>

<style>

</style>