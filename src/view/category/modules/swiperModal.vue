<template>
  <a-modal
      title="单词本"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="50%"
      v-if="visible"
    >
    <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-form-item label="单词本名称">
        <a-input v-decorator="['name',{rules:[{required:true,message:'单词本名称为必填项'}]}]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import {getAction, postAction, putAction} from '@/request/http.js'
import UploadImg from '@/components/upload/uploadImg'
export default {
  data(){
    return {
      visible:false,
      confirmLoading:false,
      form:this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      openType:null,
      model:null
    }
  },
  components:{
    UploadImg
  },

  methods:{
    handleOk(){
      this.form.validateFields((err,value)=>{
        console.log(err,value)
        if(!err){
          if (this.openType == 'add'){
            postAction('/category/add',value).then(res=>{
              if(res.code == 0){
                this.$message.success('添加成功')
                this.$emit('refresh')
                this.closeModal()
              }else{
                this.$message.warning(res.msg)
              }
            })
          }else if(this.openType == 'edit'){
            Object.assign(this.model,value)
            putAction('/category/add',this.model).then(res=>{
              if(res.code == 0){
                this.$message.success('编辑成功')
                this.$emit('refresh')
                this.closeModal()
              }else{
                this.$message.warning(res.msg)
              }
            })
          }
        }
      })
      // this.closeModal()
    },
    handleCancel(){
      this.closeModal()
    },
    closeModal(){
      this.visible = false
    },
    edit(e){
      this.model = Object.assign({},e);
      this.form.setFieldsValue(this.model)
    }
  }
}
</script>