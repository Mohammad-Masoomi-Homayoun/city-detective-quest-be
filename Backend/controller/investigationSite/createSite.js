const InvestigationSite = require("../../model/investigationSite");

const createSite = async (req, res) => {
  try {
    const site = new InvestigationSite(req.body);
    const savedSite = await site.save();
    res.status(201).json(savedSite);
  } catch (err) {
    res.status(400).json({ message: "Error creating site: " + err.message });
  }
};

module.exports = createSite;
