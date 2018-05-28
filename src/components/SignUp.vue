<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       New User 
      </span>
      <el-row>
        <el-input 
          v-model="userName"
          placeholder="UserName"
          type="text">
        </el-input>
        <el-input 
          v-model="firstName"
          placeholder="firstName"
          type="text">
        </el-input>
        <el-input 
          v-model="surname"
          placeholder="surnName"
          type="text">
        </el-input>
        <el-input
          v-model="email"
          placeholder="Email"
          type="text">
        </el-input>
        <el-input
          v-model="password"
          placeholder="Password"
          type="password">
        </el-input>
        <el-input
          v-model="phone"
          placeholder="phone"
          type="text">
        </el-input>
        <el-button type="primary" @click="SignUp">註冊</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      email: '',
      firstName: '',
      surname: '',
      phone: '',
      password: '',

    };
  },
  methods:{
    SignUp() {
      let obj = {
        userName: this.userName,
        email: this.email,
        firstName: this.firstName,
        surname: this.surname,
        phone:this.phone,
        password: this.password
      } 
      this.$http.post('/auth/user/create', obj) 
        .then((res) => { 
          if(res.data.success){ 
            sessionStorage.setItem('EC-demo-token',res.data.token);
            this.$message({
              type: 'success',
              message: '登入成功！'
            }); 
            this.$router.push('/') 
          }else{
            this.$message.error(res.data.info); 
            sessionStorage.setItem('EC-demo-token',null); 
          }
        }, (err) => {
            this.$message.error('請求錯誤！')
            sessionStorage.setItem('EC-demo-token',null); 
        })
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