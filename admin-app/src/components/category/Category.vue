<template>
  <div class="content-wrapper">
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="float-left">All Category</h4>
                    <h3><router-link to="/admin/category/create"><button type="button" class="btn btn-primary float-right text-bold">Add Category</button></router-link></h3>
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Category Name</th>
                        <th>Parent Category</th>
                        <th>Category Url</th>
                        <th>Category Image</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody v-if="!loading">
                          <tr v-for="(category,index) in categories" :key="category.id">
                          <td>{{ index+1}}</td>
                          <td>{{ category.category_name }}</td>
                          <td>{{ category.parentcategory ? category.parentcategory.category_name : 'Root' }}</td>
                          <td>{{ category.url }}</td>
                          <td><img width="100" height="100" :src="`${api_path}/images/category_images/${category.category_image}`"/></td>
                          <td>
                                <a v-if="category.status === 1" class="updateCategoryStatus" :data-category="category.id" :id="`category-${category.id}`" @click="categoryStatus" href="javascript:void(0)"> <i class="fas fa-toggle-on" :status="category.status" aria-hidden="true"></i></a>
                                <a v-else class="updateCategoryStatus" :data-category="category.id" :id="`category-${category.id}`" @click="categoryStatus" href="javascript:void(0)"> <i class="fas fa-toggle-off" :status="category.status" aria-hidden="true"></i> </a> 
                          </td>
                          <td>
                            <router-link :to="`/admin/category/edit/${category.id}`" ><button class="text-success" ><i class="fas fa-edit"></i></button></router-link>&nbsp;
                            <button @click="deleteAction(category.id)" class="text-danger"><i class="fas fa-trash"></i></button>&nbsp;
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
import { mapActions, mapState, mapGetters } from 'vuex';
import Loader from '../loader/Loader.vue';
import Pagination from '../pagination/Pagination.vue';

export default {
   name: 'Category',
   components:{
       Loader,
       Pagination,
   },
   data(){
       return{
           api_path: process.env.VUE_APP_API_PATH,
       }
   },
   mounted(){
       this.fetchCategories(this.$route.query.page);
   },
   computed:{
       ...mapState('category',['loading','page','totalPages','store','pageLink']),
       ...mapGetters({categories: 'category/categories'}),
   },
   watch:{
       '$route' (){
         this.fetchCategories(this.$route.query.page)
       }
   },
   methods:{
       ...mapActions({fetchCategories: 'category/fetchCategories', deleteCategory: 'category/deleteCategory', statusAction: 'category/statusAction'}),
       deleteAction(id){
           this.deleteCategory([id,this.$route.query.page]);
       },
       categoryStatus(){
          this.statusAction();
       }
   }
}
</script>

<style>

</style>