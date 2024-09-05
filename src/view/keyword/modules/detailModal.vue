<template>
  <a-modal
      title="单词查看"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="50%"
      v-if="visible"
    >
    <div>
        <div>
          <div v-html="keyword_html"></div>
          <div>
            <div v-html="definition" ></div>

          </div>
          
          
        </div>
        <div>
          <div v-html="industry_definition"></div>
        </div>

        <div>
          <div v-html="anagram"></div>
        </div>

    </div>
  </a-modal>
</template>
<script>
import PreviewImg from './previewImg.vue'
import {getAction,postAction} from '@/request/http.js'
import { off } from 'process'
export default {
  data(){
    return {
      form:this.$form.createForm(this, { name: 'normal_login' }),
      visible:false,
      confirmLoading:false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      disabled:false,
      info:null,


      keyword_html:null,
      definition:null,
      industry_definition:null,
      anagram:null,
      
    }
  },

  methods:{

    showInfo(e){
      getAction('keyword/byId',{id:e.id}).then(res=>{
        if (res.code ==0){
          let result = res.result[0]
          this.keyword_html = result.keyword_html;

          this.definition = result.definition.replace(/_/g,'<br>')
          this.industry_definition = result.industry_definition
          this.anagram = result.anagram
        }
      })
      
    },
    handleOk(){
      this.closeModal()
      // if (!this.disabled){
      //   this.form.validateFields((err,value)=>{
      //     let info = Object.assign({},this.info,value);
      //     postAction('task/update',info).then(res=>{
      //       if(res.code == 0){
      //         this.$message.success('修改成功')
      //         this.closeModal();
      //         this.$parent.getListData()
      //       }else{
      //         this.$message.warning(res.msg)
      //       }
      //     })
      //   })
      // }else{
      //   this.closeModal()
      // }
      
    },
    handleCancel(){
      console.log('cancel')
      this.closeModal()
    },
    closeModal(){
      this.visible = false
    }
  }
}
</script>