import axiosInstance from '../../helper/axiosInstance';
import Pagination from '../../components/pagination/Pagination';
import router from '../../router/Router';
import $ from 'jquery';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useToast } from 'vue-toastification';

const toast = useToast();

const category = {
    namespaced: true,
    state:{
        parent_categories:[],
        categories:[],
        category:[],
        loading: false,
        page:'',
        pageLink:'',
		totalPages:'',
		store:[]
    },
    getters:{
        parent_categories(state){
            return state.parent_categories;
        },
        categories(state){
            return state.categories;
        },
        category(state){
            return state.category;
        }
    },
    actions:{
        async fetchCategories({commit}, page){
            try {
                commit('SET_LOADING', true);
                let { data: {response, count, perPage}} = await axiosInstance.get(`/all-category/${page}`)
                commit('SET_CATEGORIES', response);
                const {  store, totalPages } = Pagination(page,count,perPage);
                commit('SET_PAGINATION', [page,totalPages,store]);
                commit('SET_LOADING', false);
            } catch (error) {
                console.log(error);
                commit('SET_LOADING', false);
            }
        },
        async fetchParents({commit}){
            try {
                let { data: {response}} = await axiosInstance.get(`/parent-categories`);
                commit('SET_PARENTS', response);
            } catch (error) {
                console.log(error);
            }
        },
        async createCategory({commit}, state){
            try {
                let { data: {message}} = await axiosInstance.post(`/create-category`, state);
                toast.success(message);
                commit('');
                router.push('/admin/category/all?page=1');
            } catch (error) {
                const errors = error.response.data.errors;
                if(Object.keys(errors).length > 0){
                    for(const error in errors){
                        toast.error(errors[error][0])
                    }
                }
            }
        },
        async fetchCategory({commit}, id){
            try {
                commit('SET_LOADING', true);
                let { data: {response}} = await axiosInstance.get(`/edit-category/${id}`);
                commit('SET_SINGLE_CATEGORY', response);
                commit('SET_LOADING', false);
            } catch (error) {
                console.log(error);
                commit('SET_LOADING', false);
            }
        },
        async updateCategory({commit}, [state,id]){
            try {
                let { data: {message}} = await axiosInstance.post(`/update-category/${id}`, state);
                toast.success(message);
                commit('');
                router.push('/admin/category/all?page=1');
            } catch (error) {
                const errors = error.response.data.errors;
                if(Object.keys(errors).length > 0){
                    for(const error in errors){
                        toast.error(errors[error][0])
                    }
                }
            }
        },
        async deleteCategory({dispatch}, [id,page]){
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
                    let { data: {message}} = await axiosInstance.get(`/delete-category/${id}`)
                    toast.success(message);
                    dispatch('fetchCategories', page);
                  } catch (error) {
                      console.log(error);
                  }
                }
              })
        },
        async statusAction(){
            $(document).on('click', '.updateCategoryStatus', async function(){
                var category_id = $(this).attr('data-category');
                var status = $(this).children("i").attr("status");
                const formData = new FormData();
                formData.append('category_id', category_id);
                formData.append('status',status);
                try {
                    let { data: {status,category_id}} = await axiosInstance.post(`/status-category`, formData);
                    console.log(status,category_id);
                    if(status == 0){
                        $('#category-'+category_id).html(`<i class='fas fa-toggle-off' aria-hidden='true' status=${status}></i>`);
                    }else{
                        $('#category-'+category_id).html(`<i class='fas fa-toggle-on' aria-hidden='true' status=${status}></i>`);
                    }
                } catch (error) {
                    console.log(error);
                }
            })
            
        }
    },
    mutations:{
         SET_CATEGORIES(state, payload){
             state.categories = payload;
         },
         SET_LOADING(state, payload){
             state.loading = payload;
         },
         SET_PAGINATION(state, [page,totalPages,store]){
			state.page = page;
            state.totalPages = totalPages;
            state.store = store;
            state.pageLink = '/admin/category/all';
		},
        SET_SINGLE_CATEGORY(state, payload){
            state.category = payload;
        },
        SET_PARENTS(state, payload){
            state.parent_categories = payload;
        }
    }
}
export default category;