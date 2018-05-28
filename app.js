const Koa = require('koa');
const json = require('koa-json');
const logger = require('koa-logger');
const router = require('koa-router')();
const auth = require('./server/routes/auth.js'); // 引入auth
const api =  require('./server/routes/api.js'); // 引入api
const product =  require('./server/routes/product.js'); // 引入api
const jwt = require('koa-jwt');
const historyApiFallback = require('koa-history-api-fallback'); 

const path =require('path')
    , serve = require('koa-static');

// for product use

const app = new Koa();


app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(historyApiFallback());


// for product use

app.use(async function (ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
});

app.on('error', function (err, ctx) {
  console.log('server error', err)
});

router.use("/product", product.routes());
router.use('/auth', auth.routes()); 
router.use("/api", jwt({secret: 'vue-koa-eccomerce'}), api.routes()); // api 路徑以下都需要檢查TOKEN

app.use(router.routes()); 

app.use(serve(path.resolve('dist')));// webpack build出的目录作为Koa静态文件服务的目录，需要在router運行之後才執行，否則呼叫API先會回應完整的頁面內容
// for product use

var port = process.env.PORT || 3000;
app.listen(port,() => {
  console.log('Koa is listening in'+port);
});

module.exports = app;