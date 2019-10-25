<template>
<div>
   <div id="header">
      <div id="logo">
         <span>
         {{username}}
         </span>
      </div>
      <nav role="navigation">
         <div class="small-logo">
            <span class="text-primary">HOMER APP</span>
         </div>
         <div class="navbar-right">
            <ul class="nav navbar-nav no-borders">
               <li class="dropdown">
                  <a @click="logout()">
                  <i class="pe-7s-upload pe-rotate-90"></i>
                  </a>
               </li>
            </ul>
         </div>
      </nav>

      <div class="content">
         <div class="back-link">
            <router-link :to="{ name: 'dashboard'}">
               <a class="btn project-color">Back to Dashboard</a>
            </router-link>
             <router-link :to="{ name: 'Taskview'}" v-if="user_role == 'admin'">
               <a  class="btn project-color" style="margin: 0px 20px;">Tasks</a>
            </router-link>
         </div>
         <div class="row">
            <div class="col-md-7">
               <div class="hpanel">
                  <div class="panel-body">
                     <div class="text-center hidden">
                        We couldn't find any notes for you.
                     </div>
                     <div class="tab-content">
                        <div id="note1" class="tab-pane active">
                           <div class="pull-right text-muted m-l-lg">
                             {{created_at}}
                           </div>
                           <h3>{{title}}</h3>
                           <hr>
                           <div class="note-content">
                              <p>{{description}}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row">
                    <div class="col-md-6" v-for="collaborators in collaborators_list" v-bind:key="collaborators.id">
                        <div class="hpanel">
                            <div class="panel-body" style="padding: 6px 0px;">
                                <div class="m-t-sm col-md-10">
                                    <strong>{{collaborators.name}}</strong>
                                    <p class="small">{{collaborators.role}}</p>
                                </div>
                                <div class="m-t-sm col-md-2" v-if="user_role==='admin'">
                                   <a  @click="collaborators_delete(collaborators.id)" class="remove_icon"><i class="pe-7s-close"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
               <div class="hpanel panel-group">
                  <div class="panel-body" >
                     <div  class="text-center text-muted font-bold"> Task</div>
                  </div>
                  <div class="panel-section" v-if="user_role == 'admin'">
                     <div class="input-group">
                        <input type="text" v-model="task" class="form-control" name="title" placeholder="add task...">
                        <span class="input-group-btn">
                        <button class="btn btn-default" type="button" @click ="add_task()"><i class="glyphicon glyphicon-plus small"></i> </button>
                        </span>
                     </div>
                     <button type="button"  data-toggle="collapse" data-target="#notes" class="btn-sm visible-xs visible-sm collapsed btn-default btn btn-block m-t-sm">
                     All notes <i class="fa fa-angle-down"></i>
                     </button>
                  </div>
                   <div class="form-group alert-warning" v-if="error">
                    <div class="error_show" role="alert">
                        <strong>required task</strong>
                    </div>
                </div>
                  <div  v-for="list in task_list"  v-bind:key="list.id" id="notes" class="collapse">
                     <div class="panel-body note-link" >
                        <a class="col-md-10" data-toggle="tab" @click="collaboratorModel_list(list.id)">
                           <h5>{{list.title}}</h5>
                        </a>
                        <div  v-if="list.is_complete =='1'" class="complete_status"></div>
                         <label :for="list.title" class="c_align checkbox-inline" v-if="user_role == 'customer' && list.is_complete =='0'" >
                              <input type="checkbox"  v-model="is_complete" :name="list.title" true-value="1" false-value="0" v-on:change="check(list.id)"  id="status">
                          </label>
                         <label  v-if="list.is_complete =='1' && user_role == 'customer'" class="c_align">completed</label>
                        <button  v-if="user_role == 'admin'" @click="delete_task(list.id)"  id="remove_task" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
    <div  class="modal_boxs fade in" v-if="collaboratorModel">
      <div class="modal-dialog">
         <!-- Modal content-->
         <div class="modal-content">
            <div class="modal-header">
               <button type="button" class="close addcustomer"  @click ="collaboratorModel = false"  data-dismiss="modal">×</button>
               <h4 class="modal-title">Collaborator List</h4>
            </div>
            <div class="modal-body">
               <div class="hpanel"  v-if="user_role ==='admin'">
                <div class="well well-lg"  v-for="collaborators in collaborators_list" v-bind:key="collaborators.id">
                    <div class="col-md-8">
                        <h5 class="font-bold">{{collaborators.name}}</h5>
                    </div>
                    <div class="col-md-2">
                      <button  class="btn btn-success" style="padding: 0px 4px;" @click="assigned_user(collaborators.id)" >assigned</button>
                    </div> 
                     <div class="col-md-2">
                      <div  v-if="user_role==='admin'">
                         <a  @click="assigner_delete(collaborators.id)" class="remove_icon"><i class="pe-7s-close" style="float: right;"></i></a>
                       </div>
                    </div>  
                </div>  
            </div>
            <div class="modal-footer">
               <button type="button"  @click ="collaboratorModel = false" class="btn btn-default addcustomer" data-dismiss="modal">Close</button>
            </div>
         </div>
      </div>
   </div>
   </div>
   {{getCollaborators}}
