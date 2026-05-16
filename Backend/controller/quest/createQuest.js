const Quest = require("../../model/quest");

const createQuest = async (req, res) => {
  try {
    const quest = new Quest(req.body);
    const savedQuest = await quest.save();
    const populated = await savedQuest.populate(["puzzle", "investigationSite"]);
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: "Error creating quest: " + err.message });
  }
};

module.exports = createQuest;
