const db = require('../models/index.js');
const bcrypt = require('bcryptjs');
const { sequelize, testConnection } = require('../config/database.js');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

// Добавьте это после IMAGE_CONFIG
function diagnosePaths() {
  console.log('\n🔍 ДИАГНОСТИКА ПУТЕЙ:');
  console.log(`   __dirname: ${__dirname}`);
  console.log(`   assetsPath: ${IMAGE_CONFIG.assetsPath}`);
  
  // Проверяем существование папки products
  const productsPath = path.join(__dirname, '../../../frontend/src/assets/products');
  console.log(`\n   Проверка productsPath: ${productsPath}`);
  console.log(`   Существует: ${fs.existsSync(productsPath) ? '✅' : '❌'}`);
  
  // Проверяем папку smesiteli
  const smesiteliPath = path.join(productsPath, 'smesiteli');
  console.log(`\n   Проверка smesiteliPath: ${smesiteliPath}`);
  console.log(`   Существует: ${fs.existsSync(smesiteliPath) ? '✅' : '❌'}`);
  
  if (fs.existsSync(smesiteliPath)) {
    const files = fs.readdirSync(smesiteliPath);
    console.log(`   Файлов в папке: ${files.length}`);
    
    // Ищем файлы MINY
    const minyFiles = files.filter(f => f.includes('miny') || f.includes('6100NU'));
    if (minyFiles.length > 0) {
      console.log(`\n   📄 Найденные файлы MINY:`);
      minyFiles.forEach(f => console.log(`      - ${f}`));
    } else {
      console.log(`\n   ❌ Файлы MINY не найдены!`);
    }
  }
}

// =============================================
// 1. КОНФИГУРАЦИЯ ПУТЕЙ К КАРТИНКАМ
// =============================================

const IMAGE_CONFIG = {
  assetsPath: path.join(__dirname, '../../../frontend/src/assets/products'),
  baseUrl: '/src/assets/products',
  
  categoryFolders: {
    1: 'smesiteli',
    2: 'dushevye-stojki',
    3: 'dushevye-sistemy',
    4: 'izlivy',
    5: 'aksessuary',
    6: 'unitazy',
    7: 'rakoviny',
    8: 'vanny'
  },
  
  collectionFolders: {
    'ERYOS': 'eryos',
    'ACIARIUM INOX': 'aciarium',
    'MODERN LINE': 'modern-line',
    'VINTAGE': 'vintage',
    'SMART': 'smart',
    'NORDIC': 'nordic',
    'MINY': 'miny'
  }
};

// =============================================
// 2. КОЛЛЕКЦИИ
// =============================================

const collections = [
  {
    id: 1,
    name: "ERYOS",
    brand: "Demm Rory",
    style: "Современный",
    basePrice: 45000,
    availableColors: ["Хром", "Черный матовый", "Белый"],
    warranty: "5 лет",
    country: "Италия"
  },
  {
    id: 2,
    name: "ACIARIUM INOX",
    brand: "Demm Rory",
    style: "Классический",
    basePrice: 38000,
    availableColors: ["Хром-Золото", "Золото", "Бронза"],
    warranty: "7 лет",
    country: "Италия"
  },
  {
    id: 3,
    name: "MODERN LINE",
    brand: "Demm Rory",
    style: "Минимализм",
    basePrice: 28500,
    availableColors: ["Черный матовый", "Графит", "Антрацит"],
    warranty: "3 года",
    country: "Германия"
  },
  {
    id: 4,
    name: "VINTAGE",
    brand: "Demm Rory",
    style: "Ретро",
    basePrice: 52000,
    availableColors: ["Латунь", "Бронза", "Никель", "Медь"],
    warranty: "5 лет",
    country: "Чехия"
  },
  {
    id: 5,
    name: "SMART",
    brand: "Demm Rory",
    style: "Хай-тек",
    basePrice: 32500,
    availableColors: ["Белый глянец", "Хром", "Черный"],
    warranty: "5 лет",
    country: "Россия"
  },
  {
    id: 6,
    name: "NORDIC",
    brand: "Demm Rory",
    style: "Скандинавский",
    basePrice: 22500,
    availableColors: ["Белый матовый", "Серый", "Дуб"],
    warranty: "3 года",
    country: "Швеция"
  },
  {
    id: 7,
    name: "MINY",
    brand: "Demm Miny",
    style: "Современный",
    basePrice: 15900,
    availableColors: ["Хром", "Черный матовый", "Белый", "Никель", "Черный"],
    warranty: "5 лет",
    country: "Италия"
  }
];

