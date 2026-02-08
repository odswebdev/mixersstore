/*const db = require('../config/database');

class Product {
  static async findAll(filters = {}) {
    let query = `
      SELECT id, name, slug, category, in_stock as "inStock", 
             article_number as "articleNumber", price, old_price as "oldPrice",
             image_url as "imageUrl", style, color, view, mounting_type as "mountingType",
             management, number_source as "numberSource", collection, labels,
             created_at as "createdAt", updated_at as "updatedAt"
      FROM products 
      WHERE 1=1
    `;
    const values = [];
    let index = 1;

    if (filters.category) {
      query += ` AND category = $${index}`;
      values.push(filters.category);
      index++;
    }

    if (filters.minPrice) {
      query += ` AND price >= $${index}`;
      values.push(filters.minPrice);
      index++;
    }

    if (filters.maxPrice) {
      query += ` AND price <= $${index}`;
      values.push(filters.maxPrice);
      index++;
    }

    if (filters.inStock) {
      query += ` AND in_stock = $${index}`;
      values.push(filters.inStock);
      index++;
    }

    query += ' ORDER BY created_at DESC';

    if (filters.limit) {
      query += ` LIMIT $${index}`;
      values.push(filters.limit);
    }

    const result = await db.query(query, values);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT id, name, slug, category, in_stock as "inStock", 
             article_number as "articleNumber", price, old_price as "oldPrice",
             image_url as "imageUrl", style, color, view, mounting_type as "mountingType",
             management, number_source as "numberSource", collection, labels,
             created_at as "createdAt", updated_at as "updatedAt"
      FROM products 
      WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async findBySlug(slug) {
    const query = `
      SELECT id, name, slug, category, in_stock as "inStock", 
             article_number as "articleNumber", price, old_price as "oldPrice",
             image_url as "imageUrl", style, color, view, mounting_type as "mountingType",
             management, number_source as "numberSource", collection, labels,
             created_at as "createdAt", updated_at as "updatedAt"
      FROM products 
      WHERE slug = $1
    `;
    const result = await db.query(query, [slug]);
    return result.rows[0];
  }

  static async create(productData) {
    const query = `
      INSERT INTO products (
        name, slug, category, in_stock, article_number, price, old_price,
        image_url, style, color, view, mounting_type, management, 
        number_source, collection, labels
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
    `;
    
    const values = [
      productData.name,
      productData.slug,
      productData.category,
      productData.inStock || 'В наличии',
      productData.articleNumber,
      productData.price,
      productData.oldPrice || null,
      productData.imageUrl,
      productData.style,
      productData.color,
      productData.view,
      productData.mountingType,
      productData.management,
      productData.numberSource || 1,
      productData.collection,
      productData.labels || []
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async update(id, productData) {
    const query = `
      UPDATE products 
      SET name = $1, slug = $2, category = $3, in_stock = $4, 
          article_number = $5, price = $6, old_price = $7, image_url = $8,
          style = $9, color = $10, view = $11, mounting_type = $12,
          management = $13, number_source = $14, collection = $15,
          labels = $16, updated_at = CURRENT_TIMESTAMP
      WHERE id = $17
      RETURNING *
    `;
    
    const values = [
      productData.name,
      productData.slug,
      productData.category,
      productData.inStock,
      productData.articleNumber,
      productData.price,
      productData.oldPrice,
      productData.imageUrl,
      productData.style,
      productData.color,
      productData.view,
      productData.mountingType,
      productData.management,
      productData.numberSource,
      productData.collection,
      productData.labels,
      id
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async getCategories() {
    const query = `
      SELECT DISTINCT category, COUNT(*) as count 
      FROM products 
      GROUP BY category 
      ORDER BY category
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async searchProducts(searchTerm) {
    const query = `
      SELECT id, name, slug, category, price, image_url as "imageUrl"
      FROM products 
      WHERE name ILIKE $1 OR category ILIKE $1 OR article_number ILIKE $1
      LIMIT 20
    `;
    const result = await db.query(query, [`%${searchTerm}%`]);
    return result.rows;
  }
}

module.exports = Product; */

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    oldPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    articleNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    mainImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    stockStatus: {
      type: DataTypes.ENUM('В наличии', 'Нет в наличии', 'Под заказ'),
      defaultValue: 'В наличии'
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    style: {
      type: DataTypes.STRING,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    view: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mountingType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    management: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numberSource: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    collection: {
      type: DataTypes.STRING,
      allowNull: true
    },
    labels: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    specifications: {
      type: DataTypes.JSON,
      allowNull: true
    },
    features: {
      type: DataTypes.JSON,
      allowNull: true
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5
      }
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    metaKeywords: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'products',
    timestamps: true,
    underscored: false,
    indexes: [
      {
        fields: ['name']
      },
      {
        fields: ['slug']
      },
      {
        fields: ['articleNumber']
      },
      {
        fields: ['price']
      },
      {
        fields: ['categoryId']
      }
    ]
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
    
    Product.hasMany(models.OrderItem, {
      foreignKey: 'productId',
      as: 'orderItems'
    });
  };

  return Product;
};