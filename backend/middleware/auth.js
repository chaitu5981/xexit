const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const fetchUser = async (token) => {
  const { username } = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(username, "username");
  if (!username) return null;
  const user = await User.findOne({ username });
  return user;
};

const isLoggedIn = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return;
  }
  const user = await fetchUser(token);
  if (!user) {
    res.status(401).json({ message: "Unauthorized Access.invalid token" });
    return;
  }
  req.user = user;
  next();
};

const isEmployee = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return;
  }
  const user = await fetchUser(token);
  if (!user) {
    res.status(401).json({ message: "Unauthorized Access.invalid token" });
    return;
  }
  if (user.role == "emp") {
    req.user = user;
    next();
  } else
    res.status(401).json({ message: "Unauthorized Access.not an employee" });
};

const isAdmin = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return;
  }
  const user = await fetchUser(token);
  if (!user) {
    res.status(401).json({ message: "Unauthorized Access,user not found" });
    return;
  }
  if (user.role == "hr") {
    req.user = user;
    next();
  } else res.status(401).json({ message: "Unauthorized Access,Not an admin" });
};
const isExEmp = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return;
  }
  const user = await fetchUser(token);
  if (!user) {
    res.status(401).json({ message: "Unauthorized Access,user not found" });
    return;
  }
  if (user.role == "exEmp") {
    req.user = user;
    next();
  } else
    res.status(401).json({ message: "Unauthorized Access,Not an ex employee" });
};

module.exports = { isEmployee, isAdmin, isExEmp, isLoggedIn };