// =============================================
// 3. КАТЕГОРИИ
// =============================================

const categories = [
  { id: 1, name: 'Смесители', slug: 'smesiteli' },
  { id: 2, name: 'Душевые стойки', slug: 'dushevye-stojki' },
  { id: 3, name: 'Душевые системы', slug: 'dushevye-sistemy' },
  { id: 4, name: 'Изливы', slug: 'izlivy' },
  { id: 5, name: 'Аксессуары', slug: 'aksessuary' },
  { id: 6, name: 'Унитазы', slug: 'unitazy' },
  { id: 7, name: 'Раковины', slug: 'rakoviny' },
  { id: 8, name: 'Ванны', slug: 'vanny' }
];

// =============================================
// 4. КАТАЛОГ ТОВАРОВ
// =============================================

const catalog = [
  // ERYOS
  {
    collectionId: 1,
    categoryId: 1,
    name: "Смеситель для биде",
    articleNumber: "4720X",
    price: 45220,
    oldPrice: 54600,
    color: "Хром",
    mountingType: "На 1 отверстие",
    management: "Однорычажный",
    inStock: true,
    quantity: 15,
    isFeatured: true
  },
  {
    collectionId: 1,
    categoryId: 1,
    name: "Смеситель для раковины",
    articleNumber: "4718CD",
    price: 45220,
    oldPrice: 54600,
    color: "Хром",
    mountingType: "На 1 отверстие",
    management: "Однорычажный",
    inStock: true,
    quantity: 8,
    isFeatured: true
  },
  {
    collectionId: 1,
    categoryId: 2,
    name: "Душевая стойка",
    articleNumber: "DS-4721",
    price: 38500,
    oldPrice: 42000,
    color: "Хром",
    inStock: true,
    quantity: 5
  },
  
  // ACIARIUM INOX
  {
    collectionId: 2,
    categoryId: 1,
    name: "Смеситель Acearium",
    articleNumber: "4728CD",
    price: 38000,
    oldPrice: 42000,
    color: "Хром-Золото",
    mountingType: "На 2 отверстия",
    management: "Однорычажный",
    inStock: true,
    quantity: 12,
    isFeatured: true,
    isHit: true
  },
  {
    collectionId: 2,
    categoryId: 1,
    name: "Смеситель Acearium",
    articleNumber: "47123CD",
    price: 38000,
    oldPrice: 42000,
    color: "Золото",
    mountingType: "На 2 отверстия",
    management: "Однорычажный",
    inStock: true,
    quantity: 5,
    isHit: true
  },
  
  // MODERN LINE
  {
    collectionId: 3,
    categoryId: 2,
    name: "Душевая стойка",
    articleNumber: "DS-2024",
    price: 28500,
    oldPrice: 32000,
    color: "Черный матовый",
    inStock: true,
    quantity: 7,
    isFeatured: true,
    isHit: true
  },
  
  // VINTAGE
  {
    collectionId: 4,
    categoryId: 1,
    name: "Смеситель ретро",
    articleNumber: "VT-5501",
    price: 52500,
    oldPrice: 59000,
    color: "Латунь",
    mountingType: "На 2 отверстия",
    management: "Двухвентильный",
    inStock: true,
    quantity: 3,
    isFeatured: true
  },
  
  // SMART
  {
    collectionId: 5,
    categoryId: 6,
    name: "Унитаз-компакт",
    articleNumber: "SM-7890",
    price: 32500,
    oldPrice: 38900,
    color: "Белый глянец",
    inStock: true,
    quantity: 10
  },
  
  // NORDIC
  {
    collectionId: 6,
    categoryId: 7,
    name: "Раковина подвесная",
    articleNumber: "ND-3301",
    price: 15900,
    color: "Белый матовый",
    inStock: true,
    quantity: 15
  },
  
  // MINY
  {
    collectionId: 7,
    categoryId: 1,
    name: "Смеситель Miny",
    articleNumber: "6100NU-BLK",
    price: 15900,
    color: "Черный",
    inStock: true,
    quantity: 15
  },
  {
    collectionId: 7,
    categoryId: 1,
    name: "Смеситель Miny",
    articleNumber: "6100NU-NKL",
    price: 15900,
    color: "Никель",
    inStock: true,
    quantity: 15
  }
];

