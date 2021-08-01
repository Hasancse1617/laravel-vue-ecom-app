<template>
    <div class="content-wrapper">
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Edit Banner</h4>
                    <h3><router-link exact to="/admin/banner/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Banner</router-link></h3>
                </div>
                <form v-if="!loading" role="form" @submit.prevent="updateAction">
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Banner Title</label>
                        <div className="col-sm-8">
                           <input type="text" name="title" v-model="state.title" class="form-control" id="exampleInputName" placeholder="Enter Banner Title"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Banner SubTitle</label>
                        <div className="col-sm-8">
                           <input type="text" name="subtitle" v-model="state.subtitle" class="form-control" id="exampleInputName" placeholder="Enter Banner Subtitle"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Link</label>
                        <div className="col-sm-8">
                           <input type="text" name="link" v-model="state.link" class="form-control" id="exampleInputEmail1" placeholder="Enter Button Text" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Url</label>
                        <div className="col-sm-8">
                           <input type="text" name="btn_text" v-model="state.btn_text" class="form-control" id="exampleInputEmail1" placeholder="Enter Button Text" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Alt</label>
                        <div className="col-sm-8">
                           <input type="text" name="alt" v-model="state.alt" class="form-control" id="exampleInputE" placeholder="Enter Alt Text" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Banner Image</label>
                        <div className="col-sm-8">
                            <input type="file" @change="handleImage"  class="form-control"/>
                        </div>
                    </div>
                    <div v-if="state.image" class="form-group row">
                        <label for="exampleInputPreview" className="col-sm-2  col-form-label">Banner Image Preview</label>
                        <div className="col-sm-8">
                            <img :src="updateImage()" width="100" height="100">
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
import { mapActions, mapGetters, mapState } from 'vuex';
import Loader from '../loader/Loader.vue';

export default {
    name: 'EditBanner',
    data(){
        return{
            preview:''
        }
    },
    components:{
        Loader
    },
    mounted(){
        this.fetchAction();
    },
    computed:{
        ...mapState('banner',['loading']),
        ...mapGetters({state: 'banner/banner'}),
    },
    methods:{
        ...mapActions({fetchBanner: 'banner/fetchBanner', updateBanner: 'banner/updateBanner'}),
        fetchAction(){
            this.fetchBanner(this.$route.params.id);
        },
        handleImage(e){
            if(e.target.files.length !== 0){
                const reader = new FileReader();
                this.state.image = e.target.files[0]
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
                return `${process.env.VUE_APP_API_PATH}/images/banner_images/${this.state.image}`;
            }
        },
        updateAction(){
            const {title,subtitle,btn_text,link,alt,image} = this.state;
            const formData = new FormData();
            formData.append('title', title);
            formData.append('subtitle',subtitle);
            formData.append('btn_text',btn_text);
            formData.append('link', link);
            formData.append('alt', alt);
            formData.append('image', image);
            this.updateBanner([formData, this.$route.params.id]);
        }
    }
}
</script>

<style>

</style>