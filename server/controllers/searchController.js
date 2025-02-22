const User = require("../models/User");
const Company = require("../models/Company");

exports.search = async (req, res) => {
  try {
    const {
      query,
      page = 1,
      limit = 10,
      sortBy = "name",
      order = "asc",
    } = req.query;

    // Convert page & limit to integers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const sortOrder = order === "desc" ? -1 : 1;

    // Search users
    const users = await User.find(
      { $text: { $search: query } },
    )
      .sort({ [sortBy]: sortOrder }) // Sort by selected field
      .skip((pageNumber - 1) * limitNumber) // Pagination
      .limit(limitNumber)
      .populate("companyId")
      .select("name email role companyId");

    // Search companies
    const companies = await Company.find(
      { $text: { $search: query } },
    )
      .sort({ [sortBy]: sortOrder }) // Sort by selected field
      .skip((pageNumber - 1) * limitNumber) // Pagination
      .limit(limitNumber)
      .populate("parentCompanyId")
      .lean();

    // Fetch associated users (limit 5) for each company
    for (const company of companies) {
      company.associatedUsers = await User.find({ companyId: company._id })
        .limit(5)
        .select("name email role");
    }

    res.json({ users, companies, page: pageNumber, limit: limitNumber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
