const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  age: { type: Number, min: 0 },
  major: { type: String, trim: true },
  enrolled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
