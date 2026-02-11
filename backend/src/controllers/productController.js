const { Product, Category } = require('../models');
const { Op } = require('sequelize');

// ============== GET ALL PRODUCTS ==============
exports.getAllProducts = async (req, res) => {
  try {
    console.log('Fetching products with filters:', req.query);
    
    const {
      category,
      categoryId,
      collections,
      styles,
      colors,
      views,
      mountingTypes,
      managements,
      numberSources,
      minPrice,
      maxPrice,
      inStock,
      sort,
      limit,
      page = 1,
      isActive = true
    } = req.query;

    // Строим where условия
    const where = {};

// 🔹 ФИЛЬТР ПО АКТИВНОСТИ - ИСПРАВЛЕНО!
if (isActive !== undefined) {
  // Если параметр передан, преобразуем строку в boolean
  where.isActive = isActive === 'true' || isActive === true;
} else {
  // По умолчанию показываем ТОЛЬКО АКТИВНЫЕ ТОВАРЫ
  where.isActive = true;
}

// 🔹 Добавим лог для отладки
console.log('isActive filter:', { 
  received: isActive, 
  type: typeof isActive, 
  applied: where.isActive 
});

    // Фильтр по наличию
    if (inStock !== undefined) {
      where.inStock = inStock === 'true';
    }
    
    // Фильтр по коллекциям
    if (collections) {
      where.collection = { [Op.in]: collections.split(',') };
    }
    
    // Фильтр по стилям
    if (styles) {
      where.style = { [Op.in]: styles.split(',') };
    }
    
    // Фильтр по цветам
    if (colors) {
      where.color = { [Op.in]: colors.split(',') };
    }
    
    // Фильтр по видам
    if (views) {
      where.view = { [Op.in]: views.split(',') };
    }
    
    // Фильтр по типам монтажа
    if (mountingTypes) {
      where.mountingType = { [Op.in]: mountingTypes.split(',') };
    }
    
    // Фильтр по управлению
    if (managements) {
      where.management = { [Op.in]: managements.split(',') };
    }
    
    // Фильтр по количеству отверстий
    if (numberSources) {
      const numbers = numberSources.split(',').map(n => parseInt(n));
      where.numberSource = { [Op.in]: numbers };
    }
    
    // Фильтр по цене
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
    }

    // Сортировка
    let order = [['createdAt', 'DESC']];
    if (sort) {
      switch (sort) {
        case 'price_asc':
          order = [['price', 'ASC']];
          break;
        case 'price_desc':
          order = [['price', 'DESC']];
          break;
        case 'popularity':
          order = [['rating', 'DESC'], ['reviewCount', 'DESC']];
          break;
        case 'newest':
          order = [['createdAt', 'DESC']];
          break;
        case 'name_asc':
          order = [['name', 'ASC']];
          break;
        case 'name_desc':
          order = [['name', 'DESC']];
          break;
      }
    }

    // Пагинация
    const pageSize = limit ? parseInt(limit) : 50;
    const offset = (parseInt(page) - 1) * pageSize;

    // Опции для запроса
    const queryOptions = {
      where,
      order,
      limit: pageSize,
      offset,
      distinct: true,
      include: []
    };

    // Добавляем категорию, если нужно фильтровать по категории
    if (category || categoryId) {
      queryOptions.include.push({
        model: Category,
        as: 'category',
        where: {}
      });

      if (category) {
        queryOptions.include[0].where.name = { [Op.iLike]: `%${category}%` };
      }
      
      if (categoryId) {
        queryOptions.include[0].where.id = categoryId;
      }
    }

    let products;
    let count;
    
    try {
      // Пытаемся получить данные из БД
      const result = await Product.findAndCountAll(queryOptions);
      products = result.rows;
      count = result.count;
    } catch (dbError) {
      console.warn('Database error, using mock data:', dbError.message);
      
      // Если БД недоступна, используем тестовые данные
      const mockProducts = [
        {
          id: 1,
          name: "Смеситель для раковины Demm Classic",
          slug: "smesitel-classic",
          articleNumber: "ART001",
          price: 25000,
          oldPrice: 30000,
          collection: "Classic",
          style: "Классический",
          color: "Хром",
          view: "Стандартный",
          mountingType: "Настенный",
          management: "Однорычажный",
          numberSource: 1,
          inStock: true,
          stockStatus: "В наличии",
          labels: ["Новинки"],
          mainImage: "/uploads/smesitel-classic.jpg",
          images: ["/uploads/smesitel-classic.jpg"],
          rating: 4.5,
          reviewCount: 12,
          isActive: true,
          category: {
            id: 1,
            name: "Смесители",
            slug: "smesiteli"
          }
        },
        {
          id: 2,
          name: "Смеситель для кухни Demm Modern",
          slug: "smesitel-modern",
          articleNumber: "ART002",
          price: 35000,
          oldPrice: 40000,
          collection: "Modern",
          style: "Современный",
          color: "Черный матовый",
          view: "Высокий",
          mountingType: "Настольный",
          management: "Однорычажный",
          numberSource: 2,
          inStock: true,
          stockStatus: "В наличии",
          labels: ["Хиты продаж"],
          mainImage: "/uploads/smesitel-modern.jpg",
          images: ["/uploads/smesitel-modern.jpg"],
          rating: 4.8,
          reviewCount: 24,
          isActive: true,
          category: {
            id: 1,
            name: "Смесители",
            slug: "smesiteli"
          }
        },
        {
          id: 3,
          name: "Смеситель для ванны Demm Retro",
          slug: "smesitel-retro",
          articleNumber: "ART003",
          price: 45000,
          oldPrice: 50000,
          collection: "Retro",
          style: "Ретро",
          color: "Бронза",
          view: "Стандартный",
          mountingType: "Настенный",
          management: "Двухвентильный",
          numberSource: 1,
          inStock: true,
          stockStatus: "В наличии",
          labels: ["Акция"],
          mainImage: "/uploads/smesitel-retro.jpg",
          images: ["/uploads/smesitel-retro.jpg"],
          rating: 4.3,
          reviewCount: 8,
          isActive: true,
          category: {
            id: 1,
            name: "Смесители",
            slug: "smesiteli"
          }
        }
      ];
      
      // Применяем фильтры к тестовым данным
      let filteredMock = mockProducts;
      
      if (category) {
        filteredMock = filteredMock.filter(p => 
          p.category.name.toLowerCase().includes(category.toLowerCase())
        );
      }
      
      if (minPrice) {
        filteredMock = filteredMock.filter(p => p.price >= parseFloat(minPrice));
      }
      
      if (maxPrice) {
        filteredMock = filteredMock.filter(p => p.price <= parseFloat(maxPrice));
      }
      
      if (collections) {
        const collectionArray = collections.split(',');
        filteredMock = filteredMock.filter(p => 
          collectionArray.includes(p.collection)
        );
      }
      
      if (styles) {
        const styleArray = styles.split(',');
        filteredMock = filteredMock.filter(p => 
          styleArray.includes(p.style)
        );
      }
      
      if (colors) {
        const colorArray = colors.split(',');
        filteredMock = filteredMock.filter(p => 
          colorArray.includes(p.color)
        );
      }
      
      if (inStock !== undefined) {
        filteredMock = filteredMock.filter(p => 
          p.inStock === (inStock === 'true')
        );
      }
      
      products = filteredMock;
      count = filteredMock.length;
      
      // Применяем сортировку к тестовым данным
      if (sort) {
        switch (sort) {
          case 'price_asc':
            products.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            products.sort((a, b) => b.price - a.price);
            break;
          case 'popularity':
            products.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
            break;
          case 'name_asc':
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'name_desc':
            products.sort((a, b) => b.name.localeCompare(a.name));
            break;
        }
      }
      
      // Применяем пагинацию к тестовым данным
      products = products.slice(offset, offset + pageSize);
    }

    console.log(`Found ${count} products`);

    res.json({
      products,
      total: count,
      page: parseInt(page),
      pageSize,
      totalPages: Math.ceil(count / pageSize)
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// ============== GET PRODUCT BY ID ==============
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Проверка - ID должно быть числом
    if (isNaN(id) || id === 'products' || id === 'featured' || id === 'categories' || id === 'search' || id === 'slug') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    
    try {
      const product = await Product.findByPk(id, {
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }]
      });
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      // Увеличиваем счетчик просмотров
      await product.increment('views', { by: 1 });
      
      res.json(product);
    } catch (dbError) {
      console.warn('Database error, using mock data:', dbError.message);
      
      // Тестовые данные
      const mockProducts = {
        1: {
          id: 1,
          name: "Смеситель для раковины Demm Classic",
          slug: "smesitel-classic",
          articleNumber: "ART001",
          price: 25000,
          oldPrice: 30000,
          collection: "Classic",
          style: "Классический",
          color: "Хром",
          view: "Стандартный",
          mountingType: "Настенный",
          management: "Однорычажный",
          numberSource: 1,
          inStock: true,
          stockStatus: "В наличии",
          quantity: 15,
          labels: ["Новинки"],
          mainImage: "/uploads/smesitel-classic.jpg",
          images: ["/uploads/smesitel-classic.jpg", "/uploads/smesitel-classic-2.jpg"],
          rating: 4.5,
          reviewCount: 12,
          isFeatured: true,
          isActive: true,
          description: "Элегантный смеситель для раковины в классическом стиле. Идеально подходит для ванных комнат в традиционном стиле.",
          specifications: {
            material: "Латунь",
            coating: "Хром",
            warranty: "5 лет"
          },
          features: ["Керамический картридж", "Аэратор", "Поворотный излив"],
          category: {
            id: 1,
            name: "Смесители",
            slug: "smesiteli"
          }
        },
        2: {
          id: 2,
          name: "Смеситель для кухни Demm Modern",
          slug: "smesitel-modern",
          articleNumber: "ART002",
          price: 35000,
          oldPrice: 40000,
          collection: "Modern",
          style: "Современный",
          color: "Черный матовый",
          view: "Высокий",
          mountingType: "Настольный",
          management: "Однорычажный",
          numberSource: 2,
          inStock: true,
          stockStatus: "В наличии",
          quantity: 8,
          labels: ["Хиты продаж"],
          mainImage: "/uploads/smesitel-modern.jpg",
          images: ["/uploads/smesitel-modern.jpg", "/uploads/smesitel-modern-2.jpg"],
          rating: 4.8,
          reviewCount: 24,
          isFeatured: true,
          isActive: true,
          description: "Современный смеситель для кухни с высоким изливом. Стильный дизайн и отличная функциональность.",
          specifications: {
            material: "Нержавеющая сталь",
            coating: "Черный матовый",
            warranty: "5 лет"
          },
          features: ["Керамический картридж", "Поворотный на 360°", "Аэратор с экономией воды"],
          category: {
            id: 1,
            name: "Смесители",
            slug: "smesiteli"
          }
        },
        3: {
          id: 3,
          name: "Смеситель для ванны Demm Retro",
          slug: "smesitel-retro",
          articleNumber: "ART003",
          price: 45000,
          oldPrice: 50000,
          collection: "Retro",
          style: "Ретро",
          color: "Бронза",
          view: "Стандартный",
          mountingType: "Настенный",
          management: "Двухвентильный",
          numberSource: 1,
          inStock: true,
          stockStatus: "В наличии",
          quantity: 5,
          labels: ["Акция"],
          mainImage: "/uploads/smesitel-retro.jpg",
          images: ["/uploads/smesitel-retro.jpg", "/uploads/smesitel-retro-2.jpg"],
          rating: 4.3,
          reviewCount: 8,
          isFeatured: false,
          isActive: true,
          description: "Винтажный смеситель для ванны в ретро-стиле. Создает атмосферу старины и элегантности.",
          specifications: {
            material: "Латунь",
            coating: "Бронза",
            warranty: "3 года"
          },
          features: ["Керамические вентили", "Долговечное покрытие", "Классический дизайн"],
          category: {
            id: 1,
            name: "Смесители",
            slug: "smesiteli"
          }
        }
      };

      const product = mockProducts[parseInt(id)];
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json(product);
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
};

// ============== GET PRODUCT BY SLUG ==============
exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    try {
      const product = await Product.findOne({
        where: { slug, isActive: true },
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }]
      });
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      // Увеличиваем счетчик просмотров
      await product.increment('views', { by: 1 });
      
      res.json(product);
    } catch (dbError) {
      console.warn('Database error, using mock data:', dbError.message);
      
      // Тестовые данные по slug
      const mockProducts = {
        'smesitel-classic': {
          id: 1,
          name: "Смеситель для раковины Demm Classic",
          slug: "smesitel-classic",
          articleNumber: "ART001",
          price: 25000,
          oldPrice: 30000,
          collection: "Classic",
          style: "Классический",
          color: "Хром",
          view: "Стандартный",
          mountingType: "Настенный",
          management: "Однорычажный",
          numberSource: 1,
          inStock: true,
          stockStatus: "В наличии",
          labels: ["Новинки"],
          mainImage: "/uploads/smesitel-classic.jpg",
          images: ["/uploads/smesitel-classic.jpg"],
          rating: 4.5,
          reviewCount: 12,
          isActive: true,
          description: "Элегантный смеситель для раковины в классическом стиле.",
          category: {
            id: 1,
            name: "Смесители",
            slug: "smesiteli"
          }
        },
        'smesitel-modern': {
          id: 2,
          name: "Смеситель для кухни Demm Modern",
          slug: "smesitel-modern",
          articleNumber: "ART002",
          price: 35000,
          oldPrice: 40000,
          collection: "Modern",
          style: "Современный",
          color: "Черный матовый",
          view: "Высокий",
          mountingType: "Настольный",
          management: "Однорычажный",
          numberSource: 2,
          inStock: true,
          stockStatus: "В наличии",
          labels: ["Хиты продаж"],
          mainImage: "/uploads/smesitel-modern.jpg",
          images: ["/uploads/smesitel-modern.jpg"],
          rating: 4.8,
          reviewCount: 24,
          isActive: true,
          description: "Современный смеситель для кухни с высоким изливом.",
          category: {
            id: 1,
            name: "Смесители",
            slug: "smesiteli"
          }
        },
        'smesitel-retro': {
          id: 3,
          name: "Смеситель для ванны Demm Retro",
          slug: "smesitel-retro",
          articleNumber: "ART003",
          price: 45000,
          oldPrice: 50000,
          collection: "Retro",
          style: "Ретро",
          color: "Бронза",
          view: "Стандартный",
          mountingType: "Настенный",
          management: "Двухвентильный",
          numberSource: 1,
          inStock: true,
          stockStatus: "В наличии",
          labels: ["Акция"],
          mainImage: "/uploads/smesitel-retro.jpg",
          images: ["/uploads/smesitel-retro.jpg"],
          rating: 4.3,
          reviewCount: 8,
          isActive: true,
          description: "Винтажный смеситель для ванны в ретро-стиле.",
          category: {
            id: 1,
            name: "Смесители",
            slug: "smesiteli"
          }
        }
      };

      const product = mockProducts[slug];
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json(product);
    }
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
};

