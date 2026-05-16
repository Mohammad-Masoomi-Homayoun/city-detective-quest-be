const mongoose = require("mongoose");

const investigationSiteSchema = new mongoose.Schema(
  {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    radius: {
      type: Number,
      required: true,
      description: "Radius in meters",
    },
    status: {
      type: String,
      enum: ["SOLVED", "FAILED", "OPEN"],
      default: "OPEN",
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const InvestigationSite = mongoose.model(
  "InvestigationSite",
  investigationSiteSchema
);

module.exports = InvestigationSite;
