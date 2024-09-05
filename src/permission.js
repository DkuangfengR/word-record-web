import Vue from 'vue'
import router from './router/router'
import store from './store/vuex'
import {getAction} from '@/request/http.js'
const whiteList = ['/login']
router.beforeEach((to,from,next)=>{
  // 获取token
  var token = localStorage.getItem('token');
  // 存在token 或者 在白名单中
  if(token || whiteList.includes(to.path)){
    if(token && to.path == '/login'){
      next('/')
    }else if(token){
      // 不存在权限信息
      if(!store.state.permission){
        // let username = localStorage.getItem('username')
        // getAction(`menu/${username}`,{}).then(res=>{
        //   if(res.code == 0){
        let res = [
          {
            key:"",
            name:""
          }
        ]
        let permission = res;
        let new_permission = permission.map(ele=>{
          let pathObj = {}
          pathObj.path = '/' + ele.path
          pathObj.component = () => import(`@/view/${ele.path}/${ele.path}`)
          return pathObj
        });
            // 添加路由
        router.addRoutes(new_permission)
        // 将数据赋值给store  用来渲染侧边栏
        store.commit('addpermission',permission);
        next({ ...to, replace: true })
        //   }
        // })    
      }
      // 进行跳转
      next()
    }else{
      next()
    }
  }else{
    // 两者都不满足 返回登录页
    next('/login')
  }
})