// ============== CREATE PRODUCT ==============
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    // Handle file upload
    if (req.file) {
      productData.mainImage = `/uploads/${req.file.filename}`;
      
      // Добавляем в массив images
      if (!productData.images) {
        productData.images = [];
      }
      productData.images.push(productData.mainImage);
    }
    
    // Генерируем slug если не указан
    if (!productData.slug && productData.name) {
      productData.slug = productData.name
        .toLowerCase()
        .replace(/[^a-zа-я0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      // Проверяем уникальность slug
      let slugExists = true;
      let counter = 0;
      let baseSlug = productData.slug;
      
      while (slugExists) {
        try {
          const existingProduct = await Product.findOne({ 
            where: { slug: productData.slug } 
          });
          
          if (!existingProduct) {
            slugExists = false;
          } else {
            counter++;
            productData.slug = `${baseSlug}-${counter}`;
          }
        } catch (error) {
          // Если БД недоступна, просто используем сгенерированный slug
          console.warn('Database not available, skipping slug uniqueness check');
          slugExists = false;
        }
      }
    }
    
    // Устанавливаем значения по умолчанию
    if (productData.inStock === undefined) {
      productData.inStock = true;
    }
    
    if (productData.stockStatus === undefined) {
      productData.stockStatus = 'В наличии';
    }
    
    if (productData.isActive === undefined) {
      productData.isActive = true;
    }
    
    if (productData.labels === undefined) {
      productData.labels = [];
    }
    
    if (productData.images === undefined) {
      productData.images = [];
    }
    
    if (productData.rating === undefined) {
      productData.rating = 0;
    }
    
    if (productData.reviewCount === undefined) {
      productData.reviewCount = 0;
    }
    
    try {
      const product = await Product.create(productData);
      
      res.status(201).json({
        message: 'Product created successfully',
        product
      });
    } catch (dbError) {
      console.warn('Database error, returning mock response:', dbError.message);
      
      // Возвращаем mock-ответ
      const mockProduct = {
        id: Math.floor(Math.random() * 1000) + 100,
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      res.status(201).json({
        message: 'Product created successfully (mock)',
        product: mockProduct
      });
    }
  } catch (error) {
    console.error('Error creating product:', error);
    
    // Handle duplicate slug error
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        error: 'Product with this slug already exists' 
      });
    }
    
    // Handle validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.errors.map(e => e.message)
      });
    }
    
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
};

