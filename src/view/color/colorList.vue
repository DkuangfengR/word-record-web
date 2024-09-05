<template>
  <div>
    <div style="background:inherit;padding:10px">
      <div style="padding: 15px 0">
        <a-button type="primary" @click="addSwiper">新增</a-button>
      </div>
      <a-table
        ref="table"
        size="middle"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="pagination"
        :loading="loading"
        class="j-table-force-nowrap"
        @change="handleTableChange">
        <span slot="action" slot-scope="text,record">
          <a @click="editSwiper(record)">修改名称</a>
          <a-divider type="vertical" />
          <a @click="deleteSwiper(record)">删除</a>
          <a-divider type="vertical" />
          <a @click="setColor(record)">使用</a>
        </span>
      </a-table>
    </div>
    <swiper-model ref="swiperModel" @refresh="getListData" />
  </div>
</template>

<script>
import {listMixins} from '@/mixins/listMixins.js'
import SwiperModel from './modules/swiperModal.vue'
import {putAction, deleteAction} from '@/request/http.js'

export default {
  mixins:[listMixins],
  components:{
    SwiperModel
  },
  data(){
    return {
      columns: [
        {
          key:"id",
          title:'序号',
          align:"center",
          dataIndex: 'id',
          customRender:function(t,r,index){
            return parseInt(index) + 1
          }
        },
        {
          key:"color",
          title:'色值',
          align:"center",
          dataIndex: 'color'
        },
        {
          key:"desc",
          title:'描述',
          align:"center",
          dataIndex: 'desc'
        },
        
        {
          key:"status",
          title:'描述',
          align:"center",
          dataIndex: 'status',
          customRender:function(r){
            console.log('rrr',r)
            if(r == 0){
              return '未使用'
            }else{
              return '使用中'
            }
          }
        },
        {
          key:"action",
          title: '操作',
          dataIndex: 'action',
          align:"center",
          width:200,
          scopedSlots: { customRender: 'action' }
        }
      ],
    url:{
      list:"color/list"
    }
    }
  },
  created(){
    this.getListData()
  },
  methods:{
    addSwiper(){
      this.$refs.swiperModel.visible = true;
      this.$refs.swiperModel.openType = 'add'
    },
    editSwiper(record){
      this.$refs.swiperModel.visible = true;
      this.$refs.swiperModel.openType = 'edit'
      this.$nextTick(()=>{
        this.$refs.swiperModel.edit(record)
      })
    },
    deleteSwiper(record){
      deleteAction(`color/${record.id}`,{}).then(res=>{
        this.getListData()
      })
    },
    setColor(record){
      putAction('/color/setColor',{id:record.id}).then(res=>{
        if(res.code == 0){
          this.$message.success('编辑成功')
          this.getListData()
          this.$bus.$emit('changeBackground')
        }else{
          this.$message.warning(res.msg)
        }
      })
    }
  }

}
</script>

<style scoped>

</style>