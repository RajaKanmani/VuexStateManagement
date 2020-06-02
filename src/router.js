
import Login from './components/login.vue'
import Dashboard from './components/dashboard.vue'
import Task from './components/task.vue'
import Taskview from './components/taskview.vue'
import Notes from './components/notes.vue'

function authcheck(to, from, next){
    let get_token = sessionStorage.getItem('token');
    if(get_token){
       next()
    }
    else{
        next('/');
    }
}

const routes = [

    { 
       path: '/',
       name:'login',
       component: Login
     },
     { 
      path: '/dashboard',
      beforeEnter: authcheck,
      name:'dashboard',
      component: Dashboard
    },
    { 
      path: '/task/:id',
      beforeEnter: authcheck,
      name:'task',
      component: Task
    },
    { 
      path: '/taskview',
      beforeEnter: authcheck,
      name:'Taskview',
      component: Taskview
    },

    { 
      path: '/notes',
      beforeEnter: authcheck,
      name:'notes',
      component: Notes
    },

];


export default routes;
