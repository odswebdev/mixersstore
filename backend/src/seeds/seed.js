const db = require('./models');
const bcrypt = require('bcryptjs');

// Изображения для продуктов (в продакшене это будут реальные URL)
const images = {
  smesBide: 'https://example.com/images/smes-bide.png',
  smesAcearium: 'https://example.com/images/smes-acearium.png',
  smesCat: 'https://example.com/images/smes__сat.png',
  dushCat: 'https://example.com/images/dush__cat.png',
  stoykiCat: 'https://example.com/images/stoyki__cat.png',
  izlivyCat: 'https://example.com/images/izlivy__cat.png',
  aksessuaryCat: 'https://example.com/images/aksessuary__cat.png'
};

// Категории из ваших данных
const categories = [
  { name: 'Смесители', slug: 'smesiteli', description: 'Смесители для ванной и кухни' },
  { name: 'Душевые стойки', slug: 'dushevye-stojki', description: 'Душевые стойки и системы' },
  { name: 'Душевые системы', slug: 'dushevye-sistemy', description: 'Комплекты душевых систем' },
  { name: 'Изливы', slug: 'izlivy', description: 'Изливы и лейки для душа' },
  { name: 'Аксессуары', slug: 'aksessuary', description: 'Аксессуары для ванной комнаты' },
  { name: 'Унитазы', slug: 'unitazy', description: 'Унитазы и биде' },
  { name: 'Раковины', slug: 'rakoviny', description: 'Раковины и умывальники' },
  { name: 'Ванны', slug: 'vanny', description: 'Ванны акриловые и чугунные' }
];

