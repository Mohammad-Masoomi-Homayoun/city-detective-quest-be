const Quest = require("../../model/quest");

const getAllQuests = async (req, res) => {
  try {
    const quests = await Quest.find()
      .populate("puzzle")
      .populate("investigationSite")
      .sort({ createdAt: -1 });
    res.status(200).json(quests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching quests: " + err.message });
  }
};

module.exports = getAllQuests;