</div>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapActions,mapState}  from 'vuex';

export default {
    name :"app",
    completed:{
            ...mapGetters(['getTaskList','getCollaborators'])
    },
    data(){
      return {
          username:sessionStorage.getItem('name'),
          Authorization:{ 'Authorization': 'Bearer  ' +sessionStorage.getItem('token')},
          user_role:sessionStorage.getItem('role'),
          user_id:sessionStorage.getItem('user_id'),
          project_id:'',
          collaborators_list:'',
          title:'',
          task:'',
          created_at:'',
          task_list:'',
          task_id:'',
          description:'',
          collaboratorModel: false,
          error:false
      }
    },
   methods:{
       ...mapActions(['Get_Project_Task','Get_Collaborators']),

       logout(){
           axios.get('http://127.0.0.1:8000/api/logout/' +this.user_id, {
                headers:this.Authorization,
            })
            .then((response) => {
               sessionStorage.clear();
               this.$router.push('/');
           })
      },

      add_task(){
          
          let url = 'http://127.0.0.1:8000/api/tasks';
           let data = { 
                "title": this.task,
                "project_id":this.project_id,
            }
            axios.post(url,data,{
                    headers:this.Authorization,
            })
            .then((response) => {
                location.reload(true);   
            })
            .catch(error => {
               this.error=true,
               console.log(error);
            })
      },
      delete_task(id){
           alert(id);
           axios.delete('http://127.0.0.1:8000/api/tasks/' + id, {
                    headers:this.Authorization,
                })
                .then((response) => {
                    location.reload(true);
                })
      },

     check: function(id) {
     
         let url = 'http://127.0.0.1:8000/api/tasks/'+id+'/update';
         let data = { 
               "is_complete": this.is_complete
           }
         axios.put(url,data,{
                  headers:this.Authorization,
            })
        .then((response) => {
             
           })
    },
    collaborators_delete(id){

          axios.delete('http://127.0.0.1:8000/api/collaborators/' +id+'/'+this.$route.params.id, {
                    headers:this.Authorization,
                })
                .then((response) => {
                    location.reload(true);
                })
       },
   collaboratorModel_list(id){
          this.collaboratorModel = true;
          this.task_id = id
    },
    assigned_user(id){

          axios.get('http://127.0.0.1:8000/api/task_assigne/task_id/'+this.task_id+'/user_id/' +id, {
                    headers:this.Authorization,
                })
                .then((response) => {
                    location.reload(true);
                })
           },
   },
  
   mounted(){
           this.project_id =  this.$route.params.id
           let id = this.$route.params.id
           this.$store.dispatch('Get_Project_Task', id),
           this.$store.dispatch('Get_Collaborators',id)
   //   axios.get('http://127.0.0.1:8000/api/projects/'+ this.$route.params.id, {
   //              headers:this.Authorization,
   //          })
   //          .then((response) => {
         
   //             this.title = response.data.data['title'],
   //             this.description = response.data.data['description'],
   //             this.project_id = response.data.data['id'],
   //             this.created_at = response.data.data['created_at']
   //             this.task_list = response.data.data['get_task'];
   //      })
  

      //    axios.get('http://127.0.0.1:8000/api/collaborators/'+ this.$route.params.id, {
      //           headers:this.Authorization,
      //       })
      //       .then((response) => {
      //           this.collaborators_list = response.data;
      //   })

   }
}
</script>