// Продукты из ваших данных
const products = [
  {
    name: "Demm Rory Смеситель для биде",
    category: "Смесители",
    inStock: true,
    stockStatus: "В наличии",
    articleNumber: "4720X",
    slug: "demm-rory-smesitel-dlya-bide",
    price: 45220.00,
    oldPrice: 54600.00,
    mainImage: images.smesBide,
    images: [images.smesBide],
    style: "Современный",
    color: "Хром",
    view: "Для раковины",
    mountingType: "На 1 отверстие",
    management: "Однорычажный",
    numberSource: 1,
    collection: "ERYOS",
    labels: ["Новинки"],
    description: "Высококачественный смеситель для биде в современном стиле. Изготовлен из прочных материалов с хромированным покрытием.",
    quantity: 15,
    specifications: {
      material: "Латунь",
      coating: "Хром",
      warranty: "5 лет",
      country: "Италия"
    },
    features: [
      "Керамический картридж",
      "Аэратор для экономии воды",
      "Легкое управление"
    ]
  },
  {
    name: "Demm Rory Смеситель",
    category: "Смесители",
    inStock: true,
    stockStatus: "В наличии",
    articleNumber: "4718CD",
    slug: "demm-rory-smesitel",
    price: 45220.00,
    oldPrice: 54600.00,
    mainImage: images.smesBide,
    images: [images.smesBide],
    style: "Современный",
    color: "Хром",
    view: "Для раковины",
    mountingType: "На 1 отверстие",
    management: "Однорычажный",
    numberSource: 1,
    collection: "ERYOS",
    labels: ["Новинки"],
    description: "Классический смеситель для раковины с однорычажным управлением.",
    quantity: 8,
    specifications: {
      material: "Латунь",
      coating: "Хром",
      warranty: "3 года",
      country: "Германия"
    }
  },
  {
    name: "Demm Rory Смеситель Acearium",
    category: "Смесители",
    slug: "demm-rory-smesitel-acearium",
    inStock: true,
    stockStatus: "В наличии",
    articleNumber: "4728CD",
    price: 38000.00,
    oldPrice: 42000.00,
    mainImage: images.smesAcearium,
    images: [images.smesAcearium],
    style: "Классический",
    color: "Хром-Золото",
    view: "Для биде",
    mountingType: "На 2 отверстия",
    management: "Однорычажный",
    numberSource: 1,
    collection: "ACIARIUM INOX",
    labels: ["Новинки"],
    description: "Роскошный смеситель в классическом стиле с элементами золота.",
    quantity: 12,
    isFeatured: true
  },
  {
    name: "Demm Rory Смеситель Acearium",
    category: "Смесители",
    inStock: true,
    stockStatus: "В наличии",
    articleNumber: "47123CD",
    slug: "demm-rory-smesitel-acearium2",
    price: 38000.00,
    oldPrice: 42000.00,
    mainImage: images.smesAcearium,
    images: [images.smesAcearium],
    style: "Классический",
    color: "Хром-Золото",
    view: "Для биде",
    mountingType: "На 2 отверстия",
    management: "Однорычажный",
    numberSource: 1,
    collection: "ACIARIUM INOX",
    labels: ["Хиты продаж"],
    description: "Элитный смеситель из коллекции ACIARIUM INOX",
    quantity: 5,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 42
  },
  {
    name: "Demm Rory Смеситель Acearium",
    category: "Смесители",
    inStock: true,
    stockStatus: "В наличии",
    articleNumber: "44220X",
    slug: "demm-rory-smesitel-acearium3",
    price: 38000.00,
    oldPrice: 42000.00,
    mainImage: images.smesAcearium,
    images: [images.smesAcearium],
    style: "Классический",
    color: "Хром-Золото",
    view: "Для биде",
    mountingType: "На 2 отверстия",
    management: "Однорычажный",
    numberSource: 1,
    collection: "ACIARIUM INOX",
    labels: ["Хиты продаж"],
    description: "Популярная модель смесителя с двойным покрытием",
    quantity: 20
  },
  {
    name: "Demm Rory Смеситель Acearium",
    category: "Душевые стойки",
    inStock: false,
    stockStatus: "Нет в наличии",
    articleNumber: "4990X",
    slug: "demm-rory-smesitel-acearium4",
    price: 38000.00,
    oldPrice: 42000.00,
    mainImage: images.smesAcearium,
    images: [images.smesAcearium],
    style: "Классический",
    color: "Хром-Золото",
    view: "Для биде",
    mountingType: "На 2 отверстия",
    management: "Однорычажный",
    numberSource: 1,
    collection: "ACIARIUM INOX",
    labels: ["Акция"],
    description: "Смеситель по специальной цене",
    quantity: 0
  },
  {
    name: "Demm Rory Смеситель Acearium",
    category: "Душевые системы",
    inStock: false,
    stockStatus: "Нет в наличии",
    articleNumber: "4990X",
    slug: "demm-rory-smesitel-acearium5",
    price: 38000.00,
    oldPrice: 42000.00,
    mainImage: images.smesAcearium,
    images: [images.smesAcearium],
    style: "Классический",
    color: "Хром-Золото",
    view: "Для биде",
    mountingType: "На 2 отверстия",
    management: "Однорычажный",
    numberSource: 1,
    collection: "ACIARIUM INOX",
    labels: ["Акция"],
    description: "Смеситель для душевой системы",
    quantity: 0
  },
  // Дополнительные продукты для разнообразия
  {
    name: "Душевая стойка Modern Line",
    category: "Душевые стойки",
    inStock: true,
    stockStatus: "В наличии",
    articleNumber: "DS-2024",
    slug: "dushevaya-stojka-modern-line",
    price: 28500.00,
    oldPrice: 32000.00,
    mainImage: images.dushCat,
    images: [images.dushCat],
    style: "Современный",
    color: "Черный матовый",
    mountingType: "Настенный",
    management: "Однорычажный",
    labels: ["Новинки", "Хиты продаж"],
    description: "Современная душевая стойка с черным матовым покрытием",
    quantity: 7,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 31
  },
  {
    name: "Стойка для душа Premium",
    category: "Душевые стойки",
    inStock: true,
    stockStatus: "В наличии",
    articleNumber: "ST-PRO",
    slug: "stojka-dlya-dusha-premium",
    price: 41500.00,
    mainImage: images.stoykiCat,
    images: [images.stoykiCat],
    style: "Премиум",
    color: "Хром",
    labels: ["Премиум"],
    description: "Премиальная стойка для душа с регулируемой высотой",
    quantity: 4
  }
];

// Тестовые пользователи
const users = [
  {
    email: "admin@example.com",
    password: "Admin123!",
    firstName: "Алексей",
    lastName: "Иванов",
    phone: "+79991234567",
    address: "ул. Примерная, д. 1, кв. 1, Москва",
    role: "admin"
  },
  {
    email: "user@example.com",
    password: "User123!",
    firstName: "Мария",
    lastName: "Петрова",
    phone: "+79997654321",
    address: "ул. Тестовая, д. 2, кв. 2, Санкт-Петербург",
    role: "user"
  },
  {
    email: "customer@example.com",
    password: "Customer123!",
    firstName: "Иван",
    lastName: "Сидоров",
    phone: "+79995554433",
    role: "user"
  }
];

