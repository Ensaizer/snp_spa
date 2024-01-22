const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, { foreignKey: 'orderId' });
      this.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  Entry.init(
    {
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Entry',
    },
  );
  return Entry;
};
