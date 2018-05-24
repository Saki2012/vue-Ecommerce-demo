const db = require('../config/db.js'), 
products = '../schema/products.js'; 
categories = '../schema/categories.js'; 
const EcommerceDb = db.Ecommerce; //記得改

const Product = EcommerceDb.import(products); 
const Category = EcommerceDb.import(categories); 

Product.belongsTo(Category, {foreignKey: 'category_id'});

// get All ProductsList 
const getProductsList = async function(){
      const list = await Product.findAll({
        attributes:['id', 'category_id', 'name', 'price'],
        include:[Category]
      });
      return list;
}

// get a Product by Id
const getProductById = async function(Pid){
    let result;
    if(Pid>0){
      result = await Product.findOne({
        where:{
          id:Pid
        }
      });
    }
    return result;
}

// get a ProductCategories
const getProductCategories = async function(){
  let result;
    result = await Category.findAll({
      attributes:['id', 'name']
    });
  return result;
}


module.exports = {
    getProductsList,
    getProductCategories,
    getProductById
}
