<template>
    <div class="login-box">
        <div class="login-logo">
            <a><b>Reset Password</b></a>
        </div>
        <!-- {/* /.login-logo */} -->
        <div class="card">
            <div class="card-body login-card-body">
            <p class="login-box-msg">You are only one step a way from your new password, recover your password now.</p>

            <form @submit.prevent="handleSubmit" method="post">
                <div class="input-group mb-3">
                <input type="password" name="password" v-model="state.password" class="form-control" placeholder="Password"/>
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                    </div>
                </div>
                </div>
                <div class="input-group mb-3">
                <input type="password" name="confirm_password" v-model="state.confirm_password" class="form-control" placeholder="Confirm Password"/>
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                    </div>
                </div>
                </div>
                <div class="row">
                <div class="col-12">
                    <button type="submit" class="btn btn-primary btn-block">Change password</button>
                </div>
                <!-- {/* /.col */} -->
                </div>
            </form>

            <p class="mt-3 mb-1">
                Already have an account? Please <router-link :to="{name: 'AdminLogin'}">Login !!!</router-link>
            </p>
            </div>
            <!-- {/* /.login-card-body */} -->
        </div>
        </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
   name: 'ResetPassword',
   data(){
       return{
           state:{
               password:'',
               confirm_password:''
           }
       }
   },
   methods:{
       ...mapActions({ResetPassword: 'auth/ResetPassword'}),
       handleSubmit(){
           console.log(this.state)
          const token = this.$route.params.token;
          this.ResetPassword([this.state,token]);
       }
   }
}
</script>

<style>

</style>