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
   </div>
       <div class="back-link">
            <router-link :to="{ name: 'dashboard'}">
               <a class="btn project-color">Back to Dashboard</a>
            </router-link>
        
         </div>
   <div class="container" style="margin-top:20px;">

   <div class="hpanel forum-box" v-for="project in project_list"  v-bind:key="project.id">
   <!-- <div class="panel-heading">
      <h3>dfyh</h3>
   </div> -->
   <div class="panel-body">
      <div class="row">
         <div class="col-md-10 forum-heading">
            <a href="">
               <h4>{{project.title}}</h4>
            </a>
            <div class="desc" style="margin: 14px 0px; padding: 4px 19px;"  v-for="list in task_list[0]"  v-bind:key="list.id">{{list.title}}</div>
         </div>
         <div class="col-md-1 forum-info">
            <span class="number">{{project.total_task}}</span>
            <small>Total Tasks</small>
         </div>
         <div class="col-md-1 forum-info">
            <span class="number">{{project.collaborators_count}}</span>
            <small>Collaborators</small>
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
          user_id:sessionStorage.getItem('user_id'),
          project_list:'',
          task_list:''
     

      }
    },

    methods:{
           logout(){

             axios.get('http://127.0.0.1:8000/api/logout/' +this.user_id, {
                headers:this.Authorization,
            })
            .then((response) => {
               sessionStorage.clear();
               this.$router.push('/');
           })
      },
    },
    mounted(){
     
     let get_token = sessionStorage.getItem('token');

      if(get_token==null){

         this.$router.push('/');
      }
      axios.get('http://127.0.0.1:8000/api/tasks', {
                headers:this.Authorization,
            })
            .then((response) => {
                    this.project_list = response.data.data;
                    this.task_list =response.data.data;
      
                   // this.task_list =response.data[0].get_task;

                  //   let data_list =  response.data;

                  //   for (let index = 0; index < data_list.length; index++) {

                  //         const element = data_list[index];
                  //         this.task_list = element;
                  //   }
               
              
        })
   }
}
</script>