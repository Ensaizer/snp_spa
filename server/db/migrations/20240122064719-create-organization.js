/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Organizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      orgName: {
        type: Sequelize.STRING,
      },
      INN: {
        type: Sequelize.STRING,
      },
      KPP: {
        type: Sequelize.STRING,
      },
      OGRN: {
        type: Sequelize.STRING,
      },
      legalAddress: {
        type: Sequelize.STRING,
      },
      currAccount: {
        type: Sequelize.STRING,
      },
      corrAccount: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Organizations');
  },
};
