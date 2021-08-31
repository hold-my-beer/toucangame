const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

// @desc     Register a new user
// @route    POST /api/users
// @access   Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "Попробуйте использовать другой e-mail",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      friends: [],
      stats: {
        total: {},
        major: {},
        minor: {},
      },
    });

    if (user) {
      return res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        friends: user.friends,
        stats: user.stats,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: "Неверные учетные данные" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

// @desc     Login user
// @route    POST /api/users/login
// @access   Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        friends: user.friends,
        stats: user.stats,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: "Неверные учетные данные" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
