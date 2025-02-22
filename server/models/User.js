const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true }, // Index for faster searches
  email: { type: String, required: true, unique: true, index: true }, // Index for quick lookup
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  role: { type: String, default: "user" },
});

// Compound index for name and email
UserSchema.index({ name: "text", email: "text" });

module.exports = mongoose.model("User", UserSchema);
