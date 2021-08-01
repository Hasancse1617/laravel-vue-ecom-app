<template>
   <div class="content-wrapper">
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="float-left">All Banner</h4>
                    <h3><router-link to="/admin/banner/create"><button type="button" class="btn btn-primary float-right text-bold">Add Banner</button></router-link></h3>
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Banner Title</th>
                        <th>Banner Image</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody v-if="!loading">
                          <tr v-for="(banner,index) in banners" :key="banner.id">
                          <td>{{ index+1}}</td>
                          <td>{{ banner.title }}</td>
                          <td><img width="100" height="100" :src="`${api_path}/images/banner_images/${banner.image}`"/></td>
                          <td> 
                                <a v-if="banner.status === 1" class="updateBannerStatus" :data-banner="banner.id" :id="`banner-${banner.id}`" @click="bannerStatus" href="javascript:void(0)"> <i class="fas fa-toggle-on" :status="banner.status" aria-hidden="true"></i></a>
                                <a v-else class="updateBannerStatus" :data-banner="banner.id" :id="`banner-${banner.id}`" @click="bannerStatus" href="javascript:void(0)"> <i class="fas fa-toggle-off" :status="banner.status" aria-hidden="true"></i> </a> 
                          </td>
                          <td>
                            <router-link :to="`/admin/banner/edit/${banner.id}`" ><button class="text-success" ><i class="fas fa-edit"></i></button></router-link>&nbsp;
                            <button @click="deleteAction(banner.id)" class="text-danger"><i class="fas fa-trash"></i></button>&nbsp;
                          </td>
                        </tr>
                      </tbody>
                      <Loader v-else></Loader>
                    </table>
                    
                  </div>
                </div>
                </div>
              </div>
            </div>
           <Pagination v-if="!loading && totalPages > 1" :page="page" :totalPages="totalPages" :store="store" :pageLink="pageLink" />
        </section>
        </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Loader from '../loader/Loader.vue';
import Pagination from '../pagination/Pagination.vue';

export default {
   name: 'Banner',
   components:{
       Pagination,
       Loader,
   },
   data(){
       return{
           api_path: process.env.VUE_APP_API_PATH,
       }
   },
   mounted(){
       this.fetchBanners(this.$route.query.page);
   },
   computed:{
       ...mapState('banner',['loading','page','totalPages','store','pageLink']),
       ...mapGetters({banners: 'banner/banners'}),
   },
   watch:{
       '$route' (){
         this.fetchBanners(this.$route.query.page)
       }
   },
   methods:{
       ...mapActions({fetchBanners: 'banner/fetchBanners', deleteBanner: 'banner/deleteBanner', statusAction: 'banner/statusAction'}),
       deleteAction(id){
           this.deleteBanner([id,this.$route.query.page]);
       },
       bannerStatus(){
          this.statusAction();
       }
   }
}
</script>

<style>

</style>