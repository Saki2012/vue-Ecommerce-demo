const db = require('../config/db.js'), 
      userModel = '../schema/users.js'; 
const EcommerceDb = db.Ecommerce; 

const User = EcommerceDb.import(userModel);

//get UserData By userId
const getUserById = async function (id){ 
  const userInfo = await User.findOne({ 
    where: {
      id: id
    }
  });
  
  return userInfo // 返回数据
}

//get UserData By userId
const getUserByName = async function (name) {
  const userInfo = await User.findOne({  
    where: {
      user_name: name
    }
  });
  return userInfo
}
//create User in Db 
const createUser = async function (UserData, passwordOrigin) {
  const user = await User.create({
    user_name: UserData.userName.trim(),
    email: UserData.email.trim(),
    phone: UserData.phone,
    first_name: UserData.firstName.trim(),
    surname: UserData.surname.trim(),
    created_at: Date.now(),
    updated_at: Date.now(),
    password: passwordOrigin
  });
  return user
}

module.exports = {
  getUserById,
  createUser,
  getUserByName
}