const Puzzle = require("../../model/puzzle");

const createPuzzle = async (req, res) => {
  try {
    const puzzle = new Puzzle(req.body);
    const savedPuzzle = await puzzle.save();
    res.status(201).json(savedPuzzle);
  } catch (err) {
    res.status(400).json({ message: "Error creating puzzle: " + err.message });
  }
};

module.exports = createPuzzle;
