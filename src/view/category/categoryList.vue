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
        </span>
      </a-table>
    </div>
    <swiper-model ref="swiperModel" @refresh="getListData" />
  </div>
</template>

<script>
import {listMixins} from '@/mixins/listMixins.js'
import SwiperModel from './modules/swiperModal.vue'
import {deleteAction} from '@/request/http.js'

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
          key:"keyword",
          title:'单词本',
          align:"center",
          dataIndex: 'name'
        },
        
        {
          key:"create_time",
          title:'发布时间',
          align:"center",
          dataIndex: 'create_time'
        },
        {
          key:"action",
          title: '操作',
          dataIndex: 'action',
          align:"center",
          width:147,
          scopedSlots: { customRender: 'action' }
        }
      ],
    url:{
      list:"category/list"
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
      deleteAction(`category/${record.id}`,{}).then(res=>{
        this.getListData()
      })
    }
  }

}
</script>

<style scoped>

</style>