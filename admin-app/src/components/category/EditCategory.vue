<template>
    <div class="content-wrapper">
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 class="float-left">Edit Category</h4>
                    <h3><router-link to="/admin/category/all?page=1" class="btn btn-sm btn-success float-right text-bold">All Category</router-link></h3>
                </div>
                <form v-if="!loading" role="form" @submit.prevent="updateAction">
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" class="col-sm-2  col-form-label">Category Name</label>
                        <div class="col-sm-8">
                           <input type="text" name="category_name" v-model="state.category_name" @change="handleUrl" class="form-control" id="exampleInputName" placeholder="Enter Category Name"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" class="col-sm-2  col-form-label">Url</label>
                        <div class="col-sm-8">
                           <input type="text" name="url" v-model="state.url" class="form-control" id="exampleInputEmail1" placeholder="Enter url" readOnly/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" class="col-sm-2  col-form-label">Parent Category</label>
                        <div class="col-sm-8">
                          <select class="form-control" name="parent_id" v-model="state.parent_id">
                              <option value="" disabled>Select Parent Category</option>
                              <option v-for="parent in parents" :key="parent.id" :value="parent.id" :selected="parent.id===this.state.category_id" >{{parent.category_name}}</option>
                          </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" class="col-sm-2  col-form-label">Category Image</label>
                        <div class="col-sm-8">
                            <input type="file" @change="handleImage" name="category_image"  class="form-control"/>
                        </div>
                    </div>
                    <div v-if="this.state.category_image" class="form-group row">
                        <label for="exampleInputPreview" class="col-sm-2  col-form-label">Category Image Preview</label>
                        <div class="col-sm-8">
                            <img :src="updateImage()" width="100" height="100"/>
                        </div>
                    </div>
                    <div class="form-group col-6 offset-sm-2">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                    </div>
                </form>
                <Loader v-else></Loader>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Loader from '../loader/Loader.vue';

export default {
     name: 'EditCategory',
     data(){
         return{
             preview:''
         }
     },
     components:{
         Loader
     },
     computed:{
        ...mapState('category',['loading']),
        ...mapGetters({parents: 'category/parent_categories', state: 'category/category'}),
     },
     mounted(){
         this.fetchParents();
         this.fetchCategory(this.$route.params.id);
     },
     methods:{
         ...mapActions({updateCategory: 'category/updateCategory', fetchCategory: 'category/fetchCategory', fetchParents: 'category/fetchParents'}),
         updateAction(){
            const {category_name,url,parent_id,category_image} = this.state;
            const formData = new FormData();
            formData.append('category_name', category_name);
            formData.append('url', url);
            formData.append('parent_id', parent_id);
            formData.append('category_image', category_image);
            this.updateCategory([formData, this.$route.params.id]);
         },
         handleImage(e){
            if(e.target.files.length !== 0){
                const reader = new FileReader();
                this.state.category_image = e.target.files[0]
                reader.onloadend = () =>{
                    this.preview = reader.result
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        },
        updateImage(){
            if ( this.preview && this.preview.length > 100) {
                return this.preview;
            }else{
                return `${process.env.VUE_APP_API_PATH}/images/category_images/${this.state.category_image}`;
            }
        },
        handleUrl(e){
            const createUrl = e.target.value.trim().split(' ').join('-');
            this.state.url = createUrl.toLowerCase();
        }
     }
}
</script>

<style>

</style>