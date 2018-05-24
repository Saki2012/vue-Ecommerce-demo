<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>


import Navbar from "./components/Navbar";

export default {
  name: 'app',
    components:{
      navbar: Navbar
    },
    data () {
    return {
      userData:{}
    };
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
<style>
 @import './assets/css/style.min.css'; 
 @import './assets/css/bootstrap.min.css';
 @import './assets/css/mdb.min.css';
</style>

