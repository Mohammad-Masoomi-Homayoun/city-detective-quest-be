const InvestigationSite = require("../../model/investigationSite");

const getAllSites = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const sites = await InvestigationSite.find(filter).sort({ createdAt: -1 });
    res.status(200).json(sites);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sites: " + err.message });
  }
};

module.exports = getAllSites;
