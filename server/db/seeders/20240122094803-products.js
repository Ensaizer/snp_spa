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

    const getUsers = async () => {
      const users = [
        {
          name: 'Антон',
          email: 'rokunecanton@gmail.com',
          password: await bcrypt.hash('1234', 10),
          phone: '+7-926-707-10-09',
          userType: 'физическое лицо',
          deliveryAddress:
            'Московская область Красногорский район д. Путилково ул. Сходненская д.38 кв 147',
          discount: 0,
          roleId: 1,
          isApproved: true,
        },
        {
          name: 'Владимир ',
          email: 'vladimir@gmail.com',
          password: await bcrypt.hash('1234', 10),
          phone: '+7-917-906-56-79',
          userType: 'физическое лицо',
          deliveryAddress:
            'Московская область Красногорский район д. Путилково ул. Сходненская д.38 кв 147',
          discount: 0,
          roleId: 3,
          isApproved: true,
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
          isApproved: false,
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
          isApproved: false,
        },
      ];
      return users;
    };
    await queryInterface.bulkInsert('Users', await getUsers());
    const organizations = [
      {
        userId: 3,
        orgName: 'ООО "Строительная компания СПб"',
        INN: '9604064697',
        KPP: '36233401001',
        OGRN: '306360059589',
        corrAccount: '50902810716540010359',
        legalAddress: 'Москва улю Сухарева 15',
        currAccount: '60302810716540010359',
      },
      {
        userId: 4,
        orgName: 'ООО "Строительная компания МСК"',
        INN: '9604064692',
        KPP: '36233401043',
        OGRN: '306360059582',
        corrAccount: '50902810716540010359',
        legalAddress: 'Санкт-Петербург ул. Печина 23',
        currAccount: '60302810716540010359',
      },
    ];
    await queryInterface.bulkInsert('Organizations', organizations);

    const brands = [
      {
        name: 'Volvo Construction',
        description:
          'одна из производственных компаний, входящих в концерн Volvo. Осуществляет разработку, производство и обслуживание строительно-дорожных машин под маркой Volvo, оборудования для строительной и смежных отраслей.',
        logoPath: './VC.jpg',
      },
      {
        name: 'Volvo Penta',
        description:
          'Volvo Penta — шведская компания, входящая в Volvo Group, производитель судовых и промышленных двигателей.',
        logoPath: './penta.jpg',
      },
      {
        name: 'Volvo Trucks',
        description:
          'шведская автомобилестроительная компания, один из мировых лидеров по производству тяжёлых грузовиков. В переводе с латыни «volvo» означает «я кручусь» или «я качусь». Принадлежит второму в мире по величине производителю грузовиков «Volvo Group».',
        logoPath: './trucks.jpg',
      },
    ];
    await queryInterface.bulkInsert('Brands', brands);
    const categories = [
      {
        name: 'Кузовные запчасти',
      },
      {
        name: 'Автомасла',
      },
      {
        name: 'Аккумуляторы',
      },
      {
        name: 'Неоригинальные запчасти',
      },
      {
        name: 'Запчасти для ТО',
      },
      {
        name: 'Автохимия',
      },
    ];

    await queryInterface.bulkInsert('Categories', categories);

    const products = [
      {
        article: 'TAD1343GE_ORG_',
        brandId: 2,
        categoryId: 1,
        deliveryTime: 5,
        name: 'Двигатеь',
        description:
          'Новый оригинал Дизельный двигатель Volvo Penta TAD1343GE (Вольво Пента TAD1343GE ) онлайн на snb2b.ru ',
        price: 9930,
        stock: 10,
        minOrder: 1,
        multiplicity: 3
      },
      {
        article: 'TAD1342GE_ORG_',
        brandId: 2,
        categoryId: 1,
        deliveryTime: 30,
        name: 'Двигатель',
        description:
          'Новый оригинал Дизельный двигатель Volvo Penta TAD1342GE (Вольво Пента TAD1342GE) онлайн на snb2b.ru',
        price: 70030,
        stock: 20,
        minOrder: 1,
        multiplicity: 1
        
      },
      {
        article: '20758814_OEM_',
        brandId: 1,
        categoryId: 2,
        deliveryTime: 25,
        name: 'Интеркуллер Радиатора',
        description: 'Новый оригинал MAHLE CI354000P Charge air cooler онлайн на snb2b.ru ',
        price: 77065,
        stock: 65,
        minOrder: 1,
        multiplicity: 2
      },
      {
        article: '21083292_OEM_',
        brandId: 3,
        categoryId: 2,
        deliveryTime: 15,
        name: 'Радиатор',
        description: 'Новый 21229195 Radiator онлайн на snb2b.ru',
        price: 9930,
        stock: 39,
        minOrder: 1,
        multiplicity: 2
      },
      {
        article: '21615193 _ORG_',
        brandId: 3,
        categoryId: 3,
        deliveryTime: 10,
        name: 'Корзина сцепления',
        description: 'Новый оригинал Volvo Trucks 21615193 онлайн на snb2b.ru',
        price: 76600,
        stock: 100,
        minOrder: 1,
        multiplicity: 3
      },
      {
        article: '82421049_SRP_',
        brandId: 2,
        categoryId: 3,
        deliveryTime: 30,
        name: 'Заглушка рамки фары левая',
        description: 'Новый 82421049 онлайн на snb2b.ru',
        price: 12000,
        stock: 50,
        minOrder: 1,
        multiplicity: 5
      },
    ];
    await queryInterface.bulkInsert('Products', products);

    const carts = [
      {
        productId: 1,
        quantity: 1,
        userId: 1,
      },
      {
        productId: 5,
        quantity: 1,
        userId: 1,
      },
      {
        productId: 3,
        quantity: 3,
        userId: 1,
      },
      {
        productId: 4,
        quantity: 2,
        userId: 1,
      },
      {
        productId: 2,
        quantity: 2,
        userId: 1,
      },
    ];

    await queryInterface.bulkInsert('Carts', carts);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
