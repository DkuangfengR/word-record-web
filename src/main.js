import Vue from 'vue'
import App from './App.vue'
import Antd  from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router/router'
import store from './store/vuex'
import './permission.js'
Vue.use(Antd)
Vue.config.productionTip = false

//main.js
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});

Vue.prototype.$bus = new Vue()


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
