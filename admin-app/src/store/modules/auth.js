import axiosInstance from '../../helper/axiosInstance';
import axios from 'axios';
import router from '../../router/Router'
import { useToast } from 'vue-toastification'

const toast = useToast();

const auth = {
    namespaced: true,
    state:{
         user:{},
         token:null,
         errors:{},
         message:'',
         loading: false,
    },
    getters:{
        user(state){
            return state.user;
        },
        errors(state){
            return state.errors;
        },
        message(state){
            return state.message;
        }
    },
    actions:{
        async LoginUser({commit,dispatch},data){
            try{
                let res = await axiosInstance.post('/login',data)
                dispatch('user', res.data.token);
                if(res.data.success===true){
                    localStorage.setItem('myToken',res.data.token);
                    router.push('/admin/dashboard');
                }
                commit('SET_ERRORS',{});
                commit('SET_MESSAGE','')

            }catch(error){
                  console.log(error.response.data.errors);
                  const errors = error.response.data.errors;
                    if(Object.keys(errors).length > 0){
                        for(const error in errors){
                            toast.error(errors[error][0])
                        }
                    }
                  commit('SET_ERRORS', error.response.data.errors)
                  commit('SET_MESSAGE','')
            }
                
        },
       async user({commit}, token){
           commit('SET_LOADING', true);
           commit('SET_TOKEN', token);
           try{
               let resp = await axiosInstance.get('/user');
               commit('SET_USER', resp.data.user);
               commit('SET_LOADING', false);
            }catch(err){
                console.log(err);
                commit('SET_TOKEN', null);
                commit('SET_USER', {});
                commit('SET_LOADING', false);
           }
		},
        async logout({commit}){
            commit('SET_TOKEN', null);
            commit('SET_USER', {});
            router.push({name:'AdminLogin'});
        },
        async ForgotPassword({ commit }, data){
            try {
                let { data: {message} } = await axios.post(`${process.env.VUE_APP_API_PATH}/api/admin/forgot-password`,data)
                commit('SET_MESSAGE', message);
                toast.success(message);
            } catch (error) {
                const errors = error.response.data.errors;
                if(Object.keys(errors).length > 0){
                    for(const error in errors){
                        toast.error(errors[error][0])
                    }
                }
            }
        },
        async ResetPassword({commit}, [data, token]){
            try {
                let { data: {message} } = await axios.post(`${process.env.VUE_APP_API_PATH}/api/admin/reset-password/${token}`,data)
                commit('SET_MESSAGE', message);
                toast.success(message);
                router.push({name:'AdminLogin'});
            } catch (error) {
                const errors = error.response.data.errors;
                if(Object.keys(errors).length > 0){
                    for(const error in errors){
                        toast.error(errors[error][0])
                    }
                }
            }
        }
    },
    mutations:{
         SET_USER(state,user){
             state.user = user;
         },
         SET_TOKEN(state,token){
             state.token = token;
         },
         SET_ERRORS(state,payload){
             state.errors = payload;
             console.log(payload);
         },
         SET_MESSAGE(state,payload){
             state.message=payload
         },
         SET_LOADING(state,payload){
             state.loading=payload
         }
    }
}
export default auth;