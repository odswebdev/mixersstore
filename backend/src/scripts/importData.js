const fs = require('fs');
const path = require('path');
const db = require('../config/database');

// Чтение вашего файла products.js и преобразование данных
const productsData = require('./products-data.json'); // Сохраните ваши данные в JSON

async function importData() {
  try {
    console.log('Starting data import...');
    
    for (const product of productsData) {
      // Генерация slug если отсутствует
      if (!product.slug) {
        product.slug = product.name
          .toLowerCase()
          .replace(/[^a-z0-9а-яё\s]/gi, '')
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9а-яё\-]/g, '');
      }
      
      const query = `
        INSERT INTO products (
          name, slug, category, in_stock, article_number, price, old_price,
          image_url, style, color, view, mounting_type, management, 
          number_source, collection, labels
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          category = EXCLUDED.category,
          price = EXCLUDED.price,
          updated_at = CURRENT_TIMESTAMP
      `;
      
      const values = [
        product.name,
        product.slug,
        product.category,
        product.inStock || 'В наличии',
        product.articleNumber,
        product.price,
        product.oldPrice || null,
        product.image || null,
        product.style,
        product.color,
        product.view,
        product.mountingType,
        product.management,
        product.numberSource || 1,
        product.collection,
        product.labels || []
      ];
      
      await db.query(query, values);
      console.log(`Imported: ${product.name}`);
    }
    
    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();