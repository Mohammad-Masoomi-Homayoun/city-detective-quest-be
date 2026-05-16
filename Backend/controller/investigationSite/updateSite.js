const InvestigationSite = require("../../model/investigationSite");

const updateSite = async (req, res) => {
  try {
    const site = await InvestigationSite.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!site) {
      return res.status(404).json({ message: "Investigation site not found" });
    }
    res.status(200).json(site);
  } catch (err) {
    res.status(400).json({ message: "Error updating site: " + err.message });
  }
};

module.exports = updateSite;
