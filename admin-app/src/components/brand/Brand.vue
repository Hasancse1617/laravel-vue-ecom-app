<template>
    <div class="content-wrapper">
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 class="float-left">All Brand</h4>
                    <h3><button type="button" class="btn btn-primary float-right text-bold" data-toggle="modal" data-target="#exampleModal">Add Brand</button></h3>
                    <AddModal/>
                </div>
                <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>SL.</th>
                        <th>Brand Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody v-if="!loading">
                        <tr v-for="(brand,index) in brands" :key="brand.id">
                        <td>{{ index+1 }}</td>
                        <td>{{ brand.name }}</td>
                        <td>
                            <a v-if="brand.status === 1" class="updateBrandStatus" :data-brand="brand.id" :id="`brand-${brand.id}`" @click="brandStatus" href="javascript:void(0)"> <i class="fas fa-toggle-on" :status="brand.status" aria-hidden="true"></i></a>
                            <a v-else class="updateBrandStatus" :data-brand="brand.id" :id="`brand-${brand.id}`" @click="brandStatus" href="javascript:void(0)"> <i class="fas fa-toggle-off" :status="brand.status" aria-hidden="true"></i> </a> 
                        </td>
                        <td>
                            <button :id="brand.id" @click="editAction(brand.id)" type="button" data-toggle="modal" data-target="#editModal" class="text-success"><i class="fas fa-edit"></i></button>
                            &nbsp;&nbsp;
                            <button @click="deleteAction(brand.id)" class="text-danger"><i class="fas fa-trash"></i></button>
                        </td>
                        </tr>
                    <EditModal/>
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
import AddModal from './AddModal.vue';
import EditModal from './EditModal.vue';
import { mapActions,mapGetters,mapState } from 'vuex';
import Loader from '../loader/Loader.vue';
import Pagination from '../pagination/Pagination.vue';

export default {
   name: 'Brand',
   components:{
       AddModal,
       EditModal,
       Pagination,
       Loader,
   },
   mounted(){
       this.fetchBrands(this.$route.query.page);
   },
   computed:{
       ...mapState('brand',['loading','page','totalPages','store','pageLink']),
       ...mapGetters({brands: 'brand/brands'}),
   },
   watch:{
       '$route' (){
         this.fetchBrands(this.$route.query.page)
       }
   },
   methods:{
       ...mapActions({fetchBrands: 'brand/fetchBrands', fetchBrand: 'brand/fetchBrand', deleteBrand: 'brand/deleteBrand', statusAction: 'brand/statusAction'}),
       editAction(id){
           this.fetchBrand(id);
       },
       deleteAction(id){
           this.deleteBrand([id,this.$route.query.page]);
       },
       brandStatus(){
          this.statusAction();
       }
   }
}
</script>

<style>

</style>