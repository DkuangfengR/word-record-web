<template>
  <div>
    <viewer :images="imgList">
      <img 
        v-for="row,index in imgList" 
        :key="index" 
        :src="row"
        style="width:90px;margin-right:15px">
    </viewer>
    
  </div>
</template>
<script>
export default {
  props:{
    value:{
      type:String,
      default:function(){
        return ''
      }
    }
  },
  data(){
    return {
      imgList:[]
    }
  },
  mounted(){
    if (typeof this.value == 'Array'){
      this.imgList = this.value
    }else{
      this.imgList = JSON.parse(this.value)
    }
  },
  watch:{
    value:{
      deep:true,
      handler(val){
         console.log("val",val)
        if(val){
          if (typeof val != 'object'){
            this.imgList = JSON.parse(val)
          }else{
            this.imgList = val
          }
          
        }
      }
    }
  }
}
</script>
<style scoped>

</style>