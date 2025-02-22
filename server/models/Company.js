const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, index: true }, // Index for faster searches
  parentCompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null,
  },
  hierarchyLevel: { type: Number, default: 1 },
});

// Text index for company name
CompanySchema.index({ name: "text" });

module.exports = mongoose.model("Company", CompanySchema);
