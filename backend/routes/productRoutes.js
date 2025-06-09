const express = require('express');
const router = express.Router();
const { 
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  productController
} = require('../controllers/productController');
const { protect, admin, authMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');
// const upload = require('../middleware/upload');
// const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/', protect, admin, upload.single('image'), createProduct);
router.put('/:id', protect, admin, upload.single('image'), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

// router.post('/', protect, admin, upload.single('image'), productController.createProduct);
// router.put('/:id', protect, admin, upload.single('image'), productController.updateProduct);


module.exports = router;