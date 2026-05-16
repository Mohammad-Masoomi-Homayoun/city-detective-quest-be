const mongoose = require("mongoose");

const questSchema = new mongoose.Schema(
  {
    puzzle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Puzzle",
      required: true,
    },
    investigationSite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InvestigationSite",
      required: true,
    },
  },
  { timestamps: true }
);

const Quest = mongoose.model("Quest", questSchema);

module.exports = Quest;
