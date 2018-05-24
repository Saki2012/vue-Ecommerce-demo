const user = require('../models/user.js');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');

const getUserInfo = async function (ctx) {
  const id = ctx.params.id;
  const result = await user.getUserById(id) 
  ctx.body = result 
}

const createUser = async function(ctx){
  const id = ctx.params.id;
  const data = ctx.request.body;
  const userInfo = await user.getUserByName(data.name);

  if(!userInfo){
    const bcryptPassword = bcrypt.hashSync(data.password, 10)
    const result = await user.createUser(data, bcryptPassword)
    if(result) {
      const userToken = {
        name: result.user_name,
        id: result.id
      }
      const secret = 'vue-koa-demo'; // 指定密鑰
      const token = jwt.sign(userToken,secret); // 簽署 TOKEN
        ctx.body = {
          success: true,
          token: token
        }
    }else{
      ctx.body = {
        success: false,
        info: '用户不存在！'// failed
      }
    }
  }else{
    ctx.body = {
      success: false,
      info: '用户存在！' 
    }
  }
}

const postUserAuth = async function(ctx){
  const data = ctx.request.body; 
  const userInfo = await user.getUserByName(data.name);

  if(userInfo != null){ 
    if(!bcrypt.compareSync(data.password, userInfo.password)){
      ctx.body = {
        success: false, 
        info: '密码错误！'
      }
    }else{ // 如果密码正确
      const userToken = {
        id: userInfo.id,
        userName: userInfo.user_name,
        uid: userInfo.uid,
        phone: userInfo.phone,
        email: userInfo.email
      }
      const secret = 'vue-koa-demo'; //  指定密鑰
      const token = jwt.sign(userToken,secret); //簽署 TOKEN
      ctx.body = {
        success: true,
        token: token,
      }
    }
  }else{
    ctx.body = {
      success: false,
      info: '用户不存在！'
    }
  }
}

  module.exports = { 
    getUserInfo,
    createUser,
    postUserAuth 
  }