const mongoose = require("mongoose");
const User = require("./models/user.model");
const user = {
  username: "admin",
  password: "admin",
  role: "hr",
};
const seedDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://chaitu:repakula@cluster0.dzek7tm.mongodb.net/xexit?retryWrites=true&w=majority&appName=Cluster0"
    );
    await User.create(user);
    console.log("Admin inserted ");
  } catch (error) {
    console.log(error);
  }
};

seedDb();