// ============== UPDATE PRODUCT ==============
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Проверка - ID должно быть числом
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    
    const productData = req.body;
    
    // Handle file upload
    if (req.file) {
      productData.mainImage = `/uploads/${req.file.filename}`;
      
      // Добавляем в массив images
      if (!productData.images) {
        productData.images = [];
      }
      productData.images.push(productData.mainImage);
    }
    
    try {
      const product = await Product.findByPk(id);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      await product.update(productData);
      
      res.json({
        message: 'Product updated successfully',
        product
      });
    } catch (dbError) {
      console.warn('Database error, using mock response:', dbError.message);
      
      // Mock response
      res.json({
        message: 'Product updated successfully (mock)',
        product: {
          id: parseInt(id),
          ...productData,
          updatedAt: new Date()
        }
      });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        error: 'Product with this slug already exists' 
      });
    }
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.errors.map(e => e.message)
      });
    }
    
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
};

// ============== DELETE PRODUCT ==============
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Проверка - ID должно быть числом
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    
    try {
      const product = await Product.findByPk(id);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      // Мягкое удаление (soft delete) - просто деактивируем
      await product.update({ isActive: false });
      
      res.json({ 
        message: 'Product deactivated successfully',
        productId: parseInt(id)
      });
    } catch (dbError) {
      console.warn('Database error, using mock response:', dbError.message);
      
      res.json({ 
        message: 'Product deactivated successfully (mock)',
        productId: parseInt(id)
      });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
};

