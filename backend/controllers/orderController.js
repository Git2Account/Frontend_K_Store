const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// Get all orders with pagination and filtering
exports.getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const userId = req.query.userId;
    const status = req.query.status;
    
    let query = {};
    if (userId) query.userId = userId;
    if (status) query.status = status;
    
    const orders = await Order.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ order_date: -1 });
    
    const total = await Order.countDocuments(query);
    
    res.status(200).json({
      success: true,
      orders,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create order
// Create order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, payment_method, shipping_address, subtotal, shipping, tax, orderTotal } = req.body;
    
    // Validate totals match
    const calculatedSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const calculatedShipping = calculatedSubtotal >= 499 ? 0 : 40;
    const calculatedTax = (calculatedSubtotal + calculatedShipping) * 0.18;
    const calculatedTotal = calculatedSubtotal + calculatedShipping + calculatedTax;
    
    // Validate calculations match frontend
    if (
      Math.abs(calculatedSubtotal - subtotal) > 1 ||
      Math.abs(calculatedShipping - shipping) > 1 ||
      Math.abs(calculatedTax - tax) > 1 ||
      Math.abs(calculatedTotal - orderTotal) > 1
    ) {
      return res.status(400).json({ message: 'Order totals mismatch' });
    }
    
    // Check if user exists
    const userExists = await User.findOne({ userId });
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Validate and calculate total amount
    let total_amount = 0;
    for (const item of items) {
      const product = await Product.findOne({ productId: item.productId });
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for product ${product.productName}` });
      }
      
      // Update product stock
      await Product.findOneAndUpdate(
        { productId: item.productId },
        { $inc: { stock: -item.quantity } }
      );
      
      total_amount += item.price * item.quantity;
    }
    
    const order = await Order.create({
      userId,
      items,
      payment_method,
      shipping_address,
      subtotal,
      shipping,
      tax,
      orderTotal,
      order_date: new Date().toISOString(),
      status: 'pending'
    });
    
    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findOne({ orderId: req.params.id });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Update order status
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      { status },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      order: updatedOrder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (order.status === 'delivered') {
      return res.status(400).json({ message: 'Cannot cancel delivered order' });
    }
    
    // Update order status to cancelled
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      { status: 'cancelled' },
      { new: true }
    );
    
    // Restore product stock
    for (const item of order.items) {
      await Product.findOneAndUpdate(
        { productId: item.productId },
        { $inc: { stock: item.quantity } }
      );
    }
    
    res.status(200).json({
      success: true,
      order: updatedOrder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};