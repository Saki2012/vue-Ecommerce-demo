const Cart = require('../models/cart.js');


const getCartById = async function(ctx){
    const id = ctx.params.id;
    let result = await Cart.getCartById(id); 
    ctx.body = {
        success: true,
        result: result
    }
}

const getCartByProductId = async function(ctx){
    const id = ctx.params.id;
    let result = await Cart.getCartByProductId(id); 
    ctx.body = {
        success: true,
        result: result
    }
}

const createCart = async function(ctx){
    const data = ctx.request.body;
    let result = await Cart.createCart(data); 
    ctx.body = {
        success: true,
        result: result
    }
}

const getCartByUserId = async function(ctx){
    const data = ctx.request.body;
    let result = await Cart.getCartByUserId(data.userId); 
    ctx.body = {
        success: true,
        result: result
    }
}

module.exports = {
    getCartById,
    getCartByProductId,
    getCartByUserId,
    createCart
}