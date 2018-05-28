const Sequelize = require('sequelize'); // 引入sequelize

// 使用url连接的形式进行连接，注意将root: 后面的XXXX改成自己数据库的密码
const Ecommerce = new Sequelize('mysql://sql12240073:B7NaJwyGk2@sql12.freemysqlhosting.net/sql12240073',{
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）//mysql://root:1234@localhost/ecomerce
  }
}) 


module.exports = {
  Ecommerce // 将Ecommerce暴露出接口方便Model调用
}