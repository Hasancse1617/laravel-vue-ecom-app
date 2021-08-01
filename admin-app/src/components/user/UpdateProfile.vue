<template>
     <div class="content-wrapper">
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Update Profile</h4>
                    <!-- {/* <h3><NavLink exact to="/admin/post/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Post</NavLink></h3> */} -->
                </div>
                
                <form v-if="!loading" role="form" @submit.prevent="updateAction">
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">User Name</label>
                        <div className="col-sm-8">
                           <input type="text" name="name" v-model="state.name" class="form-control" id="exampleInputName" placeholder="Enter User Name"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">User Email</label>
                        <div className="col-sm-8">
                           <input type="email" name="email" v-model="state.email" class="form-control" id="exampleInputEmail1" placeholder="Enter User Email" readOnly/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">User Type</label>
                        <div className="col-sm-8">
                        <input type="email" name="email" v-model="state.type" class="form-control" id="exampleInputEmai" placeholder="Enter User Usertype" readOnly/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">User Image</label>
                        <div className="col-sm-8">
                            <input type="file" @change="handleImage" name="user_image"  class="form-control" id="exampleInputImage"/>
                        </div>
                    </div>
                    <div v-if="state.image" class="form-group row">
                        <label for="exampleInputPreview" className="col-sm-2  col-form-label">User Image Preview</label>
                        <div className="col-sm-8">
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
import { mapState, mapActions, mapGetters } from 'vuex';
import Loader from '../loader/Loader.vue';

export default {
    name: 'UpdateProfile',
    components:{
        Loader,
    },
    mounted(){
       this.fetchAction();
    },
    computed:{
       ...mapState('user', ['loading']),
       ...mapGetters({state: 'user/user'}),
    },
    methods:{
        ...mapActions({fetchUser: 'user/fetchUser', updateUser: 'user/updateUser'}),
        fetchAction(){
            this.fetchUser(this.$route.params.id);
        },
        handleImage(e){
            if(e.target.files.length !== 0){
                const reader = new FileReader();
                this.state.image = e.target.files[0]
                reader.onloadend = () =>{
                    this.state.preview = reader.result
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        },
        updateImage(){
            const image = this.state.image;
            if ( image && image.length > 100) {
                return this.state.image;
            }else{
                return `${process.env.VUE_APP_API_PATH}/images/admin_images/${this.state.image}`;
            }
        },
        updateAction(){
            this.updateUser([this.state, this.$route.params.id]);
        }
    }
}
</script>

<style>

</style>