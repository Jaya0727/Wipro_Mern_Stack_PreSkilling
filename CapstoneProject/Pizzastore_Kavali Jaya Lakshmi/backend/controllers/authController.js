const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

//User Register - only for users
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });

    if (exist)
      return res.status(400).json("User already exists");
    
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "user",
    });

    res.json({
      message: "Registered successfully",
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//Login 
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check Admin first
    let user = await Admin.findOne({ email });
    let role = "admin";

    //If not admin - check user
    if (!user) {
      user = await User.findOne({ email });
      role = "user";
    }
    //If not user - error message
    if (!user)
      return res.status(400).json("User not found");

    //password comparing
      const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match)
      return res.status(400).json("Wrong password");

    res.json({
      token: generateToken(user._id, role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  }
  
  catch (err) {
    res.status(500).json(err.message);
  }
};