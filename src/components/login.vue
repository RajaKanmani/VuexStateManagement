<template>
    <div>
        <div class="login-container">
            <div class="row">
                <div class="col-md-12">
                    <div class="text-center m-b-md">
                        <h3><b>Sample application</b></h3>
                    </div>
                    <div class="hpanel">
                        <div class="panel-body">
                            <form action="#" id="loginForm">
                                <div class="form-group">
                                    <label class="control-label" for="username">Username</label>
                                    <input type="text"  v-model="email" name="username" id="username" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label class="control-label" for="password">Password</label>
                                    <input type="password" v-model="password" title="Please enter your password"  value="" name="password" id="password" class="form-control">
                                </div>
                                
                                <button class="btn  btn-block project-color" @click="submit()" type ="button" >Login</button>
                            </form>
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
      name: 'app',
    data(){
        return {
          email:'',
          password:'',
          project_count:'',
          

        }
    },
    methods: {
      submit(){
         let url = 'http://127.0.0.1:8000/api/login';
         axios.post(url, { 
           "email": this.email,
           "password":this.password
           })
        .then((response) => {

            if(response.status == 200){
                sessionStorage.setItem('token', response.data.token),
                sessionStorage.setItem('name',response.data.name),
                sessionStorage.setItem('role',response.data.role),
                this.$router.push('dashboard');
            }
        })
         .catch(error => {
            console.log(error)
        })
      .finally(() => this.loading = false)
      }

    },
    mounted(){
      let get_token = sessionStorage.getItem('token');

      if(get_token){
          this.$router.push('/dashboard');
      }
        axios.get('http://127.0.0.1:8000/api/tasks/'+ this.$route.params.id, {
                headers:this.Authorization,
            })
            .then((response) => {
                this.project_count = response;
        })
    
    }
}
</script>

