const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const createSite = require("../controller/investigationSite/createSite");
const getAllSites = require("../controller/investigationSite/getAllSites");
const getSiteById = require("../controller/investigationSite/getSiteById");
const updateSite = require("../controller/investigationSite/updateSite");
const deleteSite = require("../controller/investigationSite/deleteSite");

router.post("/", checkAuth, createSite);
router.get("/", getAllSites);
router.get("/:id", getSiteById);
router.put("/:id", checkAuth, updateSite);
router.delete("/:id", checkAuth, deleteSite);

module.exports = router;