// ============== GET CATEGORIES ==============
exports.getCategories = async (req, res) => {
  try {
    try {
      const categories = await Category.findAll({
        attributes: ['id', 'name', 'slug', 'description', 'image'],
        include: [{
          model: Product,
          as: 'products',
          attributes: [],
          where: { isActive: true },
          required: false
        }],
        order: [['name', 'ASC']]
      });
      
      // Добавляем количество товаров в каждой категории
      const categoriesWithCount = categories.map(cat => {
        const categoryJson = cat.toJSON();
        return {
          ...categoryJson,
          productCount: categoryJson.products ? categoryJson.products.length : 0,
          products: undefined // убираем массив products из ответа
        };
      });
      
      res.json(categoriesWithCount);
    } catch (dbError) {
      console.warn('Database error, using mock categories:', dbError.message);
      
      // Mock categories
      const mockCategories = [
        { id: 1, name: "Смесители", slug: "smesiteli", description: "Смесители для ванной и кухни", productCount: 3 },
        { id: 2, name: "Душевые системы", slug: "dushevye-sistemy", description: "Душевые системы и гарнитуры", productCount: 0 },
        { id: 3, name: "Аксессуары", slug: "aksessuary", description: "Аксессуары для ванной", productCount: 0 },
        { id: 4, name: "Изливы", slug: "izlivy", description: "Изливы для смесителей", productCount: 0 },
        { id: 5, name: "Стойки", slug: "stoyki", description: "Стойки для душа", productCount: 0 }
      ];
      
      res.json(mockCategories);
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
};

// ============== SEARCH PRODUCTS ==============
exports.searchProducts = async (req, res) => {
  try {
    const { q, limit = 20 } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ 
        error: 'Search query must be at least 2 characters' 
      });
    }
    
    const searchTerm = `%${q.trim()}%`;
    
    try {
      const products = await Product.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: searchTerm } },
            { articleNumber: { [Op.iLike]: searchTerm } },
            { sku: { [Op.iLike]: searchTerm } },
            { description: { [Op.iLike]: searchTerm } },
            { collection: { [Op.iLike]: searchTerm } }
          ],
          isActive: true
        },
        attributes: [
          'id', 'name', 'slug', 'price', 'oldPrice', 
          'mainImage', 'articleNumber', 'collection'
        ],
        limit: parseInt(limit),
        order: [
          ['name', 'ASC']
        ]
      });
      
      res.json({
        query: q,
        count: products.length,
        products
      });
    } catch (dbError) {
      console.warn('Database error, using mock search:', dbError.message);
      
      // Mock search
      const mockProducts = [
        {
          id: 1,
          name: "Смеситель для раковины Demm Classic",
          slug: "smesitel-classic",
          price: 25000,
          oldPrice: 30000,
          mainImage: "/uploads/smesitel-classic.jpg",
          articleNumber: "ART001",
          collection: "Classic"
        },
        {
          id: 2,
          name: "Смеситель для кухни Demm Modern",
          slug: "smesitel-modern",
          price: 35000,
          oldPrice: 40000,
          mainImage: "/uploads/smesitel-modern.jpg",
          articleNumber: "ART002",
          collection: "Modern"
        }
      ].filter(p => 
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.articleNumber.toLowerCase().includes(q.toLowerCase())
      );
      
      res.json({
        query: q,
        count: mockProducts.length,
        products: mockProducts
      });
    }
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
};