// =============================================
// 5. ФУНКЦИИ ДЛЯ РАБОТЫ С КАРТИНКАМИ
// =============================================

const scanImageDirectory = (dir, baseDir = '') => {
  let results = [];
  
  try {
    if (!fs.existsSync(dir)) {
      console.warn(`⚠️ Папка не найдена: ${dir}`);
      return results;
    }

    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      const relativePath = path.join(baseDir, file);
      
      if (stat && stat.isDirectory()) {
        const subResults = scanImageDirectory(filePath, path.join(baseDir, file));
        results = results.concat(subResults);
      } else {
        if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(file)) {
          results.push({
            fullPath: filePath,
            relativePath: relativePath,
            url: `/src/assets/products/${relativePath}`,
            filename: file,
            dirname: baseDir || 'root',
            ext: path.extname(file).toLowerCase()
          });
        }
      }
    });
  } catch (error) {
    console.error(`❌ Ошибка сканирования ${dir}:`, error.message);
  }
  
  return results;
};

const parseImageFilename = (filename) => {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  
  const result = {
    collection: null,
    color: null,
    article: null,
    category: null,
    isThumbnail: filename.includes('thumb') || filename.includes('thumbnail')
  };
  
  const articleMatch = nameWithoutExt.match(/([A-Z0-9]{4,8})$/i) || 
                       nameWithoutExt.match(/([A-Z0-9]{3,6}[-]?[0-9]{2,4})/i);
  if (articleMatch) {
    result.article = articleMatch[0];
  }
  
  const collectionMatch = nameWithoutExt.match(/(eryos|aciarium|modern[-\s]?line|vintage|smart|nordic|miny)/i);
  if (collectionMatch) {
    result.collection = collectionMatch[0].toUpperCase().replace(/\s+/g, ' ');
  }
  
  const colors = ['chrome', 'black', 'white', 'gold', 'brass', 'bronze', 'nickel', 'graphite'];
  const colorPattern = new RegExp(`(${colors.join('|')})`, 'i');
  const colorMatch = nameWithoutExt.match(colorPattern);
  if (colorMatch) {
    result.color = colorMatch[0];
  }
  
  Object.entries(IMAGE_CONFIG.categoryFolders).forEach(([id, folder]) => {
    if (filename.includes(folder) || result.dirname?.includes(folder)) {
      result.category = parseInt(id);
    }
  });
  
  return result;
};

const createImageMapping = (allImages) => {
  const mapping = {
    byArticle: new Map(),
    byCollection: new Map(),
    byCategory: new Map(),
    byFilename: new Map(),
    all: allImages
  };

  allImages.forEach(img => {
    const parsed = parseImageFilename(img.filename);
    img.parsed = parsed;
    
    if (parsed.article) {
      if (!mapping.byArticle.has(parsed.article)) {
        mapping.byArticle.set(parsed.article, []);
      }
      mapping.byArticle.get(parsed.article).push(img);
    }
    
    if (parsed.collection) {
      if (!mapping.byCollection.has(parsed.collection)) {
        mapping.byCollection.set(parsed.collection, []);
      }
      mapping.byCollection.get(parsed.collection).push(img);
    }
    
    if (parsed.category) {
      if (!mapping.byCategory.has(parsed.category)) {
        mapping.byCategory.set(parsed.category, []);
      }
      mapping.byCategory.get(parsed.category).push(img);
    }
    
    mapping.byFilename.set(img.filename.toLowerCase(), img);
  });

  return mapping;
};

// Функция для транслитерации цвета
function translateColor(color) {
  const colorMap = {
    'Хром': 'chrome',
    'Хром-Золото': 'gold-chrome',
    'Золото': 'gold',
    'Черный матовый': 'black-matte',
    'Черный': 'black',
    'Белый': 'white',
    'Белый глянец': 'white-gloss',
    'Белый матовый': 'white-matte',
    'Латунь': 'brass',
    'Бронза': 'bronze',
    'Никель': 'nickel',
    'Медь': 'copper',
    'Графит': 'graphite',
    'Антрацит': 'anthracite',
    'Серый': 'gray',
    'Дуб': 'oak'
  };
  return colorMap[color] || color?.toLowerCase().replace(/[^a-zа-я]/gi, '-').replace(/[а-я]/gi, '') || 'default';
}

