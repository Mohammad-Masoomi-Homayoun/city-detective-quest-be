const Puzzle = require("../../model/puzzle");

const updatePuzzle = async (req, res) => {
  try {
    const puzzle = await Puzzle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!puzzle) {
      return res.status(404).json({ message: "Puzzle not found" });
    }
    res.status(200).json(puzzle);
  } catch (err) {
    res.status(400).json({ message: "Error updating puzzle: " + err.message });
  }
};

module.exports = updatePuzzle;
