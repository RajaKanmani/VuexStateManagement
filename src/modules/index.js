import Vue from 'vue'
import axios from 'axios';


const  state  = {
    task_count:'',
    username:sessionStorage.getItem('name'),
    Authorizations:{ 'Authorization': 'Bearer  ' +sessionStorage.getItem('token')},
    user_role:sessionStorage.getItem('role'),
    user_id:sessionStorage.getItem('user_id'),
    project_count:'',
    projects_list:[],
    customers_list:'',
    notes_list:[],
    task_list:[],
    collaborators_list:[],
    update_notes_list:'',
    url: "http://127.0.0.1:8000/api/",

};

const actions = {

    async login({commit}, data){
       await axios.post(state.url+'login', data)
         .then((response) => {
            if(response.status == 200){
                sessionStorage.setItem('token', response.data.token),
                sessionStorage.setItem('name', response.data.name),
                sessionStorage.setItem('role', response.data.role),
                sessionStorage.setItem('user_id', response.data.id);
                //this.$router.push({ path: '/dashboard' })
            }
        })
    },

    async Add_Project(context, data){
      await axios.post(state.url+'projects', data, {
           headers:state.Authorizations,
      })
      .then((response)=>{
          context.commit('ADD_PROJECT',response.data.data)
       })
       .catch(error => {
           console.log(error) 
      })
    },

    async Update_Project(context, data){
      await axios.put(state.url+'projects/'+ data.id, data, {
            headers:state.Authorizations,
       })
       .then((response)=>{
           context.commit('UPDATE_PROJECT',response.data.data)
        })
        .catch(error => {
            console.log(error) 
       }) 
    },

    async Delete_Project(context, id){
      await axios.delete(state.url+'projects/'+ id, {
            headers:state.Authorizations,
       })
       .then((response)=>{
           context.commit('DELETE_PROJECT',response.data.data['id'])
        })
        .catch(error => {
            console.log(error) 
       }) 
    },

    async Add_Customer(context , data){
      await axios.post(state.url+'customers', data, {
            headers:state.Authorizations,
       })
       .then((response)=>{
           context.commit('ADD_CUSTOMER', response.data.data)
        }) 
    },

    async Update_Customer(context, data){
       await axios.put(state.url+'customers/'+ data.id, data, {
            headers:state.Authorizations,
       })
       .then((response)=>{
           context.commit('UPDATE_CUSTOMER', response.data.data)
        })
        .catch(error => {
            console.log(error) 
       })  
    },

    async Delete_Customer(context, id){
       await axios.delete(state.url+'customers/'+ id, {
            headers:state.Authorizations,
       })
       .then((response)=>{
           context.commit('DELETE_CUSTOMER', response.data.data['id'])
        })
        .catch(error => {
            console.log(error) 
       })   
    },

    async Get_Project_Task(context, id){
      await axios.get(state.url+'projects/'+ id, {
            headers:state.Authorizations,
       })
       .then((response)=>{
           context.commit('GET_PROJECT_TASKS', response.data.data)
        })
        .catch(error => {
            console.log(error) 
       }) 
    },

    async Get_Collaborators(context, id){
      await axios.get(state.url+'collaborators/'+ id, {
        headers:state.Authorizations,
      })
      .then((response)=>{
          context.commit('GET_PROJECT_COLLABORTORS', response.data)
        })
        .catch(error => {
            console.log(error) 
      })        
    },

    async task_status({commit}){
      await axios.get(state.url+'taskCount', {
         headers:state.Authorizations,
      })
       .then((response) => {
         commit('setTaskcount', response.data);
        })
    },

    async get_project_list({commit}){
       await  axios.get(state.url+'projects', {
         headers:state.Authorizations,
       })
        .then((response) => {
          commit('setProjectList', response.data)
        })
    },

    async get_project_count({commit}){
       await  axios.get(state.url+'projectCount', {
          headers:state.Authorizations,
        })
        .then((response) => {
          commit('setProjectCount', response.data)
        })
    },

    async get_customer_list({commit}){
       await axios.get(state.url+'customers', {
          headers:state.Authorizations,
       })
       .then((response) => {
         commit('setCustomerList', response.data) 
       })
    },

    async list_task({commit}){
       await axios.get(state.url+'notes')
         .then((response) => {
           commit('SetList', response.data);
        })  
    },

    async add_task({commit}, data){
       await axios.post(state.url+'notes', data)
        .then((response) => {
           let commit_data ={"id":response.data.id ,"title": response.data.title};
           commit('Append_list', commit_data);
         })  
    },

    async remove_task({commit},data){
      await axios.delete(state.url+'notes/'+data)
       .then((response) => {
         commit('RemoveList', data);
       })    
    },

    async get_task_list({commit} , data){
      await axios.get(state.url+'notes/'+data)
       .then((response) => {
           let commit_data ={"id":response.data.id ,"title": response.data.title}
           commit('Update_note_list', commit_data);
        }) 
    },

    async update_note({commit}, data){
        commit('updateNote', data);
    },
};


