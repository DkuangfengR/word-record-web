<template>
  <a-layout style="width:100%;height:100%" class="content">
    <a-layout-header v-if="this.$route.path != '/login'">
      <div class="top-title">单词本</div>
      <div class="log-out" @click="logout">退出登录</div>
    </a-layout-header>
    <a-layout :style='{backgroundColor:backgroundColor}'>
      <a-layout-sider v-if="this.$route.path != '/login'" style="background:inherit !important">
          <div>
            <a-menu 
              style="width:100%" 
              mode="inline" 
              :open-keys="openKeys"  
              @openChange="onOpenChange" 
              @select="select">

              <a-sub-menu key="sub4">
                <span slot="title"><a-icon type="setting" /><span>单词管理</span></span>
                <a-menu-item key="keyword/keywordList">
                  单词管理
                </a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="sub5">
                <span slot="title"><a-icon type="setting" /><span>单词本管理</span></span>
                <a-menu-item key="category/categoryList">
                  单词本
                </a-menu-item>
              </a-sub-menu>

              <a-sub-menu key="sub6">
                <span slot="title"><a-icon type="setting" /><span>颜色管理</span></span>
                <a-menu-item key="color/colorList">
                  颜色
                </a-menu-item>
              </a-sub-menu>
              <!-- <a-sub-menu key="sub6">
                <span slot="title"><a-icon type="setting" /><span>用户管理</span></span>
                <a-menu-item key="user/userList">
                  用户列表
                </a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="sub7">
                <span slot="title"><a-icon type="setting" /><span>冻结管理</span></span>
                <a-menu-item key="freeze/freezeList">
                  冻结列表
                </a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="sub8">
                <span slot="title"><a-icon type="setting" /><span>轮播图</span></span>
                <a-menu-item key="swiper/swiperList">
                  轮播图列表
                </a-menu-item>
              </a-sub-menu> -->
            </a-menu>

            <div style="margin-bottom:15px;text-align: center;margin-right: 20px;margin-top: 15px;">
              <span style="vertical-align: bottom;margin-right: 10px;">释义:</span>
              <a-switch @change="showDefinition" />
            </div>
          </div>
      </a-layout-sider>

      <a-layout-content>
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { mapGetters } from 'vuex'
import { getAction } from '../../request/http';
export default {
  data() {
    return {
      rootSubmenuKeys: ['sub4','sub5','sub6','sub7','sub8'],
      openKeys: ['sub4'],
      permission:[
        {
          keys:'',
          name:"任务管理",
          children:[
            {
              path:'taskList',
              name:'任务列表'
            },
            {
              path:'taskVerify',
              name:'审核任务'
            }
          ]
        },
      ],
      backgroundColor:'',
      definition:false
    }
  },
  created(){
    this.getBackground()
    this.$bus.$on('changeBackground',this.getBackground)
  },
  methods:{

    showDefinition(checked){
      console.log('checked',checked)
      this.definition = checked;
      this.$bus.$emit('definition',checked)
    },
    handleClick(e){
      this.$router.push('/'+ e.key)
    },
    logout(){
      localStorage.removeItem('token');
      this.$store.commit('removepermission')
      window.location.reload()
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    select(a,b,c){
      this.$router.push('/'+ a.key)
    },

    getBackground(){
      getAction('color/list',{page:1,size:100}).then(res=>{
        let color = '';
        res.result.forEach(ele=>{
          if(ele.status == 1){
            color = ele.color
          }
        })
        this.backgroundColor=color || '#f9ebeb8f'
      })
    },
    
  },
  computed:{
    ...mapGetters([
      'getpermission'
    ])
  }
}
</script>
<style scoped>
.top-title{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color:white
}
.content .ant-layout-sider{
  background: white;
  
}
.log-out{
  position: absolute;
  top: 0;
  color: white;
  right: 50px;
  cursor: pointer;
}
</style>
<style>
.ant-table-thead > tr > th{
  background-color: inherit !important;
}
.ant-menu{
  background:inherit !important
}

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
  background:inherit !important
}
.ant-table-placeholder{
  background:inherit !important

}
.ant-table-tbody > tr.ant-table-row-selected td{
  background:inherit !important
}
</style>