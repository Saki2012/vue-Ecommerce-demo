
const product = require('../models/product.js');

//
const getProductListByCategoryId = async function(ctx){
    //const Cid = (ctx.params.id || 0);
    const result = await product.getProductsList() 
    ctx.body = {
        success: true,
        result: result
    }
}

const getProductListAndCategories = async function(ctx){
    let result = {};
    try{
      result = await product.getProductsList();
      result.categories = await product.getProductCategories();
      ctx.body = {
          success: true,
          result: result
      }
    }
    catch(e)
    {
        ctx.body = {
            success: false
    }
    }
}


const getProductById = async function(ctx){
    const id = ctx.params.id;
    let result = await product.getProductById(id); 
    console.log(result);
    ctx.body = {
        success: true,
        result: result
    }
}

module.exports = {
    getProductListByCategoryId,
    getProductListAndCategories,
    getProductById
}