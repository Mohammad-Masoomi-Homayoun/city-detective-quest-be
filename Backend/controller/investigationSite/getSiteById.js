const InvestigationSite = require("../../model/investigationSite");

const getSiteById = async (req, res) => {
  try {
    const site = await InvestigationSite.findById(req.params.id);
    if (!site) {
      return res.status(404).json({ message: "Investigation site not found" });
    }
    res.status(200).json(site);
  } catch (err) {
    res.status(500).json({ message: "Error fetching site: " + err.message });
  }
};

module.exports = getSiteById;
