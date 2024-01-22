const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Brand, { foreignKey: 'brandId' });
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
      this.hasMany(models.Cart, { foreignKey: 'productId' });
      this.hasMany(models.Product, { foreignKey: 'productId' });
    }
  }
  Product.init(
    {
      article: DataTypes.STRING,
      brandId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      deliveryTime: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      minOrder: DataTypes.INTEGER,
      multiplicity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
