<template>
  <div class="clearfix">
    <a-upload
      :file-list="fileList"
      list-type="picture-card"
      :custom-request="handleUpload"
      @preview="handlePreview"
      :remove="removeImg">
      <div v-if="fileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
/* eslint-disable */
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
import {uploadAction} from '@/request/http.js'
export default {
  props:['value'],
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [
        // {
        //   uid: '-1',
        //   name: 'image.png',
        //   status: 'done',
        //   url:"https://keeper-dev.oss-cn-shanghai.aliyuncs.com/9599b0fd-be95-48d1-a309-6f10a98ab6a5.png"
        // }
      ]
    }
  },
  watch: {
    value(val = {}) {
      console.log('val',val)
      this.fileList = [{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url:val
      }]
    },
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handleUpload (e) {
      const formDdata = new FormData()
      formDdata.append('file', e.file)
      formDdata.append('type','swiper')
      uploadAction('upload', formDdata)
        .then((res) => {
          if(res.code == 0){
            this.fileList = [{
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url:res.path
            }]
            this.$emit('change',res.path)
            return ;
          }else{
            this.$message.warning('文件上传失败')
          }
          
        })
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    removeImg(){
      this.fileList = [];
    }
  },
  mounted(){
    if(this.value){
      this.fileList = [{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url:this.value
      }]
    }
  }
}
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>