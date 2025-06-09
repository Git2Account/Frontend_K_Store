const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryId: {  type: Number,  required: true,  unique: true},
  categoryName: {  type: String,  required: true},
  description: {  type: String},
  imageUrl: {  type: String},
  created_at: {  type: Date,  default: Date.now}
});

// Auto-increment categoryId
categorySchema.pre('save', async function(next) {if (this.isNew) {  try {    const lastCategory = await this.constructor.findOne({}, {}, { sort: { 'categoryId': -1 } });    this.categoryId = lastCategory ? lastCategory.categoryId + 1 : 1;    next();  } catch (error) {    next(error);  }} else {  next();}
});

const Category = mongoose.model('tbl_categories', categorySchema);

module.exports = Category;