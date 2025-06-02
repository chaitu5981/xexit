const mongoose = require("mongoose");
const User = require("../models/user.model");
const Resignation = require("../models/resignation.model");
const Responses = require("../models/responses.model");

const viewResignations = async (req, res) => {
  try {
    const resignations = await Resignation.find({}, { __v: 0 });
    res.status(200).json({
      data: resignations,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const concludeRegistration = async (req, res) => {
  const resignationId = req.body.resignationId;
  const approved = req.body.approved;
  const lwd = req.body?.lwd;

  try {
    const resignation = await Resignation.findById(resignationId);
    console.log(resignation);
    if (!resignationId) {
      res.status(400).json({
        message: "Resignation not found",
      });
      return;
    }
    const user = await User.findById(resignation.employeeId);

    if (approved) {
      resignation.status = "approved";
      resignation.lwd = lwd;
      user.role = "exEmp";
      await user.save();
    } else resignation.status = "rejected";
    await resignation.save();
    res.status(200).json({ message: "Resignation concluded" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const viewAllResponses = async (req, res) => {
  try {
    const responses = await Responses.find({}, { _id: 0 });
    res.status(200).json({
      data: responses,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { viewResignations, concludeRegistration, viewAllResponses };
