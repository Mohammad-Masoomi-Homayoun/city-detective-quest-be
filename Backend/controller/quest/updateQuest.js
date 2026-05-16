const Quest = require("../../model/quest");

const updateQuest = async (req, res) => {
  try {
    const quest = await Quest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("puzzle")
      .populate("investigationSite");
    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }
    res.status(200).json(quest);
  } catch (err) {
    res.status(400).json({ message: "Error updating quest: " + err.message });
  }
};

module.exports = updateQuest;
