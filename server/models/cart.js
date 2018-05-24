const db = require('../config/db.js'), 
product = '../schema/products.js',
cart = '../schema/cart.js';

const EcommerceDb = db.Ecommerce; //記得改

const Cart = EcommerceDb.import(cart); 

const Product = EcommerceDb.import(product); 

Cart.belongsTo(Product, {foreignKey: 'product_id'});

const getCartByProductId = async function(Pid){
      const result = await Cart.findOne({
        where:{
            id:Pid
        },
       attributes:['id','name','price']
      });
      return result;
}

const getCartById = async function(Pid){
    let result;
    if(Pid){
        result = await Cart.findOne({
          where:{
            id:Pid
          }
        });
    }
    return result;
}

const getCartByUserId = async function(Uid){
    let result;
    if(Uid){
        result = await Cart.findAll({
          where:{
            user_id: Uid
          },
          include:[Product]
        })
    }
    return result;
}

const createCart = async function(data){
    const cart = await Cart.create({
        user_id: data.userId,
        product_id:data.productId,
        quantity: data.quantity,
        created_at: Date.now(),
        updated_at: Date.now(),
      });

    return cart;
}


module.exports = {
    getCartByProductId,
    createCart,
    getCartByUserId,
    getCartById
}
