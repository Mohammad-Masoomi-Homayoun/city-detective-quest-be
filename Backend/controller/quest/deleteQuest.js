const Quest = require("../../model/quest");

const deleteQuest = async (req, res) => {
  try {
    const quest = await Quest.findByIdAndDelete(req.params.id);
    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }
    res.status(200).json({ message: "Quest deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting quest: " + err.message });
  }
};

module.exports = deleteQuest;
