<template>
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Brand</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form @submit.prevent="updateAction">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Brand Name:</label>
                        <input type="text"  class="form-control" name="name" v-model="state.name" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="edit-modal" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" >Save</button>
                </div>
            </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';
export default {
   name: 'EditModal',
   computed:{
       ...mapGetters({state: 'brand/brand'})
   },
   methods:{
       ...mapActions({updateBrand: 'brand/updateBrand'}),
       updateAction(){
           this.updateBrand([this.state,this.$route.query.page,this.state.id]);
       }
   }
}
</script>

<style>

</style>