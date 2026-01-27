const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');
const validate = require('../middleware/validation');

// Validation schemas
const productSchema = {
  name: { type: 'string', required: true, maxLength: 255 },
  slug: { type: 'string', required: true, maxLength: 255 },
  category: { type: 'string', required: true, maxLength: 100 },
  articleNumber: { type: 'string', required: true, maxLength: 50 },
  price: { type: 'number', required: true, min: 0 },
  oldPrice: { type: 'number', min: 0 }
};

// Public routes
router.get('/', productController.getAllProducts);
router.get('/categories', productController.getCategories);
router.get('/search', productController.searchProducts);
router.get('/slug/:slug', productController.getProductBySlug);
router.get('/:id', productController.getProductById);

// Admin routes (protected - add auth middleware as needed)
router.post('/', 
  upload.single('image'),
  validate(productSchema),
  productController.createProduct
);

router.put('/:id', 
  upload.single('image'),
  validate(productSchema),
  productController.updateProduct
);

router.delete('/:id', productController.deleteProduct);

module.exports = router;