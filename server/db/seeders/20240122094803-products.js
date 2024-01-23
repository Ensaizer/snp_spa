/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const categories = [
      {
        name: "Кузовные запчасти",
      },
      {
        name: "Автомасла",
      },
      {
        name: "Аккумуляторы",
      },
      {
        name: "Неоригинальные запчасти",
      },
      {
        name: "Запчасти для ТО",
      },
      {
        name: "Автохимия",
      },
    ];

    await queryInterface.bulkInsert("Categories", categories);
    await queryInterface.bulkInsert(
      "Brands",
      Array(1)
        .fill("x")
        .map(() => ({
          name: "Product",
          description: "Description",
          logoPath: "kekke",
        })),
      {},
    );

    await queryInterface.bulkInsert(
      "Roles",
      Array(1)
        .fill("x")
        .map(() => ({
          name: "customer",
        })),
      {},
    );

    await queryInterface.bulkInsert(
      "Products",
      Array(5)
        .fill("x")
        .map(() => ({
          article: Math.random() * 100,
          brandId: 1,
          categoryId: 1,
          deliveryTime: String(Math.floor(Math.random() * 10) + 1),
          name: "Product",
          description: "Description",
          minOrder: Math.random() * 10,
          multiplicity: Math.random() * 10,
          stock: Math.random() * 100,
          price: Math.random() * 1000,
        })),
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
