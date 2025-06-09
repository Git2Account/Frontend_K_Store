const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Protect routes - User authentication
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role === 'user') {
      const user = await User.findOne({ userId: decoded.id });
      if (!user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      
      req.user = {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role
      };
    } else {
      const admin = await Admin.findOne({ adminId: decoded.id });
      if (!admin) {
        return res.status(401).json({ message: 'Not authorized, admin not found' });
      }
      
      req.user = {
        adminId: admin.adminId,
        name: admin.name,
        email: admin.email,
        role: admin.role
      };
    }
    
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Admin only routes
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};