// Тестовые заказы
const createTestOrders = async (createdUsers, createdProducts) => {
  const orders = [
    {
      userId: createdUsers[1].id,
      status: 'delivered',
      totalAmount: 90440.00,
      subtotal: 90440.00,
      shippingAmount: 500.00,
      shippingAddress: {
        firstName: "Мария",
        lastName: "Петрова",
        street: "ул. Тестовая, д. 2",
        city: "Санкт-Петербург",
        postalCode: "190000",
        country: "Россия",
        phone: "+79997654321"
      },
      paymentMethod: "card",
      paymentStatus: "paid",
      notes: "Доставить после 18:00"
    },
    {
      userId: createdUsers[2].id,
      status: 'processing',
      totalAmount: 38000.00,
      subtotal: 38000.00,
      shippingAmount: 0.00,
      shippingAddress: {
        firstName: "Иван",
        lastName: "Сидоров",
        street: "ул. Новая, д. 3",
        city: "Москва",
        postalCode: "101000",
        country: "Россия",
        phone: "+79995554433"
      },
      paymentMethod: "online",
      paymentStatus: "paid"
    }
  ];

  const createdOrders = [];
  for (const orderData of orders) {
    const order = await db.Order.create(orderData);
    createdOrders.push(order);
  }

  // Создаем позиции заказов
  const orderItems = [
    {
      orderId: createdOrders[0].id,
      productId: createdProducts[0].id,
      quantity: 2,
      unitPrice: createdProducts[0].price,
      totalPrice: createdProducts[0].price * 2,
      productName: createdProducts[0].name,
      productSku: createdProducts[0].articleNumber,
      productImage: createdProducts[0].mainImage
    },
    {
      orderId: createdOrders[1].id,
      productId: createdProducts[2].id,
      quantity: 1,
      unitPrice: createdProducts[2].price,
      totalPrice: createdProducts[2].price,
      productName: createdProducts[2].name,
      productSku: createdProducts[2].articleNumber,
      productImage: createdProducts[2].mainImage
    }
  ];

  for (const itemData of orderItems) {
    await db.OrderItem.create(itemData);
  }

  return createdOrders;
};

const seedDatabase = async () => {
  try {
    console.log('🔧 Начинаю заполнение базы данных...');

    // Синхронизация моделей с базой данных
    await db.sequelize.sync({ force: false });
    console.log('✅ Модели синхронизированы');

    // Очистка таблиц (осторожно, удаляет все данные!)
    await db.OrderItem.destroy({ where: {} });
    await db.Order.destroy({ where: {} });
    await db.Product.destroy({ where: {} });
    await db.Category.destroy({ where: {} });
    await db.User.destroy({ where: {} });
    console.log('✅ Таблицы очищены');

    // Создание категорий
    const createdCategories = [];
    for (const categoryData of categories) {
      const category = await db.Category.create(categoryData);
      createdCategories.push(category);
      console.log(`✅ Создана категория: ${category.name}`);
    }

    // Хеширование паролей и создание пользователей
    const createdUsers = [];
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await db.User.create({
        ...userData,
        password: hashedPassword
      });
      createdUsers.push(user);
      console.log(`✅ Создан пользователь: ${user.email} (${user.role})`);
    }

    // Создание продуктов
    const createdProducts = [];
    for (const productData of products) {
      // Находим ID категории по имени
      const category = createdCategories.find(cat => 
        cat.name === productData.category
      );
      
      if (!category) {
        console.log(`⚠️ Категория не найдена: ${productData.category}`);
        continue;
      }

      const product = await db.Product.create({
        ...productData,
        categoryId: category.id
      });
      
      createdProducts.push(product);
      console.log(`✅ Создан продукт: ${product.name} (${product.articleNumber})`);
    }

    // Создание тестовых заказов
    const createdOrders = await createTestOrders(createdUsers, createdProducts);
    console.log(`✅ Создано заказов: ${createdOrders.length}`);

    // Статистика
    console.log('\n📊 Статистика заполнения:');
    console.log(`   Категории: ${createdCategories.length}`);
    console.log(`   Пользователи: ${createdUsers.length}`);
    console.log(`   Продукты: ${createdProducts.length}`);
    console.log(`   Заказы: ${createdOrders.length}`);

    console.log('\n🎉 Заполнение базы данных завершено успешно!');
    
    // Вывод тестовых учетных данных
    console.log('\n🔐 Тестовые учетные данные:');
    console.log('   Администратор:');
    console.log(`     Email: admin@example.com`);
    console.log(`     Пароль: Admin123!`);
    console.log('\n   Пользователь:');
    console.log(`     Email: user@example.com`);
    console.log(`     Пароль: User123!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error);
    process.exit(1);
  }
};

// Запуск заполнения
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };