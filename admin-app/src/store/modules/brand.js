import axiosInstance from '../../helper/axiosInstance';
import Pagination from '../../components/pagination/Pagination';
// import router from '../../router/Router';
import $ from 'jquery';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useToast } from 'vue-toastification';

const toast = useToast();

const brand = {
    namespaced: true,
    state:{
        brands:[],
        brand:[],
        loading: false,
        page:'',
        pageLink:'',
		totalPages:'',
		store:[]
    },
    getters:{
        brands(state){
            return state.brands;
        },
        brand(state){
            return state.brand;
        }
    },
    actions:{
        async fetchBrands({commit}, page){
            try {
                commit('SET_LOADING', true);
                let { data: {response, count, perPage}} = await axiosInstance.get(`/all-brand/${page}`)
                commit('SET_BRANDS', response);
                const {  store, totalPages } = Pagination(page,count,perPage);
                commit('SET_PAGINATION', [page,totalPages,store]);
                commit('SET_LOADING', false);
            } catch (error) {
                console.log(error);
                commit('SET_LOADING', false);
            }
        },
        async createBrand({dispatch}, [state,page]){
            try {
                let { data: {message}} = await axiosInstance.post(`/create-brand`, state);
                toast.success(message);
                document.getElementById('close-modal').click();
                dispatch('fetchBrands', page);
            } catch (error) {
                const errors = error.response.data.errors;
                if(Object.keys(errors).length > 0){
                    for(const error in errors){
                        toast.error(errors[error][0])
                    }
                }
            }
        },
        async fetchBrand({commit}, id){
            try {
                // commit('SET_LOADING', true);
                let { data: {response}} = await axiosInstance.get(`/edit-brand/${id}`);
                commit('SET_SINGLE_BRAND', response);
                commit('SET_LOADING', false);
            } catch (error) {
                console.log(error);
                commit('SET_LOADING', false);
            }
        },
        async updateBrand({dispatch}, [state,page,id]){
            try {
                let { data: {message}} = await axiosInstance.post(`/update-brand/${id}`, state);
                toast.success(message);
                document.getElementById('edit-modal').click();
                dispatch('fetchBrands', page);
            } catch (error) {
                const errors = error.response.data.errors;
                if(Object.keys(errors).length > 0){
                    for(const error in errors){
                        toast.error(errors[error][0])
                    }
                }
            }
        },
        async deleteBrand({dispatch}, [id,page]){
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
                    let { data: {message}} = await axiosInstance.get(`/delete-brand/${id}`)
                    toast.success(message);
                    dispatch('fetchBrands', page);
                  } catch (error) {
                      console.log(error);
                  }
                }
              })
        },
        async statusAction(){
            $(document).on('click', '.updateBrandStatus', async function(){
                var brand_id = $(this).attr('data-brand');
                var status = $(this).children("i").attr("status");
                const formData = new FormData();
                formData.append('brand_id', brand_id);
                formData.append('status',status);
                try {
                    let { data: {status,brand_id}} = await axiosInstance.post(`/status-brand`, formData);
                    console.log(status,brand_id);
                    if(status == 0){
                        $('#brand-'+brand_id).html(`<i class='fas fa-toggle-off' aria-hidden='true' status=${status}></i>`);
                    }else{
                        $('#brand-'+brand_id).html(`<i class='fas fa-toggle-on' aria-hidden='true' status=${status}></i>`);
                    }
                } catch (error) {
                    console.log(error);
                }
            })
            
        }
    },
    mutations:{
         SET_BRANDS(state, payload){
             state.brands = payload;
         },
         SET_LOADING(state, payload){
             state.loading = payload;
         },
         SET_PAGINATION(state, [page,totalPages,store]){
			state.page = page;
            state.totalPages = totalPages;
            state.store = store;
            state.pageLink = '/admin/brand/all';
		},
        SET_SINGLE_BRAND(state, payload){
            state.brand = payload;
        }
    }
}
export default brand;