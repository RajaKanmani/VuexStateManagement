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
   <div class="content">
      <div class="row"  v-if="user_role === 'admin'">
         <div class="col-lg-3">
            <div class="hpanel hyellow">
               <div class="panel-body    text-center h-200">
                  <i class="pe-7s-graph1 fa-4x"></i>
                  <h1 class="m-xs count">{{project_count}}</h1>
                  <h3 class="font-extra-bold no-margins text-dashboard">
                     Total  Projects
                  </h3>
                  <small></small>
               </div>
               <div class="panel-footer">
                  Projects
               </div>
            </div>
         </div>
         <div class="col-lg-3">
            <div class="hpanel stats hgreen">
               <div class="panel-body h-200">
                  <div class="stats-title pull-left">
                     <h4>Users</h4>
                  </div>
                  <div class="stats-icon pull-right">
                     <i class="pe-7s-user fa-4x"></i>
                  </div>
                  <div class="m-t-xl">
                     <h3 class="m-b-xs total_users text-dashboard">{{customer_count}}</h3>
                  </div>
               </div>
               <div class="panel-footer">
                  users
               </div>
            </div>
         </div>
         <div class="col-lg-3">
            <div class="hpanel stats hviolet">
               <div class="panel-body h-200">
                  <div class="stats-title pull-left">
                     <h4>Total Task</h4>
                  </div>
                  <div class="stats-icon pull-right">
                     <i class="pe-7s-box2 fa-4x"></i>
                  </div>
                  <div class="m-t-xl">
                     <h1 class="count_task text-dashboard">{{task_count}}</h1>
                  </div>
               </div>
               <div class="panel-footer">
                  Tasks
               </div>
            </div>
         </div>
         <div class="col-lg-3">
            <div class="hpanel stats hblue">
               <div class="panel-body h-200">
                  <div class="stats-title pull-left">
                     <h4>Status</h4>
                  </div>
                  <div class="stats-icon pull-right">
                     <i class="pe-7s-alarm fa-4x"></i>
                  </div>
                  <div class="clearfix"></div>
                  <div class="flot-chart">
                     <div class="flot-chart-content" id="flot-income-chart" style="padding: 0px; position: relative;">
                        <canvas class="flot-base" width="312" height="75" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 250px; height: 60px;"></canvas>
                        <canvas class="flot-overlay" width="312" height="75" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 250px; height: 60px;"></canvas>
                     </div>
                  </div>
                  <div class="m-t-xs">
                     <div class="row">
                        <div class="col-xs-5">
                           <small class="stat-label">Completed</small>
                           <h4 class="complete_count text-dashboard">{{complete_count}}</h4>
                        </div>
                        <div class="col-xs-7">
                           <small class="stat-label">Pending</small>
                           <h4 class="un_complete_count text-dashboard">{{un_complete_count}}</h4>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="panel-footer">
                  Status
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="content">
      <div class="section_homes">
         <div class="panel-body">
            <div class="col-lg-12">
               <div class="hpanel">
                  <ul class="nav nav-tabs">
                     <li  class=""  @click="tab_one()"><a data-toggle="tab" aria-expanded="true">Projects</a></li>
                     <li  v-if="user_role === 'admin'" class=""  @click="tab_two()"  ><a data-toggle="tab" aria-expanded="false">Customers</a></li>
                  </ul>
                  <div class="tab-content">
                     <div id="tab-1" v-if="isActive == 'tab_1'" class="tab-pane active">
                        <div class="panel-body" style="padding: 0px 13px;">
                           <div class="btn_view"  style="display: inline-block;width: 100%;"  v-if="user_role === 'admin'">
                              <button type="button"   @click="addprojectModel = true"  class="btn project-color  pull-right" data-toggle="modal" data-target="#addproject" style="margin: 13px 0px;">
                              add project
                              </button>
                           </div>
                        </div>
                        <div class="panel-body" >
                           <div class="row projects btn_view" style="margin-top: 21px;">
                              <div class="col-lg-4" id="click_section"  v-for="list in projects_list.data" v-bind:key="list.id">
                                 <div class="hpanel box-dashboard">
                                    <div class="panel-body">
                                       <div class="row">
                                          <router-link :to="{ name: 'task',  params: { id: list.id } }">
                                             <div class="col-sm-12">
                                                <div class="row">
                                                   <div class="col-sm-12">
                                                      <div class="project-label">{{list.title}}</div>
                                                   </div>
                                                </div>
                                                <h4>Description</h4>
                                                <p>
                                                   {{list.description}}
                                                </p>
                                             </div>
                                          </router-link>
                                          <div class="col-sm-12 project-info">
                                             <div class="project-action m-t-md" v-if="user_role === 'admin'">
                                                <div class="btn-group icon_group">
                                                   <router-link :to="{ name: 'task',  params: { id: list.id } }" style="float: left;">
                                                      <button class="btn btn-sm btn-default">
                                                      <i class="fa fa-eye text-success" aria-hidden="true"></i></button>
                                                   </router-link>
                                                   <button type="submit" @click ="update_view(list.id)" id="project_update_id" class="btn btn-sm btn-default">
                                                   <i class="fa fa-pencil text-info" aria-hidden="true"></i></button>
                                                   <button type="submit" class="btn btn-sm btn-default" @click ="delete_project(list.id)">
                                                   <i class="fa fa-trash-o text-danger" aria-hidden="true"></i></button>
                                                </div>
                                             </div>
                                             <div class="project-value">
                                             </div>
                                             <div class="project-people">
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div id="tab-2"  v-if="isActive == 'tab_2'" class="tab-pane active">
                        <div class="panel-body">
                           <button type="button" @click ="custmerModel = true"  class="btn project-color  pull-right addcustomer" data-toggle="modal" data-target="#addcustomer">
                           add customer
                           </button>
                        </div>
                        <div class="panel-body">
                           <div class="panel-body list">
                              <div  v-if="user_role === 'admin'" class="table-responsive project-list">
                                 <table class="table table-striped" id="customer_table">
                                    <thead>
                                       <tr>
                                          <th>Name</th>
                                          <th>Email</th>
                                          <th>Project count</th>
                                          <th>Action</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr  v-for="list in customers_list.data"  v-bind:key="list.id">
                                          <td>{{list.name}}</td>
                                          <td>{{list.email}}</td>
                                          <td><strong>{{list.projectCount}}</strong></td>
                                          <td>
                                             <a @click="customer_view(list.id)"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                             &nbsp;&nbsp;&nbsp;
                                             <a @click="delete_coustmer(list.id)"><i class="fa fa-trash" aria-hidden="true"></i></a>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="modal_boxs fade in" v-if="addprojectModel">
      <div class="modal-dialog">
         <!-- Modal content-->
         <div class="modal-content">
            <div class="modal-header">
               <button type="button" class="close addproject"   @click="addprojectModel = false" >&times;</button>
               <h4 class="modal-title">Add Project</h4>
            </div>
            <div class="modal-body">
               <div class="hpanel form-horizontal">
                  <div class="form-group">
                     <label class="col-sm-2 control-label">Tittle</label>
                     <div class="col-sm-10">
                        <input type="text" v-model="title" id="project_title" class="form-control" name="title" placeholder="tittle">
                     </div>
                  </div>
                  <div class="form-group">
                     <label class="col-sm-2 control-label">Description</label>
                     <div class="col-sm-10">
                        <textarea v-model="description"  placeholder="Description" id="project_description" class="form-control" name="description">
                        </textarea>
                     </div>
                  </div>
                  <div class="form-group">
                     <label class="col-sm-2 control-label">customers</label>
                     <div class="col-sm-10">
                        <select  v-model="customer_id" class="form-control m-b js-source-states-2" name="customer_id[]" multiple="multiple">
                           <option value="">Select Customes</option>
                           <option v-for="list in customers_list.data"  v-bind:value="list.id" v-bind:key="list.id">{{list.name}}</option>
                        </select>
                     </div>
                  </div>
                  <div class="hr-line-dashed"></div>
                  <div class="form-group">
                     <div class="col-sm-10 col-sm-offset-2">
                        <button  v-if ="addprojectButton" class="btn project-color  pull-right" style="width: 30%;" type="button" @click="add_project" >Add Project</button>
                        <button v-if="updateprojectButton" class="btn project-color pull-right"  style="width: 30%;" type="button" @click ="update_project(project_id)" >Save</button>
                     </div>
                  </div>
               </div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-default addproject"  @click="addprojectModel = false">Close</button>
            </div>
         </div>
      </div>
   </div>
   <div id="addcustomer" class="modal_boxs fade in" v-if="custmerModel">
      <div class="modal-dialog">
         <!-- Modal content-->
         <div class="modal-content">
            <div class="modal-header">
               <button type="button" class="close addcustomer"  @click ="custmerModel = false"  data-dismiss="modal">×</button>
               <h4 class="modal-title">Add Customer</h4>
            </div>
            <div class="modal-body">
               <div class="hpanel">
                  <div class="form-group row">
                     <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                     <div class="col-md-6">
                        <input type="text" v-model="customer_name" id="customer_name" class="form-control " name="name" value="" required="" autocomplete="name" autofocus="">
                     </div>
                  </div>
                  <div class="form-group row">
                     <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                     <div class="col-md-6">
                        <input id="customer_email" v-model="customer_email"   type="email" class="form-control " name="email" value="" required="" autocomplete="email">
                     </div>
                  </div>
                  <div class="form-group row">
                     <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                     <div class="col-md-6">
                        <input id="customer_password" v-model="customer_password" type="password" class="form-control " name="password" required="" autocomplete="new-password">
                        <span v-if="error" class="invalid-feedback alert-warning" role="alert" id="pass">
                        <strong> The password must be at least 8 characters</strong>
                        </span>
                     </div>
                  </div>
                  <div class="form-group row mb-0">
                     <div class="col-md-6 offset-md-4">
                        <button @click="add_customer()" v-if="customerButton" type="submit" class="btn project-color" id="register_btn">
                        Add Customer
                        </button>
                        <button v-if="updatecustomerButton" @click="update_customer(customerupdate_id)" type="button" class="btn project-color" id="update_btn">
                        save
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <div class="modal-footer">
               <button type="button"  @click ="custmerModel = false" class="btn btn-default addcustomer" data-dismiss="modal">Close</button>
            </div>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
   name:'app',
   data(){
      return {
          username:sessionStorage.getItem('name'),
          Authorization:{ 'Authorization': 'Bearer  ' +sessionStorage.getItem('token')},
          project_count:'',
          customer_count:'',
          complete_count:'',
          task_count:'',
          un_complete_count:'',
          projects_list:'',
          customers_list:'',
          title:'',
          description:'',
          customer_id:[],
          isActive:"tab_1",
          user_role:sessionStorage.getItem('role'),
          project_id:'',
          addprojectModel: false,
          addprojectButton:true,
          updateprojectButton:false,
          custmerModel: false,
          customerupdate_id:'',
          customer_name:'',
          customer_email:'',
          customer_password:'',
          customerButton:true,
          updatecustomerButton:false,
          error:false,

      }
   },
   methods:{
      logout(){

            sessionStorage.clear();
            this.$router.push('/');
       },
      tab_one(){

          this.isActive = 'tab_1';
      },
       tab_two(){

          this.isActive = 'tab_2';
      },
     
      delete_project(id){

          axios.delete('http://127.0.0.1:8000/api/projects/' + id, {
                    headers:this.Authorization,
                })
                .then((response) => {
                    location.reload(true);
                })
      },
      add_project(){
   
            let url = 'http://127.0.0.1:8000/api/projects';
            let data = { 
              "title": this.title,
              "description":this.description,
              "customer_id":this.customer_id
            }
            axios.post(url,data,{
                  headers:this.Authorization,
            })
            .then((response) => {

               location.reload(true);  
            })
            .catch(error => {
                console.log(error)
            })
        },

        update_view(id){

            this.addprojectModel = true,
            this.addprojectButton = false;
            this.updateprojectButton = true;
            axios.get('http://127.0.0.1:8000/api/projects/' + id, {
                headers:this.Authorization,
            })
            .then((response) => {
                 this.title = response.data.data['title'],
                 this.description = response.data.data['description'],
                 this.project_id = response.data.data['id']
           
            })
        },
        update_project(id){

            let url = 'http://127.0.0.1:8000/api/projects/'+ id;
            let data = { 
                "title": this.title,
                "description":this.description,
                "customer_id":this.customer_id
             }
            axios.put(url,data,{
                  headers:this.Authorization,
            })
            .then((response) => {
                location.reload(true);   
            })
            .catch(error => {
                console.log(error);

            })

        },

        add_customer(){

              let url = 'http://127.0.0.1:8000/api/customers';

              if(this.customer_password.length == 8){
                  
                    let data = { 
                        "name": this.customer_name,
                        "email":this.customer_email,
                        "password":this.customer_password
                    }
                    axios.post(url,data,{
                        headers:this.Authorization,
                    })
                    .then((response) => {

                       location.reload(true); 
                        
                    })
                    .catch(error => {
                        console.log(error);
                        this.custmerModel = true;
                    })
            }

            else{

                this.error =true
            }
         
            
        },

      customer_view(id){

            this.custmerModel = true;
            this.updatecustomerButton = true,
            this.customerButton = false,
            axios.get('http://127.0.0.1:8000/api/customers/' + id, {
                headers:this.Authorization,
            })
            .then((response) => {
                 this.customer_name = response.data.data['name'],
                 this.customer_email = response.data.data['email'],
                 this.customerupdate_id = response.data.data['id']
           
            })
        },
       update_customer(id){

            let url = 'http://127.0.0.1:8000/api/customers/'+ id;
            let data = { 
                "name": this.customer_name,
                "email":this.customer_email
            }
            axios.put(url,data,{
                  headers:this.Authorization,
            })
            .then((response) => {
                location.reload(true);   
            })
            .catch(error => {
                console.log(error);

            })

        },

        
      delete_coustmer(id){
          axios.delete('http://127.0.0.1:8000/api/customers/' + id, {
                    headers:this.Authorization,
                })
                .then((response) => {
                    location.reload(true);
                })
           },

    },
 
   mounted(){
      let get_token = sessionStorage.getItem('token');

      if(get_token==null){

         this.$router.push('/');
      }
  
         axios.get('http://127.0.0.1:8000/api/projects', {
                headers:this.Authorization,
            })
            .then((response) => {
                this.projects_list = response.data
        })

         axios.get('http://127.0.0.1:8000/api/customers', {
                headers:this.Authorization,
            })
            .then((response) => {
                this.customers_list = response.data
        })

         axios.get('http://127.0.0.1:8000/api/projectCount', {
                headers:this.Authorization,
            })
            .then((response) => {
                this.project_count = response.data;
        })

          axios.get('http://127.0.0.1:8000/api/customerCount', {
                headers:this.Authorization,
            })
            .then((response) => {
                this.customer_count = response.data;
        })

         axios.get('http://127.0.0.1:8000/api/taskCount', {
                headers:this.Authorization,
            })
            .then((response) => {
                this.task_count = response.data['taskcount'];
                this.complete_count = response.data['complete_count'];
                this.un_complete_count = response.data['un_complete_count'];
        })
      
   }
}
</script>