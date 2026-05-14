const mongoose = require("mongoose");

const clueSchema = new mongoose.Schema({
  text: String,
  image: String,
  audio: String,
  discovered: {
    type: Boolean,
    default: false,
  },
});

const hintSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  penaltyScore: Number,
});

const mediaAssetSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["image", "audio", "video"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const puzzleInputSchema = new mongoose.Schema({
  label: String,
  type: String,
  placeholder: String,
});

const solutionSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  caseSensitive: {
    type: Boolean,
    default: false,
  },
});

const validationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["exact", "contains", "regex", "custom"],
    default: "exact",
  },
  pattern: String,
});

const scoreRuleSchema = new mongoose.Schema({
  baseScore: {
    type: Number,
    default: 100,
  },
  timeBonusPerSecond: Number,
  hintPenalty: Number,
});

const puzzleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    storyContext: String,
    type: {
      type: String,
      enum: [
        "code",
        "riddle",
        "cipher",
        "physical",
        "gps",
        "audio",
        "image",
        "sequence",
        "logic",
        "qr",
        "augmented-reality",
      ],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard", "expert"],
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft",
    },
    clues: [clueSchema],
    hints: [hintSchema],
    inputs: [puzzleInputSchema],
    expectedSolution: {
      type: solutionSchema,
      required: true,
    },
    timeLimit: Number,
    media: [mediaAssetSchema],
    validation: {
      type: validationSchema,
      required: true,
    },
    scoring: scoreRuleSchema,
  },
  { timestamps: true }
);

const Puzzle = mongoose.model("Puzzle", puzzleSchema);

module.exports = Puzzle;
