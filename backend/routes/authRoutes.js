const express = require('express');
const router = express.Router();
const { registerUser, loginUser, registerAdmin, loginAdmin } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

module.exports = router;