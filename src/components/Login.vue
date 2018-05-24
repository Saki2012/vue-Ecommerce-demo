<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       歡迎登入 
      </span>
      <el-row>
        <el-input 
          v-model="account"
          placeholder="帳號"
          type="text">
        </el-input>
        <el-input
          v-model="password"
          placeholder="密碼"
          type="password">
        </el-input>
        <el-button type="primary" @click="login">登入</el-button>
       <router-link v-bind:to="'signup'">註冊</router-link>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import auth from '../auth'

export default {
  data () {
    return {
      account: '',
      password: ''
    };
  },
  methods:{
    toSignUp(){
      this.$router.push('/signup')
    },
    login() {//
      let obj = {
        name: this.account,
        password: this.password
      } 
      if(this.account!='' && this.password!=''){
        this.$http.post('/auth/user', obj)
        .then((res) => {
          if(res.data.success){ 
            sessionStorage.setItem('EC-demo-token',res.data.token); // 用sessionStorage把token存下来
            this.$message({ 
              type: 'success',
              message: '登入成功！'
            }); 
            this.$router.push('/')//導回首頁
          }else{
            this.$message.error(res.data.info); // 登入失敗，顯示提示語
            sessionStorage.setItem('EC-demo-token',null); // 將token清空
          }
        }, (err) => {
            this.$message.error('請求錯誤！')
            sessionStorage.setItem('EC-demo-token',null); // 將token清空
        })
      }
    }
  }
}
</script>

<style>
  .el-row.content{
    padding: 16px;
  }
  .title{
    font-size: 28px;
  }
  .el-input{
    margin: 12px 0;
  }
  .el-button{
    width: 100%;
    margin-top: 12px;
  }
</style>