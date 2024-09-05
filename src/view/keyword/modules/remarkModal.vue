<template>
  <a-modal
      title="备注"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="50%"
      v-if="visible"
    >
    <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-form-item label="备注">
        <a-input type="textarea" v-decorator="['remark',{rules:[{required:true,message:'备注为必填项'}]}]" />
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
      model:null,
      id:null
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
          Object.assign(this.model,value)
          putAction('/keyword/remark',{...this.model,id:this.id}).then(res=>{
            if(res.code == 0){
              this.$message.success('编辑成功')
              this.$emit('refresh')
              this.closeModal()
            }else{
              this.$message.warning(res.msg)
            }
          })
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