
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Axios from 'axios'

Vue.prototype.$http = Axios // 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等
Vue.use(ElementUI)
Vue.use(BootstrapVue)
Vue.use(VueRouter)

import 'vue-awesome/icons'

/* Register component with one of 2 methods */

import Icon from 'vue-awesome/components/Icon'

// globally (in your main .js file)
Vue.component('icon', Icon)

import Login from './components/Login'
import Index from './components/Index'
import Product from './components/Product'
import Cart from './components/Cart'
import SignUp from './components/SignUp'


export const router =  new VueRouter({
  mode: 'history', // 开启HTML5的history模式，可以让地址栏的url长得跟正常页面跳转的url一样。（不过还需要后端配合，讲Koa的时候会说）
  base: __dirname, 
  routes: [
    {
      path: '/',  
      component: Index
    },
    {
      path: '/login',  
      component: Login
    },
    {
      path: '/signup',
      component: SignUp 
    },
    {
      path: '/product/:id', 
      component: Product
    },
    {
      path: '/cart',  
      component: Cart
    },
    {
      path: '*',
      redirect: '/' // 不存在地址則跳回首頁
    }
  ]
})


router.beforeEach((to,from,next) =>{
  const token = sessionStorage.getItem('EC-demo-token');
    if(token != 'null' && token != null){// 如果有token
      next() 
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 全局設定 header 的 token 驗證，(Bearer )注意有空格
    }else{
      next()
    }
})



const app = new Vue({
  router: router, // 啟用router
  render: h => h(App) 
}).$mount('#app') //掛載到 id 為 app 的元素上
