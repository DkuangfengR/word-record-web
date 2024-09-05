<template>
<a-locale-provider :locale="zh_CN">
  <div id="app">
    <menus>
      <router-view></router-view>
    </menus>
  </div>
</a-locale-provider>
</template>

<script>
import Menus from 'view/menu/menu'
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");
export default {
  name: 'App',
  components:{
    Menus
  },
  data() {
    return {
      zh_CN,
    };
  },
}
</script>


<style>
@import "assets/index.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  width:100%;
  height: 100%;
}
</style>
