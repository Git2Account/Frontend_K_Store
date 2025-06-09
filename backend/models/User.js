const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence");

const connection = mongoose.connection;

const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, default: "user" },
  created_at: { type: String, default: new Date().toISOString() },
});

// Apply auto-increment plugin
userSchema.plugin(AutoIncrement(connection), { inc_field: 'userId' });

const User = mongoose.model("tbl_users", userSchema);

module.exports = User;
