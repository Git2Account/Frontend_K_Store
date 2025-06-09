const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {  type: Number,  required: true,  unique: true,  },
  categoryId: {  type: Number,  required: true,  ref: "tbl_categories",  },
  imageUrl: {  type: String,  required: true,  },
  couponText: {  type: String,  },
  discountPercent: {  type: String,  },
  discountamount: {  type: String,  },
  mrp: {  type: String,  required: true,  },
  productName: {  type: String,  required: true,  },
  description: {  type: String,  },
  stock: {  type: Number,  default: 0,  },
  created_at: {  type: Date,  default: Date.now,  },
});

// Auto-increment productId
productSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const lastProduct = await this.constructor.findOne(
        {},
        {},
        { sort: { productId: -1 } }
      );
      this.productId = lastProduct ? lastProduct.productId + 1 : 1;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Product = mongoose.model("tbl_products", productSchema);

module.exports = Product;
