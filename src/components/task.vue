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
                              26.10.2016
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
                  <div  v-for="list in task_list.data"  v-bind:key="list.id" id="notes" class="collapse">
                     <div class="panel-body note-link">
                        <a href="#note1" data-toggle="tab">
                           <h5>{{list.title}}</h5>
                        </a>
                         <label :for="list.title" class="c_align" v-if="user_role == 'customer' && list.is_complete =='0'" ><input :id="list.title"  v-model="is_complete" :name="list.title" true-value="1" false-value="0" v-on:change="check(list.id)"  type="checkbox"></label>
                         <label  v-if="list.is_complete =='1'" class="c_align">completed</label>
                        <button  v-if="user_role == 'admin'" @click="delete_task(list.id)"  id="remove_task" type="button" data-id="33"><i class="fa fa-trash" aria-hidden="true"></i></button>
                     </div>
                  </div>

                
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name :"app",
    data(){
      return {
          username:sessionStorage.getItem('name'),
          Authorization:{ 'Authorization': 'Bearer  ' +sessionStorage.getItem('token')},
          user_role:sessionStorage.getItem('role'),
          project_id:'',
          title:'',
          task:'',
          task_list:'',
          description:'',
          is_complete:''

      }
    },
   methods:{
       logout(){
            sessionStorage.clear();
            this.$router.push('/');
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
      },
      delete_task(id){
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
    }
   },
  
   mounted(){
     
     let get_token = sessionStorage.getItem('token');

      if(get_token==null){

         this.$router.push('/');
      }
     axios.get('http://127.0.0.1:8000/api/projects/'+ this.$route.params.id, {
                headers:this.Authorization,
            })
            .then((response) => {
                   this.title = response.data.data['title'],
                 this.description = response.data.data['description'],
                 this.project_id = response.data.data['id']
        })
      axios.get('http://127.0.0.1:8000/api/tasks/'+ this.$route.params.id, {
                headers:this.Authorization,
            })
            .then((response) => {
                this.task_list = response.data;
        })

   }
}
</script>