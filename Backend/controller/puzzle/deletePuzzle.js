const Puzzle = require("../../model/puzzle");

const deletePuzzle = async (req, res) => {
  try {
    const puzzle = await Puzzle.findByIdAndDelete(req.params.id);
    if (!puzzle) {
      return res.status(404).json({ message: "Puzzle not found" });
    }
    res.status(200).json({ message: "Puzzle deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting puzzle: " + err.message });
  }
};

module.exports = deletePuzzle;
