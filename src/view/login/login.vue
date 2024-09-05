<template>
<div class="contain">
  <a-form class="container" :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" @submit="handleSubmit">
    <div class="titles" style="color:white">后台登录</div>
    <a-form-item label="账号">
      <a-input
        v-decorator="['username', { rules: [{ required: true, message: '请输入账号!' }] }]"
      />
    </a-form-item>
    <a-form-item label="密码">
      <a-input type="password"
        v-decorator="['password', { rules: [{ required: true, message: '请输入密码!' }] }]"
      />
    </a-form-item>
    <a-form-item style="text-align: center;" :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" html-type="submit">
        登录
      </a-button>
    </a-form-item>
  </a-form>
</div>
</template>

<script>
import {getAction} from '@/request/http.js'
export default {
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          getAction(`login?t=${Date.parse(new Date)}`,values).then(res=>{
            if(res.code == 0){
              localStorage.setItem('token',res.token)
              localStorage.setItem('username',res.username)
              window.location.href='/'
            }else{
              this.$message.warning(res.msg)
            }
          })
        }
      });
    },
  },
};
</script>
<style scoped>
.contain{
  width: 100%;
  height: 100%;
  background-image: url('../../assets/bg.jpg');
  background-size: 100% 100%;
}
.container{
  width: 30vw;
  margin-left: 35vw;
  position: relative;
  top: 30vh;
  
}
.titles{
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>