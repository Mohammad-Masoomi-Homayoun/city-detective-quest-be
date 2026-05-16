const InvestigationSite = require("../../model/investigationSite");

const deleteSite = async (req, res) => {
  try {
    const site = await InvestigationSite.findByIdAndDelete(req.params.id);
    if (!site) {
      return res.status(404).json({ message: "Investigation site not found" });
    }
    res.status(200).json({ message: "Investigation site deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting site: " + err.message });
  }
};

module.exports = deleteSite;
