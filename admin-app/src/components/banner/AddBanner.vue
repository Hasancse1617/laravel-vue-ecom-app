<template>
    <div class="content-wrapper">
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 class="float-left">Add Banner</h4>
                    <h3><router-link to="/admin/banner/all?page=1" class="btn btn-sm btn-success float-right text-bold">All Banner</router-link></h3>
                </div>
                <form role="form" @submit.prevent="createAction" enctype="multipart/form-data">
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" class="col-sm-2  col-form-label">Banner Title</label>
                        <div class="col-sm-8">
                           <input type="text" name="title" v-model="state.title" class="form-control" id="exampleInputName" placeholder="Enter Banner Title"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputName" class="col-sm-2  col-form-label">Banner SubTitle</label>
                        <div class="col-sm-8">
                           <input type="text" name="subtitle" v-model="state.subtitle" class="form-control" id="exampleInputName" placeholder="Enter Banner Subtitle"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" class="col-sm-2  col-form-label">Link</label>
                        <div class="col-sm-8">
                           <input type="text" name="link" v-model="state.link" class="form-control" id="exampleInputEmail1" placeholder="Enter Button Text" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" class="col-sm-2  col-form-label">Button Text</label>
                        <div class="col-sm-8">
                           <input type="text" name="btn_text" v-model="state.btn_text" class="form-control" id="exampleInputEmail1" placeholder="Enter Button Link" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" class="col-sm-2  col-form-label">Alt</label>
                        <div class="col-sm-8">
                           <input type="text" name="alt" v-model="state.alt" class="form-control" id="exampleInputE" placeholder="Enter Alt Text" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" class="col-sm-2  col-form-label">Banner Image</label>
                        <div class="col-sm-8">
                            <input type="file" @change="handleImage" name="banner_image"  class="form-control"/>
                        </div>
                    </div>
                    <div v-if="state.preview" class="form-group row">
                        <label for="exampleInputPreview" class="col-sm-2  col-form-label">Banner Image Preview</label>
                        <div class="col-sm-8">
                            <img :src="state.preview" width="100" height="100">
                        </div>
                    </div>
                    <div class="form-group col-6 offset-sm-2">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
   name: 'AddBanner',
   data(){
       return{
           state:{
               title:'',
               subtitle:'',
               link:'',
               btn_text:'',
               alt:'',
               banner_image:'',
               preview:'',
           }
       }
   },
   methods:{
       ...mapActions({createBanner: 'banner/createBanner'}),
       createAction(){
           const {title,subtitle,btn_text,link,alt,banner_image} = this.state;
            const formData = new FormData();
            formData.append('title', title);
            formData.append('subtitle',subtitle);
            formData.append('btn_text',btn_text);
            formData.append('link', link);
            formData.append('alt', alt);
            formData.append('banner_image', banner_image);
            this.createBanner(formData);
       },
       handleImage(e){
            if(e.target.files.length !== 0){
                const reader = new FileReader();
                this.state.banner_image = e.target.files[0]
                reader.onloadend = () =>{
                    this.state.preview = reader.result
                }
                reader.readAsDataURL(e.target.files[0]);
            }
       }
   }
}
</script>

<style>

</style>