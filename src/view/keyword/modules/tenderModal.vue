<template>
  <a-modal
      title="修改单词本"
      :visible="visible"
      v-if="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="50%"
    >
    <div>

      <a-form layout="inline" :labelCol="labelCol" :wrapperCol="wrapperCol">
      
        <a-form-item label="单词本" style="width:100%">
          <a-select v-model="group_id" style="width:100%">
            <a-select-option v-for="row,index in category" :key="index" :value="row.uuid">
              {{row.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      
    </div>
  </a-modal>
</template>
<script>
import {getAction,putAction} from '@/request/http.js'

export default {
  data(){
    return {
      visible:false,
      confirmLoading:false,
      tenderList:null,
      url:{
        tender:'tender/byTaskId'
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      group_id:null,
      category:null,
      id:null
    }
  },
  methods:{
    handleOk(){
      putAction('keyword/put',{id:this.id,group_id:this.group_id}).then(res=>{
        console.log('res',res)
        this.$message.success('操作成功')
        this.closeModal()
        this.$emit('refresh')
      })
    },
    handleCancel(){
      console.log('cancel')
      this.closeModal()
    },
    closeModal(){
      this.visible = false;
      this.group_id = ''
    },
    getCate(){
      getAction('category/list',{page:1,size:100}).then(res=>{
        console.log(res)
        this.category = res.result
      })
    },
  }
}
</script>