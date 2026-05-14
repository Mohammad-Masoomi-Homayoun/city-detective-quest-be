const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const adminRouter = require("./admin");
const puzzleRouter = require("./puzzle");

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/puzzle", puzzleRouter);

module.exports = router;