const getProductImage = (product, imageMapping) => {
  const collection = collections.find(c => c.id === product.collectionId);
  const collectionName = collection?.name || '';
  const collectionFolder = IMAGE_CONFIG.collectionFolders[collectionName] || 'default';
  const categoryFolder = IMAGE_CONFIG.categoryFolders[product.categoryId] || 'other';
  
  const colorEng = translateColor(product.color);
  
  // Формируем имя файла ТОЧНО как у вас на диске: miny-black-6100NU-BLK.jpg
  const filename = `${collectionFolder}-${colorEng}-${product.articleNumber}.jpg`;
  
  // Путь для React приложения
  const imageUrl = `/src/assets/products/${categoryFolder}/${filename}`;
  const thumbnailUrl = `/src/assets/products/${categoryFolder}/thumbnails/${filename}`;
  
  // Полный путь для проверки
  const fullPath = path.join(IMAGE_CONFIG.assetsPath, categoryFolder, filename);
  
  // 1. Проверяем по артикулу в просканированных изображениях
  if (imageMapping.byArticle.has(product.articleNumber)) {
    const images = imageMapping.byArticle.get(product.articleNumber);
    const mainImage = images.find(img => !img.parsed.isThumbnail) || images[0];
    const thumbnail = images.find(img => img.parsed.isThumbnail) || mainImage;
    
    console.log(`   ✅ Найдено изображение по артикулу: ${product.articleNumber} -> ${mainImage.filename}`);
    return {
      main: mainImage.url,
      thumbnail: thumbnail.url,
      exists: true
    };
  }
  
  // 2. Проверяем существование файла по полному пути
  if (fs.existsSync(fullPath)) {
    console.log(`   ✅ Найдено изображение: ${filename}`);
    return {
      main: imageUrl,
      thumbnail: thumbnailUrl,
      exists: true
    };
  }
  
  // 3. Если файл не найден - подробная диагностика
  console.log(`   ⚠️ Изображение НЕ НАЙДЕНО: ${filename}`);
  console.log(`      Полный путь: ${fullPath}`);
  console.log(`      Категория: ${categoryFolder}`);
  console.log(`      Коллекция: ${collectionFolder}`);
  console.log(`      Цвет (рус): ${product.color}`);
  console.log(`      Цвет (анг): ${colorEng}`);
  console.log(`      Артикул: ${product.articleNumber}`);
  
  // Проверяем, существует ли папка
  const categoryPath = path.join(IMAGE_CONFIG.assetsPath, categoryFolder);
  if (!fs.existsSync(categoryPath)) {
    console.log(`      ❌ Папка категории не существует: ${categoryPath}`);
  } else {
    // Проверяем, есть ли вообще файлы в папке
    const files = fs.readdirSync(categoryPath);
    console.log(`      📁 В папке ${files.length} файлов`);
    
    // Ищем похожие файлы
    const similarFiles = files.filter(f => 
      f.includes(product.articleNumber) || 
      f.includes(collectionFolder) ||
      f.includes(colorEng)
    );
    
    if (similarFiles.length > 0) {
      console.log(`      🔍 Похожие файлы:`);
      similarFiles.forEach(f => console.log(`         - ${f}`));
    }
  }
  
  return {
    main: `https://via.placeholder.com/800x800/3a86ff/fff?text=${collectionFolder}+${product.articleNumber}`,
    thumbnail: `https://via.placeholder.com/200x200/3a86ff/fff?text=${collectionFolder}+${product.articleNumber}`,
    exists: false,
    isPlaceholder: true
  };
};

// Вспомогательные функции
function generateDescription(item, collection) {
  return `${collection.name} - ${item.name}. ${collection.style} стиль. Цвет: ${item.color}. Артикул: ${item.articleNumber}.`;
}

function getLabels(item) {
  const labels = [];
  if (item.isHit) labels.push('Хит продаж');
  if (item.isFeatured) labels.push('Новинка');
  if (item.oldPrice) labels.push('Акция');
  return labels;
}

function getMaterialByCategory(categoryId) {
  const materials = {
    1: 'Латунь',
    2: 'Нержавеющая сталь',
    3: 'Нержавеющая сталь',
    4: 'Латунь',
    5: 'Латунь/Пластик',
    6: 'Санфарфор',
    7: 'Керамика',
    8: 'Акрил'
  };
  return materials[categoryId] || 'Латунь';
}

