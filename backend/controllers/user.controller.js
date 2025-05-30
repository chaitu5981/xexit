const mongoose = require("mongoose");
const User = require("../models/user.model");
const Resignation = require("../models/resignation.model");
const Responses = require("../models/responses.model");
const submitResignation = async (req, res) => {
  const { lwd } = req.body;
  if (!lwd) res.status(400).json({ message: "Last Working day is required" });
  try {
    const oldResignation = await Resignation.findOne({
      employeeId: req.user._id,
    });
    if (oldResignation) {
      res.status(400).json({ message: "Resignation already submitted" });
      return;
    }
    const resignation = await Resignation.create({
      employeeId: req.user._id,
      lwd,
    });
    res.status(200).json({
      data: {
        resignation: {
          _id: resignation._id,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const submitResponses = async (req, res) => {
  const { responses } = req.body;
  try {
    const oldResponses = await Responses.findOne({ employeeId: req.user._id });
    if (oldResponses) {
      res.status(400).json({ message: "Responses already submitted" });
      return;
    }
    await Responses.create({
      employeeId: req.user._id,
      responses,
    });
    res.status(200).json({ message: "Responses submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { submitResignation, submitResponses };
