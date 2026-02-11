const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');
const validate = require('../middleware/validation');

// Validation schemas
const productSchema = {
  name: { type: 'string', required: true, maxLength: 255 },
  slug: { type: 'string', required: true, maxLength: 255 },
  categoryId: { type: 'number', required: true },
  articleNumber: { type: 'string', required: true, maxLength: 50 },
  price: { type: 'number', required: true, min: 0 },
  oldPrice: { type: 'number', min: 0 }
};

// 🔹 ВАЖНО: Все маршруты начинаются с /products
// Public routes - специфичные сначала
router.get('/products', productController.getAllProducts);  // /api/products
router.get('/products/featured', productController.getFeaturedProducts);
router.get('/products/categories', productController.getCategories);
router.get('/products/search', productController.searchProducts);
router.get('/products/slug/:slug', productController.getProductBySlug);
router.get('/products/:id/related', productController.getRelatedProducts);
router.get('/products/:id', productController.getProductById);

// Admin routes
router.post('/products', 
  upload.single('image'),
  validate(productSchema),
  productController.createProduct
);

router.put('/products/:id', 
  upload.single('image'),
  validate(productSchema),
  productController.updateProduct
);

router.delete('/products/:id', productController.deleteProduct);

module.exports = router;