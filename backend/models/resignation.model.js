const mongoose = require("mongoose");
const resignationSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  lwd: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const resignationModel = mongoose.model("resignation", resignationSchema);
module.exports = resignationModel;
