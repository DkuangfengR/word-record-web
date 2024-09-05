<template>
  <div style="background:inherit;padding:10px;border-radius:5px;color:#8c8c8c" class="keyword">
    <!-- 条件筛选部分 -->
    <a-form layout="inline" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row :gutter="24" style="line-height:50px">
        
        <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item label="单词">
            <a-input placeholder="请输入单词" v-model="queryParam.keyword"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item label="单词本" style="width:100%">
            <a-select v-model="queryParam.group_id">
              <a-select-option v-for="row,index in category" :key="index" :value="row.uuid">
                {{row.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item label="排序方式" style="width:100%">
            <a-select v-model="queryParam.sort">
              <a-select-option  value="create_time">
                时间
              </a-select-option>
              <a-select-option  value="keyword">
                关键词
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xl="8" :lg="7" :md="8" :sm="24">
          <a-form-item label="收藏时间">
            <a-range-picker @change="onChange" v-model="queryParam.time" />
          </a-form-item>
        </a-col>
        <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <span style="float: left;overflow: hidden;display: inline-block;line-height: 40px;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

            <a-button type="primary" @click="download" icon="reload" style="margin-left: 8px">导出</a-button>

          </span>
        </a-col>
      </a-row>
    </a-form>
    <!-- table部分 -->
    <div style="margin-top:10px">
      <div class="action-area">
        <a-button type="primary" :disabled="selectedRowKeys.length <= 0" style="margin-bottom:15px" @click="bulkChange">批量修改</a-button>
        
        <div style="width:15px;"></div>
        <a-popconfirm
          title="请确认是否进行批量删除"
          ok-text="是"
          cancel-text="否"
          @confirm="bulkDelete"
          :disabled="selectedRowKeys.length <= 0"
        >
          <a-button type="primary" :disabled="selectedRowKeys.length <= 0" style="margin-bottom:15px">批量删除</a-button>
        </a-popconfirm>
        <div style="width:15px;"></div>

        <!-- <div style="margin-bottom:15px">
          <span style="vertical-align: bottom;margin-right: 10px;">释义:</span>
          <a-switch @change="showDefinition" />
        </div> -->
      </div>
      
      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="pagination"
        :loading="loading"
        class="j-table-force-nowrap"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange">
        <span slot="action" slot-scope="text,record">
          <a @click="previewInfo(record)">查看</a>
          <a-divider type="vertical" />
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              更多<a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="changeCateogry(record)">修改单词本</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="changeRemark(record)">备注设置</a>
              </a-menu-item>
              <a-menu-item >
                <a-popconfirm
                  title="是否删除此收藏?"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="confirmDelete(record.id)"
                >
                  <a href="javascript:;">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
         
        </span>

        <span class="" slot="heavy" slot-scope="text,record">
          <span v-html="text"></span>
        </span>


        <span slot="definition" slot-scope ="text,record">
          <!-- <div v-if="definition">{{text?text.replace(/_/g,'\r\n'):''}}</div> -->
          <div v-if="definition">
            <div v-html="text.replace(/_/g,'<br>')"></div>
          </div>

          <span v-else>*******</span>
        </span>
      </a-table>
    </div>
    <detail-modal ref="detailModal"></detail-modal>
    <tender-modal ref="tenderModal" @refresh="refresh"></tender-modal>
    <remark-model ref="markModal" @refresh="getListData"/>
  </div>
</template>
<script>
import {listMixins} from '@/mixins/listMixins.js'
import DetailModal from './modules/detailModal.vue'
import TenderModal from './modules/tenderModal.vue'
import RemarkModel from './modules/remarkModal.vue'
import {getAction,putAction,deleteAction} from '@/request/http.js'
import { postAction } from '../../request/http'
export default {
  mixins:[listMixins],
  data(){
    return {
      columns: [
          {
            key:"1",
            title:'序号',
            align:"center",
            dataIndex: 'id',
            customRender:function(t,r,index){
              return parseInt(index) + 1
            }
          },
          {
            key:"111",
            title:'关键词',
            align:"center",
            dataIndex: 'keyword',
          },
          {
            key:"2",
            title:'重音',
            align:"center",
            dataIndex: 'keyword_html',
            scopedSlots:{
              customRender:"heavy"
            }
          },
          {
            key:"3",
            title:'释义',
            align:"center",
            dataIndex: 'definition',
            scopedSlots:{
              customRender:"definition"
            }
          },
          {
            key:"5",
            title:'单词本',
            align:"center",
            dataIndex: 'name',
            customRender:(c)=>{
              return c || '默认'
            }
          },
          
          {
            key:"9",
            title:'收藏时间',
            align:"center",
            dataIndex: 'create_time'
          },
          {
            key:"10",
            title: '操作',
            dataIndex: 'action',
            align:"center",
            width:147,
            scopedSlots: { customRender: 'action' }
          }
      ],
      category:[
        {
          type:'design',
          name:'设计'
        },
        {
          type: 'purchase',
          name: '采购'
        },
        {
          type:"device",
          name: '工业设备'
        },
        {
          type:'process',
          name: '加工/处理'
        },
        {
          type: 'soft',
          name:'软件/信息化'
        },
        {
          type:"zhaopin",
          name:'招聘'
        }
      ],
      url:{
        list:"keyword/list",
        pass:"task/pass",
        fail:"task/fail",
        effect:"task/effect"
      },
      definition:false
    }
  },
  components:{
    DetailModal,
    TenderModal,
    RemarkModel
  },
  created(){
    this.getListData()
    this.$bus.$on('definition',(e)=>{
      console.log('e',e)
      this.definition = e
    })
  },
  mounted(){
    this.getCate()
  },
  methods:{
    onChange(a,b){
      this.queryParam.start_time = b[0]
      this.queryParam.end_time = b[1]
    },
    // 查看数据
    previewInfo(info){
      this.$refs.detailModal.visible = true;
      this.$nextTick(()=>{
        this.$refs.detailModal.showInfo(info)
      })
    },

    getCate(){
      getAction('category/list',{page:1,size:100}).then(res=>{
        console.log(res)
        this.category = res.result
      })
    },

    changeCateogry(info){
      this.$refs.tenderModal.visible = true;
      this.$refs.tenderModal.id = [info.id];
      this.$refs.tenderModal.group_id = info.group_id

      this.$nextTick(()=>{
        this.$refs.tenderModal.getCate()
      })
    },

    bulkChange(){
      this.$refs.tenderModal.visible = true;
      this.$refs.tenderModal.id = this.selectedRowKeys;
      // this.$refs.tenderModal.group_id = info.group_id

      this.$nextTick(()=>{
        this.$refs.tenderModal.getCate()
      })
    },

    confirmDelete(id){
      deleteAction(`keyword/${id}`,{}).then(res=>{
        this.$message.success('删除成功')
        this.getListData()
      })
    },
    bulkDelete(){
      deleteAction(`keyword/delete`,{},this.selectedRowKeys).then(res=>{
        this.selectedRowKeys = []
        this.$message.success('删除成功')
        this.getListData()
      })
    },
    
    download(){
      postAction('download',this.queryParam).then(res=>{
        console.log('res',res)
        window.open(`${process.env.VUE_APP_BASE_URL}download?file_name=${res.file_name}`)
      })
    },

    

    refresh(){
      this.selectedRowKeys = [];
      this.getListData()
    },

    changeRemark(e){
      this.$refs.markModal.visible = true;
      this.$refs.markModal.id = e.id;

      this.$nextTick(()=>{
        this.$refs.markModal.edit({remark:e.remark})
      })
    }
    
   
    
  }
}
</script>
<style scoped>
.keyword >>> h2 b{
  color: red;
}
.keyword >>> h2{
  margin: 0 !important;
}
.action-area{
  display: flex;
  align-items: center;
}
</style>