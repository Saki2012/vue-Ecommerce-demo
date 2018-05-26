<template>
  <div class="container wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
      <!-- Heading -->

      <!--Grid row-->
      <div class="row">
       <!--Grid column-->
        <div class="col-md-12 mb-6">
          <!-- Heading -->
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted"></span>
          </h4>
          <!-- Cart -->
          <table id="cart" class="table table-hover table-condensed">
    				<thead>
						<tr>
							<th style="width:50%">產品</th>
							<th style="width:10%">價格</th>
							<th style="width:8%">數量</th>
							<th style="width:22%" class="text-center">小計</th>
							<th style="width:10%"></th>
						</tr>
					</thead>
					<tbody>
          <template >
						<tr v-for="(item, index) in list" :key="item.id">
							<td data-th="Product">
								<div class="row">
									<div class="col-sm-2 hidden-xs"><img src="http://placehold.it/100x100" alt="..." class="img-responsive"></div>
									<div class="col-sm-10">
										<h4 class="nomargin">{{item.product.name}}</h4>
										<p>Quis aute iu</p>
									</div>
								</div>
							</td>
							<td data-th="Price">${{item.product.price}}</td>
							<td data-th="Quantity">
								<input type="number" class="form-control text-center" v-model=item.quantity>
							</td>
							<td data-th="Subtotal" class="text-center">${{subTotal[index]}}</td>
							<td class="actions" data-th="">
								<button class="btn btn-danger btn-sm" @click="remove(index)">刪除</i></button>								
							</td>
						</tr>
          </template>
					</tbody>
					<tfoot>
						<tr>
							<td colspan="3" class="hidden-xs"></td>
							<td colspan="2"class="hidden-xs text-center"><strong><h4>總計  ${{Total}}</h4> </strong></td>
						</tr>
					</tfoot>
				  </table>
          <!-- Cart -->
        </div>
        <!--Grid column-->
        

        <!--Grid column-->
        <div class="col-md-12 mb-4 " style="pointer-events:none;"><!-- temporary disabled -->
           <div><b>結帳功能暫不開放</b></div><!-- temporary disabled -->
          <!--Card-->
          <div class="card blur0">
            <h2 class="my-5 h2 text-center"><b>結帳</b></h2>
            <!--Card content-->
            <form class="card-body">

              <!--Grid row-->
              <div class="row">
              
                <!--Grid column-->
                <div class="col-md-6 mb-2">
                  
                  <!--firstName-->
                  <div class="md-form ">
                    
                    <input class="form-control" id="firstName" type="text">
                    <label for="firstName">First name</label>
                  </div>

                </div>
                <!--Grid column-->

                <!--Grid column-->
                <div class="col-md-6 mb-2">

                  <!--lastName-->
                  <div class="md-form">
                    <input class="form-control" id="lastName" type="text">
                    <label for="lastName">Last name</label>
                  </div>

                </div>
                <!--Grid column-->

              </div>
              <!--Grid row-->

              <!--Username-->
              <div class="md-form input-group pl-0 mb-5">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">@</span>
                </div>
                <input class="form-control py-0" aria-describedby="basic-addon1" type="text" placeholder="Username">
              </div>

              <!--email-->
              <div class="md-form mb-5">
                <input class="form-control" id="email" type="text" placeholder="youremail@example.com">
                <label class="active" for="email">Email (optional)</label>
              </div>

              <!--address-->
              <div class="md-form mb-5">
                <input class="form-control" id="address" type="text" placeholder="1234 Main St">
                <label class="active" for="address">Address</label>
              </div>

              <!--address-2-->
              <div class="md-form mb-5">
                <input class="form-control" id="address-2" type="text" placeholder="Apartment or suite">
                <label class="active" for="address-2">Address 2 (optional)</label>
              </div>

              <!--Grid row-->
              <div class="row">

                <!--Grid column-->
                <div class="col-lg-4 col-md-12 mb-4">

                  <label for="country">Country</label>
                  <select class="custom-select d-block w-100" id="country" required="">
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </select>
                  <div class="invalid-feedback">
                    Please select a valid country.
                  </div>

                </div>
                <!--Grid column-->

                <!--Grid column-->
                <div class="col-lg-4 col-md-6 mb-4">

                  <label for="state">State</label>
                  <select class="custom-select d-block w-100" id="state" required="">
                    <option value="">Choose...</option>
                    <option>California</option>
                  </select>
                  <div class="invalid-feedback">
                    Please provide a valid state.
                  </div>

                </div>
                <!--Grid column-->
         
                <!--Grid column-->
                <div class="col-lg-4 col-md-6 mb-4">

                  <label for="zip">Zip</label>
                  <input class="form-control" id="zip" required="" type="text" placeholder="">
                  <div class="invalid-feedback">
                    Zip code required.
                  </div>

                </div>
                <!--Grid column-->

              </div>
              <!--Grid row-->

              <hr>

              <div class="custom-control custom-checkbox">
                <input class="custom-control-input" id="same-address" type="checkbox">
                <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input class="custom-control-input" id="save-info" type="checkbox">
                <label class="custom-control-label" for="save-info">Save this information for next time</label>
              </div>

              <hr>

              <div class="d-block my-3">
                <div class="custom-control custom-radio">
                  <input name="paymentMethod" class="custom-control-input" id="credit" required="" type="radio" checked="">
                  <label class="custom-control-label" for="credit">Credit card</label>
                </div>
                <div class="custom-control custom-radio">
                  <input name="paymentMethod" class="custom-control-input" id="debit" required="" type="radio">
                  <label class="custom-control-label" for="debit">Debit card</label>
                </div>
                <div class="custom-control custom-radio">
                  <input name="paymentMethod" class="custom-control-input" id="paypal" required="" type="radio">
                  <label class="custom-control-label" for="paypal">Paypal</label>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="cc-name">Name on card</label>
                  <input class="form-control" id="cc-name" required="" type="text" placeholder="">
                  <small class="text-muted">Full name as displayed on card</small>
                  <div class="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="cc-number">Credit card number</label>
                  <input class="form-control" id="cc-number" required="" type="text" placeholder="">
                  <div class="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 mb-3">
                  <label for="cc-expiration">Expiration</label>
                  <input class="form-control" id="cc-expiration" required="" type="text" placeholder="">
                  <div class="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="cc-expiration">CVV</label>
                  <input class="form-control" id="cc-cvv" required="" type="text" placeholder="">
                  <div class="invalid-feedback">
                    Security code required
                  </div>
                </div>
              </div>
              <hr class="mb-4">
              <button class="btn btn-primary btn-lg btn-block waves-effect waves-light" type="submit">Continue to checkout</button>
            </form>
          </div>
          <!--/.Card-->
        </div>
        <!--Grid column-->

      </div>
      <!--Grid row-->
  </div>
