const Quest = require("../../model/quest");

const getQuestById = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id)
      .populate("puzzle")
      .populate("investigationSite");
    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }
    res.status(200).json(quest);
  } catch (err) {
    res.status(500).json({ message: "Error fetching quest: " + err.message });
  }
};

module.exports = getQuestById;
