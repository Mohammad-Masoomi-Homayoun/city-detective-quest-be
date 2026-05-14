const Puzzle = require("../../model/puzzle");

const getAllPuzzles = async (req, res) => {
  try {
    const { type, difficulty, status } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (difficulty) filter.difficulty = difficulty;
    if (status) filter.status = status;

    const puzzles = await Puzzle.find(filter).sort({ createdAt: -1 });
    res.status(200).json(puzzles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching puzzles: " + err.message });
  }
};

module.exports = getAllPuzzles;
