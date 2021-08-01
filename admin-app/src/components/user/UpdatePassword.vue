<template>
    <div class="content-wrapper">
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Update Password</h4>
                    <!-- {/* <h3><NavLink exact to="/admin/post/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Post</NavLink></h3> */} -->
                </div>
                <form role="form" @submit.prevent="passwordAction">
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">User Password</label>
                        <div className="col-sm-8">
                           <input type="password" name="old_password" v-model="state.old_password" class="form-control" id="exampleInputName" placeholder="Enter Password"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">New Password</label>
                        <div className="col-sm-8">
                           <input type="password" name="new_password" v-model="state.new_password" class="form-control" id="exampleInputEmail1" placeholder="Enter New Password"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Confirm Password</label>
                        <div className="col-sm-8">
                        <input type="password" name="confirm_password" v-model="state.confirm_password" class="form-control" id="exampleInputEmai" placeholder="Enter Confirm Password"/>
                        </div> 
                    </div>
                    <div class="form-group col-6 offset-sm-2">
                        <button type="submit" class="btn btn-primary">Update</button>
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
import {mapActions} from 'vuex';

export default {
    name: 'UpdatePassword',
    data(){
        return {
            state:{
                old_password:'',
                new_password:'',
                confirm_password:'',
            }
        }
    },
    methods:{
        ...mapActions({updatePassword: 'user/updatePassword'}),
        passwordAction(){
            this.updatePassword([this.state, this.$route.params.id]);
        }
    }
}
</script>

<style>

</style>