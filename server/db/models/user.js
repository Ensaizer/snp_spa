const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Role, { foreignKey: 'roleId' });
      this.belongsTo(models.Organization, { foreignKey: 'userId' });
      this.hasMany(models.Cart, { foreignKey: 'userId' });
      this.hasMany(models.Order, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      userType: DataTypes.STRING,
      deliveryAddress: DataTypes.STRING,
      discount: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
      isApproved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
