const db = require('../../config/database');
const products = require('./data/products.json');

async function seedProducts() {
  try {
    console.log('Seeding products...');
    
    for (const product of products) {
      const query = `
        INSERT INTO products (
          name, slug, category, in_stock, article_number, price, old_price,
          image_url, style, color, view, mounting_type, management, 
          number_source, collection, labels
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        ON CONFLICT (slug) DO NOTHING
      `;
      
      const values = [
        product.name,
        product.slug,
        product.category,
        product.inStock,
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
      console.log(`Seeded: ${product.name}`);
    }
    
    console.log('Products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

// Run seeder if called directly
if (require.main === module) {
  seedProducts().then(() => process.exit(0));
}

module.exports = seedProducts;