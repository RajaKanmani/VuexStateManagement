<template>
    <div>
   <div class="container">
      <div class="panel-body col-md-5" style="margin-top: 84px;">
         <form action="#" id="loginForm">
            <div class="form-group">
               <label class="control-label" for="username">Create Notes</label>
               <input type="text" v-model="data.title" name="notes" id="notes" class="form-control">
            </div>
            <button class="btn  project-color" @click="add_notes()" type ="button" >Save</button>
         </form>
         <div style="margin-top: 84px;">
            <div class="hpanel"    v-for="list in getNotesList" :key="list.id" >
               <div class="panel-body" style="padding: 6px 0px;">
                  <div class="m-t-sm col-md-8"><strong>{{list.title}}</strong></div>
                   <div class="m-t-sm col-md-2">
                     <a @click="update_view(list.id)" style="" ><i aria-hidden="true" class="fa fa-pencil"></i></a>
                  </div>
                  <div class="m-t-sm col-md-2">
                     <a @click="remove_task(list.id)" class="remove_icon"><i class="pe-7s-close"></i></a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
      <div  class="modal_boxs fade in" v-if="notesModel">
      <div class="modal-dialog">
         <!-- Modal content-->
         <div class="modal-content">
            <div class="modal-body">
               <div class="hpanel">
                  <div class="form-group">
               <label class="control-label" for="username">Create Notes</label>
               <input type="text" v-model="getUpdateNotesList.title"  name="notes" id="notes" class="form-control">
            </div>
           
            <button class="btn  project-color" @click="update_notes(getUpdateNotesList)" type ="button">Update</button>
            </div>
            <div class="modal-footer">
               <button type="button"  @click ="notesModel = false" class="btn btn-default addcustomer" data-dismiss="modal">Close</button>
            </div>
         </div>
      </div>
   </div>
   </div>
</div>
</template>

<script>

import {mapGetters,mapActions,mapMutations,mapState}  from 'vuex';


export default {
    name:"notes",
    computed:{
         ...mapGetters(['getNotesList','getUpdateNotesList']),
    },
    data(){
        return{
            data:{title:''},
            notesModel:false,
        }
    },
    methods:{
         ...mapActions(['add_task', 'remove_task','list_task','get_task_list','update_note']),
         add_notes:function(){
            this.$store.dispatch('add_task', this.data)
         },
         update_view:function(id){
           this.notesModel = true;
           this.$store.dispatch('get_task_list',id)
         },
         update_notes:function(data){
           this.$store.dispatch('update_note',data),
           this.getUpdateNotesList.title ='',
           this.notesModel = false;
         },
         remove_task(id){
           this.$store.dispatch('remove_task', id)
         }
    },

   mounted(){
      this.list_task();
   }
   
 
}
</script>
