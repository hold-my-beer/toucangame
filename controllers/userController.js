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
        msg: "Неверные учетные данные. Попробуйте использовать другой e-mail",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
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
      return res.status(400).json({ msg: "Неверные учетные данные" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Ошибка сервера" });
  }
};

module.exports = {
  registerUser,
};