</template>

<script>
import Bus from '../setup/eventBus.js'

export default {
  created(){
    this.GetCartList();
  },
  data () {
    return {
      account: '',
      password: '',
      userId: 2, //tester purpose
      list:[]
    };
  },
  computed:{
    subTotal: function() {
      return this.list.map(function(item) {
          return item.product.price * item.quantity;
      });
    },
    Total: function() {
      return this.list.map(function(item) {
          return item.product.price * item.quantity;
      })
      .reduce(function(a, b) { return a + b; }, 0);
    }
  },
  methods:{
    GetCartList(){
      let data = {};
      data.userId = this.userId
      const ProductList  = this.$http.post('/api/cart/list',data) 
      .then((res) => {
        if(res.status == 200){
        this.list = res.data.result
        }else{
          this.$message.error('获取列表失败！')
        }
      }, (err) => {
        this.$message.error('获取列表失败！')
        console.log(err)
      })
      return ProductList
    },
    remove(index) {
      this.$http.delete('/api/cart/' +this.userId + '/'+ this.list[index].id)
        .then((res) => {
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            Bus.$emit('cartCountUpdate', -1); 
            this.GetCartList();
          }else{
            this.$message.error('删除失败！')
          }
        }, (err) => {
          this.$message.error('删除失败！')
          console.log(err)
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
  .blur0{
    -webkit-filter:blur(3px);
  }  
</style>