<template class="mt-5 pt-4">
    <div class="container dark-grey-text mt-5">

      <!--Grid row-->
      <div class="row wow fadeIn animated" style="visibility: visible; animation-name: fadeIn;">

        <!--Grid column-->
        <div class="col-md-6 mb-4">

          <img class="img-fluid" alt="" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/14.jpg">

        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-md-6 mb-4">

          <!--Content-->
          <div class="p-4">

            <div class="mb-3">
              <a href="">
                <span class="badge blue mr-1">New</span>
              </a>
              <a href="">
                <span class="badge red mr-1">Bestseller</span>
              </a>
            </div>

            <p class="lead">
              <span>${{product.price}}</span>
            </p>

            <p class="lead font-weight-bold">{{product.name}}</p>
            <div class="d-flex justify-content-center">
              <!-- Default input -->
              <input class="form-control" style="width: 100px" aria-label="Search" type="number" v-model="quantity">
              <button class="btn btn-primary btn-md my-0 p waves-effect waves-light" @click="CreateCart">Add to cart
                <i class="fa fa-shopping-cart ml-1"></i>
              </button>

            </div>

          </div>
          <!--Content-->

        </div>
        <!--Grid column-->

      </div>
      <!--Grid row-->

      <hr>

      <!--Grid row-->
      <div class="row d-flex justify-content-center wow fadeIn animated" style="visibility: visible; animation-name: fadeIn;">

        <!--Grid column-->
        <div class="col-md-6 text-center">

          <h3 class="my-4 h4"><b>商品簡介</b></h3>

          <p>{{product.description}}</p>

        </div>
        <!--Grid column-->

      </div>
      <!--Grid row-->

      <!--Grid row-->
      <div class="row wow fadeIn animated" style="visibility: visible; animation-name: fadeIn;">

        <!--Grid column-->
        <div class="col-lg-4 col-md-12 mb-4">

          <img class="img-fluid" alt="" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/11.jpg">

        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-lg-4 col-md-6 mb-4">

          <img class="img-fluid" alt="" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/12.jpg">

        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-lg-4 col-md-6 mb-4">

          <img class="img-fluid" alt="" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg">

        </div>
        <!--Grid column-->

      </div>
      <!--Grid row-->

    </div>
</template>

<script>

import jwt from 'jsonwebtoken' 

import Bus from '../setup/eventBus.js'

export default {
  created(){
    this.GetProductInfo();
    const userdata = this.getUserInfo();
    if(userdata != null){
      this.userInfo = userdata;
    }
  },
  data () {
    return {
      productId: {},
      product: {},
      userInfo: null,
      quantity: "1",
    };
  },
  methods:{
    GetProductInfo(){
      this.productId = this.$route.params.id
      const GetProductInfo = this.$http.get('/product/'+this.productId) // get productInfo through http get req
      .then((res) => {
        if(res.status == 200 && res.data.result != null){
          console.log(res.data.result)
          this.product = res.data.result // 獲取的結果傳入 product 中
        }else{
          this.$message.error('無此商品！')
          this.$router.push('/') // 導回首頁
        }
      }, (err) => {
        this.$message.error('獲取商品資料失敗！')
        this.$router.push('/') // 導回首頁
      })
      //return getEcommerce
    },
    CreateCart(){
      if(this.userInfo){
        let data = {}
        data.productId = this.productId
        data.quantity = this.quantity
        data.userId = this.userInfo.id
        const result  = this.$http.post('/api/cart/create',data) // create a cart data through http post req
        .then((res) => {
          if(res.status == 200){
            this.$message({ 
                type: 'success',
                message: '商品已加入購物車！'
            });
            Bus.$emit('cartCountUpdate', 1); 
          }else{
            this.$message.error('商品加入失敗')
          }
        }, (err) => {
          this.$message.error('商品加入失敗')
          console.log(err)
        })
      }else{
        this.$message({ 
          type: 'success',
          message: '請先登入'
        });
      }
    },
    getUserInfo(){ //取得用户資訊
      const token = sessionStorage.getItem('EC-demo-token');
      if(token != null && token != 'null'){
        let decode = jwt.decode(token); 
        return decode
      }else {
        return null
      }
    }
  }
}
</script>