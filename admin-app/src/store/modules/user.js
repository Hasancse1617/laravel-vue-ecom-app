import axiosInstance from '../../helper/axiosInstance';
import router from '../../router/Router'
import { useToast } from 'vue-toastification'
import Pagination from '../../components/pagination/Pagination';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import store from '../../store';
const toast = useToast();

const user = {
    namespaced: true,
    state:{
        users:[],
        user:[],
        message:'',
        loading: false,
        page:'',
        pageLink:'',
		totalPages:'',
		store:[]
    },
    getters:{
        users(state){
            return state.users;
        },
        message(state){
            return state.message;
        },
        user(state){
            return state.user;
        }
    },
    actions:{
        async AllUser({commit}, page){
            try{
                commit('SET_LOADING', true);
                let { data: {response, count, perPage}} = await axiosInstance.get(`/all-user/${page}`)
                commit('SET_USERS', response);

                const {  store, totalPages } = Pagination(page,count,perPage);

                commit('SET_PAGINATION', [page,totalPages,store]);
                commit('SET_LOADING', false);
            }catch(error){
                console.log(error.response.data.errors);
                commit('SET_LOADING', false);
            }     
        },
        async createUser({commit}, state){
             try {
                let {data: {message}} = await axiosInstance.post('/create-user',state);
                toast.success(message);
                commit('')
                router.push('/admin/user/all?page=1');
             } catch (error) {
                const errors = error.response.data.errors;
                if(Object.keys(errors).length > 0){
                    for(const error in errors){
                        toast.error(errors[error][0])
                    }
                }
             }
        },
        async fetchUser({commit},id){
            try {
                commit('SET_LOADING', true);
                let {data: {response}} = await axiosInstance.get(`/edit-user/${id}`);
                commit('SET_SINGLE_USER', response);
                commit('SET_LOADING', false);
            } catch (error) {
                commit('SET_LOADING', false);
                console.log(error);
            }
        },
        async updateUser({commit}, [state,id]){
            try {
                let {data: {message}} = await axiosInstance.post(`/update-user/${id}`, state);
                toast.success(message);
                commit('');
                const token = localStorage.getItem('myToken');
                store.dispatch('auth/user',token);
                router.push({name: 'AdminDashboard'});
            } catch (error) {
                const errors = error.response.data.errors;
                if(Object.keys(errors).length > 0){
                    for(const error in errors){
                        toast.error(errors[error][0])
                    }
                }
            }
        },
        async updatePassword({commit}, [state,id]){
            try {
                let {data: {message}} = await axiosInstance.post(`/update-user-password/${id}`, state);
                toast.success(message);
                commit('')
                router.push({name: 'AdminDashboard'});
            } catch (error) {
                const errors = error.response.data.errors;
                if(Object.keys(errors).length > 0){
                    for(const error in errors){
                        toast.error(errors[error][0])
                    }
                }
            }
        },
        async deleteUser({dispatch}, [id,page]){
             Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then(async(result) => {
                if (result.isConfirmed) {
                  try {
                    let { data: {message}} = await axiosInstance.get(`/delete-user/${id}`)
                    toast.success(message);
                    dispatch('AllUser', page);
                  } catch (error) {
                      console.log(error);
                  }
                }
              })
        }
    },
    mutations:{
        SET_USERS(state,payload){
             state.users = payload;
        },
		SET_PAGINATION(state, [page,totalPages,store]){
			state.page = page;
            state.totalPages = totalPages;
            state.store = store;
            state.pageLink = '/admin/user/all';
		},
        SET_LOADING(state, payload){
            state.loading = payload;
        },
        SET_SINGLE_USER(state, payload){
            state.user = payload;
        }
    }
}
export default user;