// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   orderId: {type: Number,required: true,unique: true },
//   userId: {type: Number,required: true,ref: 'tbl_users' },
//   order_date: {type: String,default: new Date().toISOString() },
//   status: {type: String,enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],default: 'pending' },
//   total_amount: {type: Number,required: true },
//   payment_method: {type: String,required: true },
//   shipping_address: {type: String,required: true },
//   items: [{productId: {  type: Number,  required: true,  ref: 'tbl_products'},quantity: {  type: Number,  required: true,min: 1},price: {  type: Number,  required: true}  }]
// });

// // Auto-increment orderId
// orderSchema.pre('save', async function(next) {
//   if (this.isNew) {try {  const lastOrder = await this.constructor.findOne({}, {}, { sort: { 'orderId': -1 } });  this.orderId = lastOrder ? lastOrder.orderId + 1 : 1;  next();} catch (error) {  next(error);}
//   } else {next();
//   }
// });

// const Order = mongoose.model('tbl_orders', orderSchema);

// module.exports = Order;




const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true, ref: 'tbl_users' },
  order_date: { type: String, default: new Date().toISOString() },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  payment_method: { type: String, required: true },
  shipping_address: { type: String, required: true },
  items: [{
    productId: { type: Number, required: true, ref: 'tbl_products' },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
  }],
  // Add new financial fields
  subtotal: { type: Number, required: true },
  shipping: { type: Number, required: true },
  tax: { type: Number, required: true },
  orderTotal: { type: Number, required: true }
});

// Auto-increment orderId
orderSchema.pre('save', async function(next) {
  if (this.isNew) {try {  const lastOrder = await this.constructor.findOne({}, {}, { sort: { 'orderId': -1 } });  this.orderId = lastOrder ? lastOrder.orderId + 1 : 1;  next();} catch (error) {  next(error);}
  } else {next();
  }
});

const Order = mongoose.model('tbl_orders', orderSchema);

module.exports = Order;