function getFeaturesByCollection(collectionId) {
  const features = {
    1: ['Керамический картридж', 'Плавный ход рычага', 'Аэратор'],
    2: ['Двойное покрытие', 'Золотые элементы', 'Керамический картридж 40мм'],
    3: ['Тропический душ', 'Термостат', 'Антиизвестковое покрытие'],
    4: ['Винтажный дизайн', 'Состаренные элементы', 'Керамический картридж'],
    5: ['Микролифт', 'Двойной слив', 'Антивсплеск', 'Антибактериальное покрытие'],
    6: ['Экологичные материалы', 'Минималистичный дизайн', 'Эргономика'],
    7: ['Современный дизайн', 'Надежность', 'Качество']
  };
  return features[collectionId] || ['Высокое качество', 'Надежность'];
}

// =============================================
// 6. ПРОВЕРКА НАЛИЧИЯ ИЗОБРАЖЕНИЙ
// =============================================

function checkImagesExist() {
  console.log('\n🔍 ПРОВЕРКА НАЛИЧИЯ ИЗОБРАЖЕНИЙ:');
  console.log(`   Папка с изображениями: ${IMAGE_CONFIG.assetsPath}`);
  
  if (!fs.existsSync(IMAGE_CONFIG.assetsPath)) {
    console.log(`   ❌ Папка НЕ СУЩЕСТВУЕТ!`);
    console.log(`   Создайте папку: ${IMAGE_CONFIG.assetsPath}`);
    return false;
  }
  
  let allFound = true;
  
  catalog.forEach(product => {
    const collection = collections.find(c => c.id === product.collectionId);
    const collectionFolder = IMAGE_CONFIG.collectionFolders[collection?.name] || 'default';
    const categoryFolder = IMAGE_CONFIG.categoryFolders[product.categoryId] || 'other';
    const colorEng = translateColor(product.color);
    const filename = `${collectionFolder}-${colorEng}-${product.articleNumber}.jpg`;
    const fullPath = path.join(IMAGE_CONFIG.assetsPath, categoryFolder, filename);
    
    if (fs.existsSync(fullPath)) {
      console.log(`   ✅ ${product.articleNumber} -> ${categoryFolder}/${filename}`);
    } else {
      console.log(`   ❌ ${product.articleNumber} -> ${categoryFolder}/${filename} (НЕ НАЙДЕНО!)`);
      allFound = false;
    }
  });
  
  return allFound;
}

// =============================================
// 7. СОЗДАНИЕ ПАПОК ДЛЯ ИЗОБРАЖЕНИЙ
// =============================================

function createImageFolders() {
  console.log('\n📁 СОЗДАНИЕ ПАПОК ДЛЯ ИЗОБРАЖЕНИЙ:');
  
  // Создаем основную папку
  if (!fs.existsSync(IMAGE_CONFIG.assetsPath)) {
    fs.mkdirSync(IMAGE_CONFIG.assetsPath, { recursive: true });
    console.log(`   ✅ Создана папка: ${IMAGE_CONFIG.assetsPath}`);
  }
  
  // Создаем папки для категорий
  Object.values(IMAGE_CONFIG.categoryFolders).forEach(folder => {
    const categoryPath = path.join(IMAGE_CONFIG.assetsPath, folder);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
      console.log(`   ✅ Создана папка: ${folder}/`);
    }
    
    // Создаем папку для миниатюр
    const thumbnailsPath = path.join(categoryPath, 'thumbnails');
    if (!fs.existsSync(thumbnailsPath)) {
      fs.mkdirSync(thumbnailsPath, { recursive: true });
      console.log(`   ✅ Создана папка: ${folder}/thumbnails/`);
    }
  });
}

// =============================================
// 8. ОСНОВНАЯ ФУНКЦИЯ
// =============================================