// ============== GET FEATURED PRODUCTS ==============
exports.getFeaturedProducts = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    try {
      const products = await Product.findAll({
        where: {
          isFeatured: true,
          isActive: true,
          inStock: true
        },
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }],
        limit: parseInt(limit),
        order: [
          ['rating', 'DESC'],
          ['createdAt', 'DESC']
        ]
      });
      
      res.json(products);
    } catch (dbError) {
      console.warn('Database error, using mock featured products:', dbError.message);
      
      // Mock featured products
      const mockFeatured = [
        {
          id: 1,
          name: "Смеситель для раковины Demm Classic",
          slug: "smesitel-classic",
          price: 25000,
          oldPrice: 30000,
          mainImage: "/uploads/smesitel-classic.jpg",
          rating: 4.5,
          reviewCount: 12,
          category: { id: 1, name: "Смесители", slug: "smesiteli" }
        },
        {
          id: 2,
          name: "Смеситель для кухни Demm Modern",
          slug: "smesitel-modern",
          price: 35000,
          oldPrice: 40000,
          mainImage: "/uploads/smesitel-modern.jpg",
          rating: 4.8,
          reviewCount: 24,
          category: { id: 1, name: "Смесители", slug: "smesiteli" }
        }
      ];
      
      res.json(mockFeatured.slice(0, parseInt(limit)));
    }
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
};

