import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter)

const Login = () => import('view/login/login.vue')




const Category = () => import('view/category/categoryList')

const Keyword = () => import('view/keyword/keywordList')

const Color = () => import('view/color/colorList')

var routes = [
  {
    path:'/login',
    component:Login
  },
  {
    path:"/keyword/keywordList",
    component:Keyword
  },
  {
    path:"/category/categoryList",
    component:Category
  },
  {
    path:"/color/colorList",
    component:Color
  }
]
let router = new VueRouter({
  mode:'history',
  routes
})
export default router