const seedDatabase = async () => {
  try {
    console.log('🔧 Начинаем заполнение базы данных...');

    diagnosePaths();
    
    await testConnection();

    
    // ВАЖНО: Синхронизируем модели с базой данных
    console.log('\n🔄 Синхронизация моделей с базой данных...');
    await sequelize.sync({ force: true });
    console.log('✅ Модели синхронизированы');
    
    // Создаем папки для изображений
    createImageFolders();
    
    // Проверяем наличие изображений
    const imagesExist = checkImagesExist();
    
    if (!imagesExist) {
      console.log('\n⚠️ ВНИМАНИЕ: Не все изображения найдены!');
      console.log('   Поместите изображения в соответствующие папки:');
      console.log(`   ${IMAGE_CONFIG.assetsPath}/smesiteli/`);
      console.log('   Формат имени: коллекция-цвет-артикул.jpg');
      console.log('   Например: miny-nickel-6100NU-NKL.jpg');
    }
    
    // 1. Сканируем изображения
    console.log('\n📸 Сканирование изображений...');
    const allImages = scanImageDirectory(IMAGE_CONFIG.assetsPath);
    const imageMapping = createImageMapping(allImages);
    
    console.log(`   ✅ Найдено изображений: ${allImages.length}`);
    
    // 2. Создаем категории
    console.log('\n📁 Создание категорий...');
    
    const createdCategories = [];
    for (const cat of categories) {
      const category = await db.Category.create(cat);
      createdCategories.push(category);
      console.log(`   ✅ ${category.name}`);
    }
    
    // 3. Создаем товары
    console.log('\n📦 Создание продуктов...');
    
    const createdProducts = [];
    
    for (let i = 0; i < catalog.length; i++) {
      const item = catalog[i];
      const collection = collections.find(c => c.id === item.collectionId);
      
      if (!collection) {
        console.warn(`   ⚠️ Коллекция не найдена для товара ${item.articleNumber}`);
        continue;
      }
      
      const images = getProductImage(item, imageMapping);
      
      const slugBase = `${collection.brand}-${collection.name}-${item.name}-${item.articleNumber}`
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      const productData = {
        name: `${collection.brand} ${collection.name} ${item.name}`,
        slug: slugify(slugBase, { lower: true, strict: true }),
        description: item.description || generateDescription(item, collection),
        price: item.price,
        oldPrice: item.oldPrice || null,
        articleNumber: item.articleNumber,
        sku: `${item.articleNumber}-${Date.now().toString().slice(-4)}`,
        mainImage: images.main,
        thumbnail: images.thumbnail,
        images: [images.main],
        inStock: item.inStock,
        stockStatus: item.stockStatus || (item.inStock ? 'В наличии' : 'Нет в наличии'),
        quantity: item.quantity || 0,
        style: collection.style,
        color: item.color,
        mountingType: item.mountingType || null,
        management: item.management || null,
        collection: collection.name,
        labels: getLabels(item),
        isFeatured: item.isFeatured || false,
        isActive: true,
        categoryId: item.categoryId,
        specifications: {
          material: getMaterialByCategory(item.categoryId),
          coating: item.color,
          warranty: collection.warranty,
          country: collection.country,
          collection: collection.name
        },
        features: getFeaturesByCollection(collection.id)
      };
      
      try {
        const product = await db.Product.create(productData);
        createdProducts.push(product);
        
        if ((i + 1) % 5 === 0 || i === catalog.length - 1) {
          const progress = ((i + 1) / catalog.length * 100).toFixed(0);
          const imageStatus = images.exists ? '✅' : '🟡';
          console.log(`   ${imageStatus} [${progress}%] ${product.name} - ${item.articleNumber}`);
          console.log(`      mainImage: ${product.mainImage}`);
        }
      } catch (err) {
        console.error(`   ❌ Ошибка создания товара ${item.articleNumber}:`, err.message);
      }
    }
    
    console.log(`\n   ✅ Создано товаров: ${createdProducts.length}`);
    
    const realImagesCount = createdProducts.filter(p => 
      !p.mainImage.includes('placeholder') && !p.mainImage.includes('via.placeholder.com')
    ).length;
    
    console.log('\n🖼️ СТАТИСТИКА ИЗОБРАЖЕНИЙ:');
    console.log(`   Реальные изображения: ${realImagesCount} товаров`);
    console.log(`   Placeholder: ${createdProducts.length - realImagesCount} товаров`);
    
    if (realImagesCount < createdProducts.length) {
      console.log('\n⚠️ РЕКОМЕНДАЦИИ:');
      console.log('   1. Создайте папки для изображений:');
      Object.values(IMAGE_CONFIG.categoryFolders).forEach(folder => {
        console.log(`      ${IMAGE_CONFIG.assetsPath}\\${folder}\\`);
        console.log(`      ${IMAGE_CONFIG.assetsPath}\\${folder}\\thumbnails\\`);
      });
      console.log('\n   2. Поместите изображения в соответствующие папки:');
      console.log('      Формат имени: коллекция-цвет-артикул.jpg');
      console.log('      Например: miny-nickel-6100NU-NKL.jpg');
      console.log('               miny-black-6100NU-BLK.jpg');
    }
    
    console.log('\n🎉 Заполнение базы данных завершено!');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Ошибка:', error);
    process.exit(1);
  }
};

// Запуск
seedDatabase();