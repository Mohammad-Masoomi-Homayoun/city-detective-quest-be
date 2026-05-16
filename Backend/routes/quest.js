const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const createQuest = require("../controller/quest/createQuest");
const getAllQuests = require("../controller/quest/getAllQuests");
const getQuestById = require("../controller/quest/getQuestById");
const updateQuest = require("../controller/quest/updateQuest");
const deleteQuest = require("../controller/quest/deleteQuest");

router.post("/", checkAuth, createQuest);
router.get("/", getAllQuests);
router.get("/:id", getQuestById);
router.put("/:id", checkAuth, updateQuest);
router.delete("/:id", checkAuth, deleteQuest);

module.exports = router;
