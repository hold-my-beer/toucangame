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

// @desc     Invite to be friends
// @route    PUT /api/users/friends/invite
// @access   Private
const inviteToBeFriends = async (req, res) => {
  try {
    const { initiatorId, acceptorId } = req.body;

    const initiator = await User.findById(initiatorId);
    const acceptor = await User.findById(acceptorId);

    if (initiator && acceptor) {
      const indexAcceptor = initiator.friends.findIndex(
        (friend) => friend.user === acceptor
      );

      if (indexAcceptor === -1) {
        initiator.friends.push({
          user: acceptor,
        });
      } else {
        initiator.friends[indexAcceptor].status = "toBeApproved";
      }

      const indexInitiator = acceptor.friends.findIndex(
        (friend) => friend.user === initiator
      );

      if (indexInitiator === -1) {
        acceptor.friends.push({
          user: initiator,
          status: "toApprove",
        });
      } else {
        acceptor.friends[indexInitiator].status = "toApprove";
      }

      const updatedInitiator = await initiator.save();

      return res.json({
        id: updatedInitiator._id,
        name: updatedInitiator.name,
        email: updatedInitiator.email,
        friends: updatedInitiator.friends,
        stats: updatedInitiator.stats,
        token: generateToken(updatedInitiator._id),
      });
    } else {
      return res.stats(404).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  inviteToBeFriends,
};