// ============== GET RELATED PRODUCTS ==============
exports.getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 4 } = req.query;
    
    // Проверка - ID должно быть числом
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    
    try {
      const product = await Product.findByPk(id);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      // Ищем товары из той же категории и коллекции
      const relatedProducts = await Product.findAll({
        where: {
          id: { [Op.ne]: id },
          categoryId: product.categoryId,
          isActive: true,
          inStock: true,
          [Op.or]: [
            { collection: product.collection },
            { style: product.style }
          ]
        },
        attributes: [
          'id', 'name', 'slug', 'price', 'oldPrice', 
          'mainImage', 'articleNumber', 'collection', 'rating'
        ],
        limit: parseInt(limit),
        order: [
          ['rating', 'DESC'],
          ['createdAt', 'DESC']
        ]
      });
      
      res.json(relatedProducts);
    } catch (dbError) {
      console.warn('Database error, using mock related products:', dbError.message);
      
      // Mock related products
      const mockRelated = [
        {
          id: 2,
          name: "Смеситель для кухни Demm Modern",
          slug: "smesitel-modern",
          price: 35000,
          oldPrice: 40000,
          mainImage: "/uploads/smesitel-modern.jpg",
          articleNumber: "ART002",
          collection: "Modern",
          rating: 4.8
        },
        {
          id: 3,
          name: "Смеситель для ванны Demm Retro",
          slug: "smesitel-retro",
          price: 45000,
          oldPrice: 50000,
          mainImage: "/uploads/smesitel-retro.jpg",
          articleNumber: "ART003",
          collection: "Retro",
          rating: 4.3
        }
      ];
      
      res.json(mockRelated.slice(0, parseInt(limit)));
    }
  } catch (error) {
    console.error('Error fetching related products:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
};