import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import {store} from './store/store';

Vue.config.productionTip = false;


Vue.use(VueRouter,axios,VueAxios,BootstrapVue);

const router = new VueRouter({routes});



new Vue({
  render: h => h(App),
  store: store,
  router,
}).$mount('#app');