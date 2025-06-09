const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence");

const connection = mongoose.connection;

const adminSchema = new mongoose.Schema({
  adminId: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, default: 'admin' },
  created_at: { type: String, default: new Date().toISOString() }
});

// Apply auto-increment plugin
adminSchema.plugin(AutoIncrement(connection), { inc_field: 'adminId' });

const Admin = mongoose.model("tbl_admins", adminSchema);

module.exports = Admin;
