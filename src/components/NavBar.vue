<template>
   <nav class="navbar navbar-expand-lg navbar-light white scrolling-navbar">
    <div class="container">

      <!-- Brand -->
      <a class="navbar-brand waves-effect" href="/" target="_blank">
        <strong class="blue-text">LOGO</strong>
      </a>

      <!-- Collapse -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <!-- Left -->
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link waves-effect" href="/">首頁
              <span class="sr-only"></span>
            </a>
          </li>

        </ul>

        <!-- Right -->
        <ul class="navbar-nav nav-flex-icons">
          <div v-if="userInfo">
            <li class="nav-item">
              <a class=" waves-effect">     Hi!  {{userInfo.userName}}   </a>
              <a class=" waves-effect" href="/Cart">
                
                <icon  name="shopping-cart"></icon>
                <span class="clearfix d-none d-sm-inline-block"> Cart </span>
                <span class="badge red z-depth-1 mr-1"  v-if="this.cartCount > 0">  {{this.cartCount}} </span>
              </a>
             </li>
          </div>
          <div v-else>
            <li class="nav-item">
             <a href="/register" class="waves-effect">
                <b class="waves-effect">註冊</b>
              </a>
              <a href="/login" class="waves-effect">
                <b class="waves-effect">登入</b>
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

import jwt from 'jsonwebtoken' 

import Bus from '../setup/eventBus.js'

export default {
  created(){
    const userdata = this.getUserInfo();
    console.log("logged")
    if(userdata != null){
      this.userInfo = userdata;
      this.cartCount = this.userInfo.cartCount;
      const Count = this.getcartCount();
      console.log(Count)
      if(Count != null && Count != 'null'){
         this.cartCount = Count/1;
      }else{
        sessionStorage.setItem('cartCount', this.cartCount);
      }
    }

    Bus.$on('LoggedInUser', userDataToken => {  
        this.userInfo = jwt.decode(userDataToken);
        this.cartCount = this.userInfo.cartCount;
    });  

    Bus.$on('cartCountUpdate', count => {  
        this.cartCount += count;
        sessionStorage.setItem('cartCount', this.cartCount);
    });  
  },
  data () {
    return {
      userInfo: null,
      isCounted: false,
      cartCount: 0
    };
  },
  methods:{
  Logout() {
     sessionStorage.removeItem('EC-demo-token');  // 從sessionStorage把token移除
     location.reload();
  },
  getUserInfo(){ //取得用户資訊
      const token = sessionStorage.getItem('EC-demo-token');
      if(token != null && token != 'null'){
        let decode = jwt.decode(token); // 解析token
        return decode // decode解析出来实际上就是{name: ......}
      }else {
        return null
      }
    },
    getcartCount(){
      const count = sessionStorage.getItem('cartCount');
      return count;
    }
  }
}
</script>