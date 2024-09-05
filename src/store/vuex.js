import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    permission:null,
    menu:null
  },
  mutations:{
    addpermission(state,payload){
      state.permission = payload
    },
    removepermission(state){
      state.permission = []   
    },
    addmenu(state,payload){
      state.menu = payload
    },
    removemenu(state){
      state.menu = ''  
    }
  },
  getters:{
    getpermission:(state)=>{
      return state.permission
    }
  }
})
export default store