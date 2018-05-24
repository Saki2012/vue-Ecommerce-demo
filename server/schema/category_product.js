/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category_product', {
    category_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    product_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'category_product'
  });
};