const  mutations = { 
    ADD_PROJECT:(state , data)=>{
       let data_clone = Object.assign({}, data);
       state.projects_list.data.push(data_clone)
    },

    DELETE_PROJECT:(state, data)=>{
        let deleteIndex = state.projects_list.data.map(list => list.id).indexOf(data);
        state.projects_list.data.splice(deleteIndex, 1)
    },

    UPDATE_PROJECT:(state, data)=>{
       let updateIndex = state.projects_list.data.find(updateIndex => updateIndex.id === data.id);
       Object.assign(updateIndex, data)
    },

    DELETE_CUSTOMER:(state, data)=>{
        let deleteIndex = state.customers_list.data.map(list => list.id).indexOf(data);
        state.customers_list.data.splice(deleteIndex, 1)
    },

    ADD_CUSTOMER:(state, data)=>{
       let data_clone = Object.assign({}, data);
       state.customers_list.data.push(data_clone);
    },

    UPDATE_CUSTOMER:(state , data)=>{
        let updateIndex = state.customers_list.data.find(updateIndex => updateIndex.id === data.id);
        Object.assign(updateIndex,data)
    },

    GET_PROJECT_TASKS:(state, data)=>{
        let data_clone = Object.assign({}, data);
        state.task_list.push(data_clone);
    },

    GET_PROJECT_COLLABORTORS:(state, data)=>{
        let data_clone =Object.assign({}, data);
        state.collaborators_list.push(data_clone)
    },

    setTaskcount:(state, data)   => (state.task_count = data),

    setProjectList:(state , data) => (state.projects_list = data),

    setProjectCount:(state, data) =>  (state.project_count = data),

    setCustomerList:(state, data) => (state.customers_list = data),

    SetList:(state , data)=> (state.notes_list = data),

    Append_list:(state , data)=>{ 
        let data_clone = Object.assign({}, data);
        state.notes_list.unshift(data_clone)
     },

     Update_note_list:(state , commit_data)=>{
        state.update_notes_list = commit_data
     },

     updateNote:(state, data)=>{
        const item = state.notes_list.find(item => item.id === data.id);
        Object.assign(item, data);
     },

    RemoveList:(state , data)=>{ 
        let index = state.notes_list.findIndex(notes => notes.id === data);
        state.notes_list.splice(index ,1)
    }

};
const  getters ={
    getProjectList:(state) =>state.projects_list,
    getProjectCount:(state) =>state.project_count,
    getCustomerList:(state) =>state.customers_list,
    getNotesList:(state) => state.notes_list,
    getUpdateNotesList:(state) => state.update_notes_list,
    getTaskList:(state)=>state.task_list ,
    getCollaborators:(state)=>state.collaborators_list ,
        
};



export default {

   state,
   mutations,
   actions,
   getters
}