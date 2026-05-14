const Puzzle = require("../../model/puzzle");

const getPuzzleById = async (req, res) => {
  try {
    const puzzle = await Puzzle.findById(req.params.id);
    if (!puzzle) {
      return res.status(404).json({ message: "Puzzle not found" });
    }
    res.status(200).json(puzzle);
  } catch (err) {
    res.status(500).json({ message: "Error fetching puzzle: " + err.message });
  }
};

module.exports = getPuzzleById;
