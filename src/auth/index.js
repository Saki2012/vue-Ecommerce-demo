import {router} from '../main'

export default {
    userData: {
        id:'',
        name: '',
        authenticated: false
    },
    login (username, password) {
      let obj = {
        name: username,
        password: password
      };
      this.$http.post('/auth/user', obj) // 将信息发送给后端
        .then((res) => { // axios返回的数据都在res.data里
          if(res.data.success){ // 如果成功
            sessionStorage.setItem('EC-demo-token',res.data.token); // 用sessionStorage把token存下来
            this.$message({ // 登录成功，显示提示语
              type: 'success',
              message: '登录成功！'
            }); 
            this.$router.push('/todolist') // 进入todolist页面，登录成功
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