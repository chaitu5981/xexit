const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: "Both Username and Password are required",
    });
    return;
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({
        message: "User already registered",
      });
      return;
    }
    await User.create({ username, password });
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: "Both Username and Password are required",
    });
    return;
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: "Invalid Password" });
      return;
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};
module.exports = { registerUser, loginUser, getUser };
