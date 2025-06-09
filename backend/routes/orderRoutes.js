const express = require('express');
const router = express.Router();
const { 
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// User routes
router.post('/', protect, createOrder);
router.get('/user', protect, getOrders); // User's orders (filtered by userId in controller)
router.put('/:id/cancel', protect, cancelOrder);

// Admin routes
router.get('/', protect, admin, getOrders); // All orders for admin
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;