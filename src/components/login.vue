<template>
    <div>
    <div class="login-container">
        <div class="row">
            <div class="col-md-12">
                <div class="text-center m-b-md">
                <h3><b>Sample application</b></h3>
                </div>
                <div class="hpanel">
                <div class="form-group alert-warning" v-if="error">
                    <div class="error_show" role="alert">
                        <strong>These credentials do not match our records.</strong>
                    </div>
                </div>
                <div class="panel-body">
                    <form action="#" id="loginForm">
                        <div class="form-group">
                            <label class="control-label" for="username">Username</label>
                            <input type="text"  v-model="userData.email" name="username" id="username" class="form-control">
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="password">Password</label>
                            <input type="password" v-model="userData.password" title="Please enter your password"  value="" name="password" id="password" class="form-control">
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
          userData:{ email:'',  password:'',},
          error: false,
        }
    },
    methods: {
      submit(){
        this.$store.dispatch('login', this.userData).then(() => {
            this.$router.push('/dashboard')
         })
      }

    },

}
</script>

