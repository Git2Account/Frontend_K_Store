const Category = require('../models/Category');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ categoryName: 1 });
    
    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get single category
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ categoryId: req.params.id });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.status(200).json({
      success: true,
      category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create category
exports.createCategory = async (req, res) => {
  try {
    const { categoryName, description, imageUrl } = req.body;
    
    // Check if category already exists
    const categoryExists = await Category.findOne({ categoryName });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    
    const category = await Category.create({
      categoryName,
      description: description || '',
      imageUrl: imageUrl || ''
    });
    
    res.status(201).json({
      success: true,
      category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ categoryId: req.params.id });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Update category fields
    const updatedCategory = await Category.findOneAndUpdate(
      { categoryId: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      category: updatedCategory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ categoryId: req.params.id });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    await Category.deleteOne({ categoryId: req.params.id });
    
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};