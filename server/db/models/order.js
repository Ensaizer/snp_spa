const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.hasMany(models.Entry, { foreignKey: "orderId" });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      deliveryAddress: DataTypes.STRING,
      deliveryDate: DataTypes.STRING,
      deliveryType: DataTypes.STRING,
      paymentType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    },
  );
  return Order;
};
