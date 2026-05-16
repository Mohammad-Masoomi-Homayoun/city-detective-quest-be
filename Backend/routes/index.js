const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const adminRouter = require("./admin");
const puzzleRouter = require("./puzzle");
const investigationSiteRouter = require("./investigationSite");
const questRouter = require("./quest");

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/puzzle", puzzleRouter);
router.use("/investigation-site", investigationSiteRouter);
router.use("/quest", questRouter);

module.exports = router;
