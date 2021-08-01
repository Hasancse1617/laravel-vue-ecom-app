<template>
  <div class="content-wrapper">
    <section class="content">
    <div class="container-fluid">
        <div class="row">
        <div class="col-12">
            <div class="card">
            <div class="card-header">
                <h4 class="float-left">Add User</h4>
                <h3><router-link exact to="/admin/user/all?page=1" class="btn btn-sm btn-success float-right text-bold">All User</router-link></h3>
            </div>
            <form role="form" @submit.prevent="createAction" enctype="multipart/form-data">
                <div class="card-body">
                <div class="form-group row">
                    <label for="exampleInputName" class="col-sm-2  col-form-label">User Name</label>
                    <div class="col-sm-8">
                        <input type="text" name="name" v-model="state.name" class="form-control" id="exampleInputName" placeholder="Enter User Name"/>
                    </div> 
                </div>
                <div class="form-group row">
                    <label for="exampleInputEmail1" class="col-sm-2  col-form-label">User Email</label>
                    <div class="col-sm-8">
                        <input type="email" name="email" v-model="state.email" class="form-control" id="exampleInputEmail1" placeholder="Enter User Email"/>
                    </div> 
                </div>
                <div class="form-group row">
                    <label for="exampleInputEmail2" class="col-sm-2  col-form-label">User Mobile</label>
                    <div class="col-sm-8">
                        <input type="tel" name="mobile" pattern="[0-9]{5}-[0-9]{6}" v-model="state.mobile" class="form-control" id="exampleInputEmail2" placeholder="01738-385467" required/>
                    </div> 
                </div>
                <div class="form-group row">
                    <label for="exampleInput" class="col-sm-2  col-form-label">User Type</label>
                    <div class="col-sm-8">
                        <select class="form-control" name="type" v-model="state.type">
                            <option value="" disabled>Select User Type</option>
                            <option value="Super Admin">Super Admin</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                    </div> 
                </div>
                <div class="form-group row">
                    <label for="exampleInputImage" class="col-sm-2  col-form-label">User Image</label>
                    <div class="col-sm-8">
                        <input type="file" @change="handleImage" name="image"  class="form-control"/>
                    </div>
                </div>
                <div v-if="state.preview" class="form-group row">
                    <label for="exampleInputPreview" class="col-sm-2  col-form-label">User Image Preview</label>
                    <div class="col-sm-8">
                        <img :src="state.preview" width="100" height="100"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="exampleInputPassword" class="col-sm-2  col-form-label">User Password</label>
                    <div class="col-sm-8">
                        <input type="password" name="password" v-model="state.password" class="form-control" id="exampleInputPassword" placeholder="Enter Password"/>
                    </div> 
                </div>
                <div class="form-group row">
                    <label for="exampleInputPassword" class="col-sm-2  col-form-label">Confirm Password</label>
                    <div class="col-sm-8">
                        <input type="password" name="confirm_password" v-model="state.confirm_password" class="form-control"  placeholder="Enter Confirm Password"/>
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
   name: 'AddUser',
   data(){
       return {
           state:{
               name:'',
               email:'',
               mobile:'',
               type:'',
               password:'',
               preview:'',
               image:'',
               confirm_password:'',
           }
       }
   },
   methods:{
       ...mapActions({createUser: 'user/createUser'}),
       createAction(){
           const {name,email,mobile,type,image,password,confirm_password} = this.state;
           const formData = new FormData();
           formData.append('name', name);
           formData.append('email', email);
           formData.append('mobile', mobile);
           formData.append('type', type);
           formData.append('image', image);
           formData.append('password', password);
           formData.append('confirm_password', confirm_password);
           this.createUser(formData);
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
       }
   }
}
</script>

<style>

</style>