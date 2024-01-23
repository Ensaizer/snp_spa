/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
      const roles = [
          {
              name: 'customer',
          },
          {
              name: 'partner',
          },
          {
              name: 'admin',
          },
      ];
      await queryInterface.bulkInsert('Roles', roles);
      
      const getUsers = async() =>{
          const users = [
              {
                  name: 'Антон',
                  email: 'rokunecanton@gmail.com',
                  password: await bcrypt.hash('1234', 10),
                  phone: '+7-926-707-10-09',
                  userType: 'физическое лицо',
                  deliveryAddress: 'Московская область Красногорский район д. Путилково ул. Сходненская д.38 кв 147',
                  discount: 0,
                  roleId: 1,
                  isApproved: true
              },
              {
                  name: 'Владимир ',
                  email: 'vladimir@gmail.com',
                  password: await bcrypt.hash('1234', 10),
                  phone: '+7-917-906-56-79',
                  userType: 'физическое лицо',
                  deliveryAddress: 'Московская область Красногорский район д. Путилково ул. Сходненская д.38 кв 147',
                  discount: 0,
                  roleId: 3,
                  isApproved: true
              },
              {
                  name: 'Евгения',
                  email: 'vgev@gmail.com',
                  password: await bcrypt.hash('1234', 10),
                  phone: '+7-926-674-89-75',
                  userType: 'Юридическое лицо',
                  deliveryAddress: 'Москва ул. Строителей д.46 кв 56',
                  discount: 0,
                  roleId: 2,
                  isApproved: true,
              },
              {
                  name: 'Анатолий',
                  email: 'toly@gmail.com',
                  password: await bcrypt.hash('1234', 10),
                  phone: '+7-926-674-89-75',
                  userType: 'Юридическое лицо',
                  deliveryAddress: 'Москва ул. Строителей д.46 кв 56',
                  discount: 0,
                  roleId: 1,
                  isApproved: true,
              }];
          return users
      }
      await queryInterface.bulkInsert('Users', await getUsers());
      
      const brands = [
          {
              name:'Volvo Construction',
              description: 'одна из производственных компаний, входящих в концерн Volvo. Осуществляет разработку, производство и обслуживание строительно-дорожных машин под маркой Volvo, оборудования для строительной и смежных отраслей.',
              logoPath: './VC.jpg'
          },
          {
              name:'Volvo Penta',
              description: 'Volvo Penta — шведская компания, входящая в Volvo Group, производитель судовых и промышленных двигателей.',
              logoPath: './penta.jpg'
          },
          {
              name:'Volvo Trucks',
              description: 'шведская автомобилестроительная компания, один из мировых лидеров по производству тяжёлых грузовиков. В переводе с латыни «volvo» означает «я кручусь» или «я качусь». Принадлежит второму в мире по величине производителю грузовиков «Volvo Group».',
              logoPath: './trucks.jpg'
          },
      ];
      await queryInterface.bulkInsert('Brands', brands);
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
