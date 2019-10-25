import Vue from 'vue'
import Vuex from 'vuex'
import Task from '@/modules/index';

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        Task
    }
   
})