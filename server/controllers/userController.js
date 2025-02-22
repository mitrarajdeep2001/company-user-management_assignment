const User = require("../models/User");
const Company = require("../models/Company");

exports.createUser = async (req, res) => {
  try {
    const { name, email, companyId } = req.body;

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ message: "Company not found" });

    const user = new User({ name, email, companyId });
    await user.save();

    res.status(201).json({ userId: user._id, companyId, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("companyId");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
