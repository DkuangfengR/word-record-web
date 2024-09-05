import axios from 'axios'
import vue from 'vue'
import store from '@/store/vuex.js'
import {Modal,notification} from 'ant-design-vue'

const request  = axios.create({
  baseURL:process.env.VUE_APP_BASE_URL,
  timeout:60000
})
request.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if(token){
    config.headers.token = token
  }
  return config
}, err => {
  return Promise.reject(err)
})
request.interceptors.response.use(response => {
  let code = response.data.code;
  if (code == 0 || code == -1 || !code){
    return response.data
  }else if (code == -2){
    Modal.error({
      title: '登录已过期',
      content: '很抱歉，登录已过期，请重新登录',
      okText: '重新登录',
      mask: false,
      onOk: () => {
        store.commit('removepermission')
        localStorage.removeItem('token')
        window.location.reload()
      }
    })
  }
},err=>{
  notification.open({
    message: '错误提示',
    description:
      '网络请求错误，请稍后重试',
    duration: 4.5,
  });
})
export default request