
import Login from './components/login.vue'
import Dashboard from './components/dashboard.vue'
import Task from './components/task.vue'


const routes = [
    { 
       path: '/',
       name:'login',
       component: Login
     },
     { 
      path: '/dashboard',
      name:'dashboard',
      component: Dashboard
    },
    { 
      path: '/task/:id',
      name:'task',
      component: Task
    },
];

export default routes;