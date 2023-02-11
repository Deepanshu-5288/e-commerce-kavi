const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const returnSchema = new mongoose.Schema(
  {
    
    user: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    oId: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      default: "Not processed",
      enum: [
        "not worthy",
        "size issue",
        "missing items",
        "not working/ damaged",
      ],
    },
  },
  { timestamps: true }
);

const returnModel = mongoose.model("Return", returnSchema);
module.exports = returnModel;
