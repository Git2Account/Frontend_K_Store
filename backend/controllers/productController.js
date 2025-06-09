const Product = require('../models/Product');
const Category = require('../models/Category');
const fs = require('fs');
const path = require('path');

// Get all products with pagination
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const categoryId = req.query.categoryId;
    
    let query = {};
    if (categoryId) {
      query.categoryId = categoryId;
    }
    
    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    
    const total = await Product.countDocuments(query);
    
    res.status(200).json({
      success: true,
      products,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.id });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { categoryId, productName, mrp, discountamount, description, stock } = req.body;
    
    // Handle image upload
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/img/products/${req.file.filename}`;
    }

    // Create product with new image path
    const product = await Product.create({
      categoryId,
      productName,
      imageUrl,
      mrp,
      discountamount: discountamount || null,
      description: description || '',
      stock: stock || 0
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.id });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Handle new image upload
    let newImageUrl = product.imageUrl;
    if (req.file) {
      // Delete old image if exists
      if (product.imageUrl) {
        const oldImagePath = path.join(__dirname, '../../frontend/public', product.imageUrl);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      newImageUrl = `/img/products/${req.file.filename}`;
    }

    // Update product
    const updatedProduct = await Product.findOneAndUpdate(
      { productId: req.params.id },
      { 
        ...req.body,
        imageUrl: newImageUrl,
        discountamount: req.body.discountamount || null,
        stock: parseInt(req.body.stock)
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create product
// exports.createProduct = async (req, res) => {
//   try {
//     const { categoryId, productName, imageUrl, mrp, discountPercent, discountamount, couponText, description, stock } = req.body;
    
//     // Check if category exists
//     const categoryExists = await Category.findOne({ categoryId });
//     if (!categoryExists) {
//       return res.status(404).json({ message: 'Category not found' });
//     }
    
//     const product = await Product.create({
//       categoryId,
//       productName,
//       imageUrl,
//       mrp,
//       discountPercent: discountPercent || '',
//       discountamount: discountamount || '',
//       couponText: couponText || '',
//       description: description || '',
//       stock: stock || 0
//     });
    
//     res.status(201).json({
//       success: true,
//       product
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Update product
// exports.updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findOne({ productId: req.params.id });
    
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
    
//     // Update product fields
//     const updatedProduct = await Product.findOneAndUpdate(
//       { productId: req.params.id },
//       { $set: req.body },
//       { new: true, runValidators: true }
//     );
    
//     res.status(200).json({
//       success: true,
//       product: updatedProduct
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.id });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await Product.deleteOne({ productId: req.params.id });
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};