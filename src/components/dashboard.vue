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
   <div class="content"  style="padding:15px;">
      <div class="row"  v-if="user_role === 'admin'">
         <div class="col-lg-3">
            <div class="hpanel hyellow">
               <div class="panel-body    text-center h-200">
                  <i class="pe-7s-graph1 fa-4x"></i>
                  <h1 class="m-xs count">{{getProjectCount}}</h1>
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
                     <h1 class="count_task text-dashboard">{{getTask_count.taskcount}}</h1>
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
                           <h4 class="complete_count text-dashboard">{{getTask_count.complete_count}}</h4>
                        </div>
                        <div class="col-xs-7">
                           <small class="stat-label">Pending</small>
                           <h4 class="un_complete_count text-dashboard">{{getTask_count.un_complete_count}}</h4>
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
   <div class="content"  style="padding: 0px;">
      <div class="section_homes">
         <!-- <div class="col-md-4">
            <div class ="input-group">
                 <input class="form-control" type="text" v-model="search" placeholder="Search projects..">
                 <div class="input-group-btn">
                    <button class="btn btn-default"><i class="fa fa-search"></i></button>
                 </div>
              </div>
            </div> -->
         <div class="panel-body">
            <div class="col-lg-12" style="padding: 0px;">
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
                              <div class="col-lg-4" id="click_section"  v-for="list in getProjectList.data" v-bind:key="list.id">
                                 <div class="hpanel  hblue">
                                    <!-- <div  class="total_task"><p>Tasks</p><b>{{list.total_task}}</b></div> -->
                                    <div class="panel-body">
                                       <div class="row">
                                          <router-link :to="{ name: 'task',  params: { id: list.id } }">
                                             <div class="col-sm-12" style="padding:0px;">
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
                                             <div class="project_details">
                                                <div class="col-sm-3">
                                                   <div class="project-label">TASKS</div>
                                                   <small>{{list.total_task}}</small>
                                                </div>
                                                <div class="col-sm-4">
                                                   <div class="project-label">COLLABORATOR</div>
                                                   <small>{{list.collaborators_count}}</small>
                                                </div>
                                                <div class="col-sm-3">
                                                   <div class="project-label">DEDLINE</div>
                                                   <small>12.06.2015</small>
                                                </div>
                                                <div class="col-sm-3">
                                                </div>
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
                                       <tr  v-for="list in getCustomerList.data"  v-bind:key="list.id">
                                          <td style="position: relative;"><p v-if="list.is_active =='1'" class="online_status"></p>{{list.name}}</td>
                                          <td>{{list.email}}</td>
                                          <td><strong>{{list.projectCount}}</strong></td>
                                          <td>
                                             <a @click="customer_view(list.id)"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                             &nbsp;&nbsp;&nbsp;
                                             <a @click="delete_customer(list.id)"><i class="fa fa-trash" aria-hidden="true"></i></a>
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
               <button type="button" class="close addproject"   @click="addprojectModel = false " >&times;</button>
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
                           <option v-for="list in getCustomerList.data"  v-bind:value="list.id" v-bind:key="list.id">{{list.name}}</option>
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
               <button type="button" class="close addcustomer"  @click ="custmerModel = false , updatecustomerButton = false ,customerButton = true"  data-dismiss="modal">×</button>
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
 <!-- <li v-for="cat in getTask_count" :key="cat.id">
        {{cat.id}}
    </li> -->
</div>
</template>

<script>
import axios from 'axios';
import {mapGetters,mapActions}  from 'vuex';

export default {
   name:'app',
   computed:{
           ...mapGetters(['getTask_count','getProjectList','getProjectCount','getCustomerList'])
      },
   data(){
      return {
          username:sessionStorage.getItem('name'),
          Authorization:{ 'Authorization': 'Bearer  ' +sessionStorage.getItem('token')},
          user_role:sessionStorage.getItem('role'),
          user_id:sessionStorage.getItem('user_id'),
          customer_count:'',
          customers_list:'',
          title:'',
          description:'',
          customer_id:[],
          isActive:'tab_1',
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
          password_error: false,
      }
   },

   methods:
   {
      ...mapActions([
            'task_status', 'get_project_list',  'get_project_count',  'get_customer_list',  'Add_Project',  'Delete_Project',
            'Update_Project', 'Add_Customer', 'Delete_Customer', 'Update_Customer'  ]),
 
   add_project() {
      let data = { "title": this.title,  "description": this.description, "customer_id": this.customer_id};
      this.$store.dispatch('Add_Project', data).then(()=>{
         this.addprojectModel = false
         this.title = '',
         this.description = '',
         this.project_id = ''
         this.task_status();
         this.get_project_count();
         this.get_customer_list();
      })    
   },

   update_project(id) {
      let data = {"id":id,"title": this.title,  "description": this.description, "customer_id": this.customer_id};
      this.$store.dispatch('Update_Project', data).then(()=>{
         this.addprojectModel = false
         this.title = '',
         this.description = '',
         this.project_id = ''
         this.task_status();
         this.get_project_count();
         this.get_customer_list();
      })   
   },

   add_customer() {
       this.customerButton = true
       if (this.customer_password.length == 8) {
           let data = {"name": this.customer_name,"email": this.customer_email, "password": this.customer_password};
           this.$store.dispatch('Add_Customer',data).then(()=>{
               this.custmerModel = false
               this.customer_name = '',
               this.customer_email = '',
               this.customer_password = ''  
           })
       }
        else {
          this.error = true
       }
   },
   
   update_view(id) {
      this.addprojectModel = true,
      this.addprojectButton = false;
      this.updateprojectButton = true;
       axios.get('http://127.0.0.1:8000/api/projects/' + id, {
         headers: this.Authorization,
        })
        .then((response) => {
         this.title = response.data.data['title'],
          this.description = response.data.data['description'],
          this.project_id = response.data.data['id']

        })
   },
              
   delete_project(id) {
      this.$store.dispatch('Delete_Project', id)
      this.task_status();
      this.get_project_count();
      this.get_customer_list();
   },


   delete_customer(id) {
        this.$store.dispatch('Delete_Customer', id)
        this.task_status();
        this.get_project_count();
        this.get_customer_list();
   },

   customer_view(id) {
        this.custmerModel = true;
        this.updatecustomerButton = true,
        this.customerButton = false,
        axios.get('http://127.0.0.1:8000/api/customers/' + id, {
          headers: this.Authorization,
        })
        .then((response) => {
           this.customer_name = response.data.data['name'],
           this.customer_email = response.data.data['email'],
           this.customerupdate_id = response.data.data['id']

        })
      },

   update_customer(id){
      let data = {"id":id,"name": this.customer_name,"email": this.customer_email};
      this.$store.dispatch('Update_Customer',data).then(()=>{
           this.custmerModel = false,
           this.customer_name = '',
           this.customer_email = ''
      })

   },
         
   logout() {
     axios.get('http://127.0.0.1:8000/api/logout/' + this.user_id, {
            headers: this.Authorization,
       })
       .then((response) => {
         sessionStorage.clear();
         this.$router.push('/');
      })
    },

   tab_one() {
      this.isActive = 'tab_1';
   },

   tab_two() {
      this.isActive = 'tab_2';
   },

},

     
   mounted(){
       this.task_status();
       this.get_project_list();
       this.get_project_count();
       this.get_customer_list();
       let get_token = sessionStorage.getItem('token');
       if (get_token == null) {
         this.$router.push('/');
       }

      axios.get('http://127.0.0.1:8000/api/customerCount', {
           headers: this.Authorization,
        })
        .then((response) => {
            this.customer_count = response.data;
        })
   },
      
 }
</script>