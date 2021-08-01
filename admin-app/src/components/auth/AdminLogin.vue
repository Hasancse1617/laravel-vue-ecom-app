<template>
    <div class="login-box">
            <!-- <Helmet>
                <title>User Login - Movie</title>
                <meta name="description" content="User Login Here" />
            </Helmet> -->
            <div class="login-logo">
                <a href="../../index2.html"><b>Admin Panel</b></a>
            </div>
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg"> 
                    Sign In
                 </p>
                
                <form @submit="login">
                    <div class="input-group mb-3">
                    <input type="email" name="email" class="form-control" v-model="user.email" placeholder="Email"/>
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="password" name="password" class="form-control" v-model="user.password" placeholder="Password"/>
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                        </div>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-8">
                        <div class="icheck-primary">
                        <input type="checkbox" v-model="user.remember_me" name="remember_me" id="remember"/>
                        <label for="remember">
                            Remember Me
                        </label>
                        </div>
                    </div>
                    <!-- {/* /.col */} -->
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                    </div>
                    <!-- {/* /.col */} -->

                    </div>
                    
                </form>

                <!-- {/* <div class="social-auth-links text-center mb-3">
                    <p>- OR -</p>
                    <FacebookLogin
                        appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                        autoLoad={false}
                        callback={responseFacebook}
                        render={renderProps => (
                            <button className="btn btn-block btn-success" onClick={renderProps.onClick}><i class="fab fa-facebook mr-2"></i>  Facebook</button>
                        )}
                        />
                     <GoogleLogin
                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                        render={renderProps => (
                        <button className="btn btn-block btn-primary" onClick={renderProps.onClick} disabled={renderProps.disabled}><i class="fab fa-google mr-2"></i>  Google</button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
                /.social-auth-links */} -->

                <p class="mb-1">
                    <router-link :to="{ name: 'ForgotPassword' }">I forgot my password</router-link>
                </p>
                </div>
                <!-- {/* /.login-card-body */} -->
            </div>
        </div>
</template>

<script>
import { mapActions } from 'vuex';

export default{
    name: 'AdminLogin',
    data(){
        return{
            user:{
                email: '',
                password: '',
                remember_me: false
            }
        }
    },
    methods:{
        ...mapActions({LoginUser:'auth/LoginUser'}),
        login(e){
            e.preventDefault();
            this.LoginUser(this.user);
        }
    }
}
</script>
