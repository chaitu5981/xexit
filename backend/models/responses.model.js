const mongoose = require("mongoose");
const responsesSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
  responses: [
    {
      _id: false,
      questionText: String,
      response: String,
    },
  ],
});

const responseModel = mongoose.model("response", responsesSchema);
module.exports = responseModel;
