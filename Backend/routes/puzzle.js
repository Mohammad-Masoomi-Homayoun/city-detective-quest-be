const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const createPuzzle = require("../controller/puzzle/createPuzzle");
const getAllPuzzles = require("../controller/puzzle/getAllPuzzles");
const getPuzzleById = require("../controller/puzzle/getPuzzleById");
const updatePuzzle = require("../controller/puzzle/updatePuzzle");
const deletePuzzle = require("../controller/puzzle/deletePuzzle");

router.post("/", checkAuth, createPuzzle);
router.get("/", getAllPuzzles);
router.get("/:id", getPuzzleById);
router.put("/:id", checkAuth, updatePuzzle);
router.delete("/:id", checkAuth, deletePuzzle);

module.exports = router;
