/* jshint indent: 2 */

var cart = sequelize.define('cart', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER(10),
    allowNull: true
  },
  product_id: {
    type: DataTypes.INTEGER(11),
    allowNull: true
  },
  quantity: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: '0'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
},);

module.exports = cart