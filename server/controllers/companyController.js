const Company = require("../models/Company");

exports.createCompany = async (req, res) => {
  try {
    const { name, parentCompanyId } = req.body;

    let hierarchyLevel = 1;
    if (parentCompanyId) {
      const parentCompany = await Company.findById(parentCompanyId);
      if (!parentCompany)
        return res.status(404).json({ message: "Parent company not found" });
      hierarchyLevel = parentCompany.hierarchyLevel + 1;
    }

    const company = new Company({ name, parentCompanyId, hierarchyLevel });
    await company.save();

    res.status(201).json({ companyId: company._id, hierarchyLevel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId).populate(
      "parentCompanyId"
    );
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
