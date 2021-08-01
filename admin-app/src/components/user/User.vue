<template>
  <div class="content-wrapper">
    <section class="content">
        <div class="container-fluid">
        <div class="row">
            <div class="col-12">
            <div class="card">
                <div class="card-header">
                <h4 class="float-left">All User</h4>
                <h3><router-link to="/admin/user/create"><button type="button" class="btn btn-primary float-right text-bold">Add User</button></router-link></h3>
                </div>
                <div class="card-body">
                <table id="example2" class="table table-bordered table-hover">
                    <thead>
                    <tr>
                    <th>SL.</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th>User Image</th>
                    <th>Action</th>
                    </tr>
                    </thead>
                    <tbody v-if="!loading">
                        
                    <tr v-for="(single,index) in users" :key="single.id">
                        <td>{{ index+1 }}</td>
                        <td>{{ single.name }}</td>
                        <td>{{ single.email }}</td>
                        <td><span class="badge bg-success">{{ single.type }}</span></td>
                        <td><img width="100" height="100" :src="!single.image?`${api_path}/images/admin_images/avatar.png`:`${api_path}/images/admin_images/${single.image}`"/></td>
                        <td>
                        <button v-if="single.id !== user.id" @click="deleteAction(single.id)" class="text-danger"><i class="fas fa-trash"></i></button>&nbsp;
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
import { mapActions, mapGetters, mapState } from 'vuex';
import Loader from '../loader/Loader.vue';
import Pagination from '../pagination/Pagination.vue';

export default {
   name: 'User',
   components:{
      Loader,
      Pagination
   },
   data(){
       return{
           api_path: process.env.VUE_APP_API_PATH,
       }
   },
   mounted(){
      this.alluser(this.$route.query.page);
   },
   computed:{
       ...mapState('auth',['user']),
       ...mapState('user',['loading','page','totalPages','store','pageLink']),
       ...mapGetters({users: 'user/users'}),
   },
   watch:{
       '$route' (){
         this.alluser(this.$route.query.page)
       }
    },
   methods:{
       ...mapActions({alluser: 'user/AllUser', deleteUser: 'user/deleteUser'}),
       deleteAction(id){
          this.deleteUser([id,this.$route.query.page]);
       }
   }
}
</script>

<style>

</style>