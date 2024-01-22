const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      // define association here
    }
  }
  Organization.init(
    {
      userId: DataTypes.INTEGER,
      orgName: DataTypes.STRING,
      INN: DataTypes.STRING,
      KPP: DataTypes.STRING,
      OGRN: DataTypes.STRING,
      legalAddress: DataTypes.STRING,
      currAccount: DataTypes.STRING,
      corrAccount: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Organization',
    },
  );
  return Organization;
};
