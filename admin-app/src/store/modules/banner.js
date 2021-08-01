import axiosInstance from '../../helper/axiosInstance';
import Pagination from '../../components/pagination/Pagination';
import router from '../../router/Router';
import $ from 'jquery';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useToast } from 'vue-toastification';

const toast = useToast();

const banner = {
    namespaced: true,
    state:{
        banners:[],
        banner:[],
        loading: false,
        page:'',
        pageLink:'',
		totalPages:'',
		store:[]
    },
    getters:{
        banners(state){
            return state.banners;
        },
        banner(state){
            return state.banner;
        }
    },
    actions:{
        async fetchBanners({commit}, page){
            try {
                commit('SET_LOADING', true);
                let { data: {response, count, perPage}} = await axiosInstance.get(`/all-banner/${page}`)
                commit('SET_BANNERS', response);
                const {  store, totalPages } = Pagination(page,count,perPage);
                commit('SET_PAGINATION', [page,totalPages,store]);
                commit('SET_LOADING', false);
            } catch (error) {
                console.log(error);
                commit('SET_LOADING', false);
            }
        },
        async createBanner({commit}, state){
            try {
                let { data: {message}} = await axiosInstance.post(`/create-banner`, state);
                toast.success(message);
                commit('');
                router.push('/admin/banner/all?page=1');
            } catch (error) {
                const errors = error.response.data.errors;
                if(Object.keys(errors).length > 0){
                    for(const error in errors){
                        toast.error(errors[error][0])
                    }
                }
            }
        },
        async fetchBanner({commit}, id){
            try {
                commit('SET_LOADING', true);
                let { data: {response}} = await axiosInstance.get(`/edit-banner/${id}`);
                commit('SET_SINGLE_BANNER', response);
                commit('SET_LOADING', false);
            } catch (error) {
                console.log(error);
                commit('SET_LOADING', false);
            }
        },
        async updateBanner({commit}, [state,id]){
            try {
                let { data: {message}} = await axiosInstance.post(`/update-banner/${id}`, state);
                toast.success(message);
                commit('');
                router.push('/admin/banner/all?page=1');
            } catch (error) {
                const errors = error.response.data.errors;
                if(Object.keys(errors).length > 0){
                    for(const error in errors){
                        toast.error(errors[error][0])
                    }
                }
            }
        },
        async deleteBanner({dispatch}, [id,page]){
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
                    let { data: {message}} = await axiosInstance.get(`/delete-banner/${id}`)
                    toast.success(message);
                    dispatch('fetchBanners', page);
                  } catch (error) {
                      console.log(error);
                  }
                }
              })
        },
        async statusAction(){
            $(document).on('click', '.updateBannerStatus', async function(){
                var banner_id = $(this).attr('data-banner');
                var status = $(this).children("i").attr("status");
                const formData = new FormData();
                formData.append('banner_id', banner_id);
                formData.append('status',status);
                try {
                    let { data: {status,banner_id}} = await axiosInstance.post(`/status-banner`, formData);
                    console.log(status,banner_id);
                    if(status == 0){
                        $('#banner-'+banner_id).html(`<i class='fas fa-toggle-off' aria-hidden='true' status=${status}></i>`);
                    }else{
                        $('#banner-'+banner_id).html(`<i class='fas fa-toggle-on' aria-hidden='true' status=${status}></i>`);
                    }
                } catch (error) {
                    console.log(error);
                }
            })
            
        }
    },
    mutations:{
         SET_BANNERS(state, payload){
             state.banners = payload;
         },
         SET_LOADING(state, payload){
             state.loading = payload;
         },
         SET_PAGINATION(state, [page,totalPages,store]){
			state.page = page;
            state.totalPages = totalPages;
            state.store = store;
            state.pageLink = '/admin/banner/all';
		},
        SET_SINGLE_BANNER(state, payload){
            state.banner = payload;
        }
    }
}
export default banner;