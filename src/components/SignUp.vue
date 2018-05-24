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
      this.$http.post('/auth/user/create', obj) // 将信息发送给后端
        .then((res) => { // axios返回的数据都在res.data里
          if(res.data.success){ // 如果成功
            sessionStorage.setItem('EC-demo-token',res.data.token); // 用sessionStorage把token存下来
            this.$message({ // 登录成功，显示提示语
              type: 'success',
              message: '登录成功！'
            }); 
            this.$router.push('/') // 进入todolist页面，登录成功
          }else{
            this.$message.error(res.data.info); // 登录失败，显示提示语
            sessionStorage.setItem('EC-demo-token',null); // 将token清空
          }
        }, (err) => {
            this.$message.error('请求错误！')
            sessionStorage.setItem('EC-demo-token',null); // 将token清空
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