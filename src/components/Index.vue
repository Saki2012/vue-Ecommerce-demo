<template>
<div class="container">
      <!--Navbar-->
      <nav class="navbar navbar-expand-lg navbar-dark mdb-color lighten-3 mt-3 mb-5">
        <!-- Navbar brand -->
        <span class="navbar-brand">分類:</span>
        <!-- Collapse button -->
        <button class="navbar-toggler" aria-expanded="false" aria-controls="basicExampleNav" aria-label="Toggle navigation" type="button" data-target="#basicExampleNav" data-toggle="collapse">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Collapsible content -->
        <div class="collapse navbar-collapse" id="basicExampleNav">
          <!-- Links -->
          <ul class="navbar-nav mr-auto">
            <li class="nav-item"  v-bind:class="{'active': (categoryId === 0)}"  v-on:click.prevent="setCId(0)">
              <a class="nav-link waves-effect waves-light">全部
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item" v-for="c in categories"  v-bind:class="{'active': (categoryId === (c.id))}"  v-on:click.prevent="setCId(c.id)">
              <span class="nav-link waves-effect waves-light">{{c.name}}</span>
            </li>
          </ul>
          <!-- Links -->
          <form class="form-inline">
            <div class="md-form mt-0">
              <div class="waves-input-wrapper waves-effect waves-light"><input class="form-control mr-sm-2" aria-label="Search" type="text" v-model="filter_text" placeholder="Search"></div>
            </div>
          </form>
        </div>
        <!-- Collapsible content -->
      </nav>
      <!--/.Navbar-->

      <!--Section: Products v.3-->
      <section class="text-center mb-4">
        <!--Grid row-->
        <div class="row wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
          <template v-for="(item, index) in filteredList.slice(pageStart, pageStart + countOfPage)"> <!--從以處理過List做處理的-->
          <!--Grid column-->
          <div class="col-lg-3 col-md-6 mb-4">
            
            <!--Card-->
            <div class="card">

              <!--Card image-->
              <div class="view overlay">
                <img class="img-fluid" alt="" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg">
                <a v-bind:href="['/Product/'+item.id]">
                  <div class="mask rgba-white-slight waves-effect waves-light"></div>
                </a>
              </div>
              <!--Card image-->

              <!--Card content-->
              <div class="card-body text-center">
                <!--Category & Title-->
                <a class="grey-text" v-bind:href="['/Product/'+item.id]">
                  <h5>{{item.category.name}}</h5>
                </a>
                <h5>
                  <strong>
                    <a class="dark-grey-text" v-bind:href="['/Product/'+item.id]">{{item.name}}
                      <span class="badge badge-pill danger-color">NEW</span>
                    </a>
                  </strong>
                </h5>

                <h4 class="font-weight-bold blue-text">
                  <strong>{{item.price}}$</strong>
                </h4>

              </div>
              <!--Card content-->

            </div>
            <!--Card-->
           

          </div>
          <!--Grid column-->
           </template>
        </div>
        <!--Grid row-->

      </section>
      <!--Section: Products v.3-->

      <!--Pagination-->
      <nav class="d-flex justify-content-center wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
        <ul class="pagination pg-blue">

          <!--Arrow left-->
          <li class="page-item" v-bind:class="{'disabled': (currPage === 1)}" @click.prevent="setPage(currPage-1)">
            <a class="page-link waves-effect waves-effect" aria-label="Previous" href="#" >
              <span aria-hidden="true">«</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>

          <li class="page-item " v-for="n in totalPage"
            v-bind:class="{'active': (currPage === (n))}" 
            @click.prevent="setPage(n)">
            <a class="page-link waves-effect waves-effect" href="#">{{n}}
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link waves-effect waves-effect" aria-label="Next" href="#">
              <span aria-hidden="true">»</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
      <!--Pagination-->
    </div>
</template>

<script>

export default {
   created(){ // 组件创建时调用
    this.GetProductList();
  },
  data () {
    return {
      countOfPage: 8,
      currPage: 1,
      filter_text: '',
      categoryId: 0,
      categories:[],
      list:[]
    };
  },
  computed: {
    filteredList: function(){
      var self = this;
      var result = this.list;
      // 所以這裡將 filter_name 與 rows[n].name 通通轉小寫方便比對。
      var filter_name = this.filter_text.toLowerCase();
      
      // 如果 categoryId 有內容，過濾資料
      if ( this.categoryId > 0 ) {
        result = result.filter(function(d){ return d.category.id === self.categoryId; });
      }

      // 如果 filter_name 有內容，過濾資料
      if ( this.filter_name !== '' ) {
        result = result.filter(function(d){ return d.name.toLowerCase().indexOf(filter_name) > -1 ; });
      }
      
      return result;
    },
    pageStart: function(){
        return (this.currPage - 1) * this.countOfPage;
      },
    totalPage: function(){
      return Math.ceil(this.filteredList.length / this.countOfPage);
    }
  },
  methods:{
    GetProductList(){
      const ProductList  = this.$http.get('/product/list') 
      .then((res) => {
        if(res.status == 200){
          this.list = res.data.result 
          this.categories = res.data.categories 
        }else{
          this.$message.error('获取列表失败！')
        }
      }, (err) => {
        this.$message.error('获取列表失败！')
        console.log(err)
      })
      return ProductList
    },
    setPage: function(idx){
      if( idx <= 0 || idx > this.totalPage ){
        return;
      }
      this.currPage = idx;
    },
    setCId: function(id){
      this.categoryId = id;
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