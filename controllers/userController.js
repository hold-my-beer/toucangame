const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");
const { updateMany } = require("../models/userModel");

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
      settings: {},
    });

    if (user) {
      return res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        friends: user.friends,
        stats: user.stats,
        settings: user.settings,
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
        settings: user.settings,
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

// @desc     Update settings
// @route    POST /api/users/settings
// @access   Private
const updateSettings = async (req, res) => {
  try {
    const { musicVolume, effectsVolume } = req.body;

    const user = await User.findById(req.user.id);

    if (user) {
      user.settings = {
        musicVolume,
        effectsVolume,
      };

      const updatedUser = await user.save();

      return res.json({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        friends: updatedUser.friends,
        stats: updatedUser.stats,
        settings: updatedUser.settings,
        token: generateToken(updatedUser._id),
      });
    } else {
      return res.status(401).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

// @desc     Save users stats
// @route    Server initiated
// @access   Server initiated
const saveStats = async (players, isMinor) => {
  try {
    // const { players, isMinor } = req.body;

    if (players.length) {
      let maxPoints = 0;
      let winnerIDs = [];
      players.forEach((player) => {
        if (parseInt(player.totalPoints) > maxPoints) {
          maxPoints = parseInt(player.totalPoints);
          winnerIDs = [player.id];
        } else if (parseInt(player.totalPoints) === maxPoints) {
          winnerIDs.push(player.id);
        }
      });

      for (const player of players) {
        let user = await User.findById(player.id);

        const gamesPlayed = 1;
        const wins = winnerIDs.indexOf(player.id) !== 1 ? 1 : 0;
        const points = player.totalPoints;

        if (user) {
          stats = {
            total: {
              gamesPlayed: user.stats.total.gamesPlayed + gamesPlayed,
              wins: user.stats.total.wins + wins,
              points: user.stats.total.points + points,
            },
            minor: {
              gamesPlayed: isMinor
                ? user.stats.minor.gamesPlayed + gamesPlayed
                : user.stats.minor.gamesPlayed,
              wins: isMinor
                ? user.stats.minor.wins + wins
                : user.stats.minor.wins,
              points: isMinor
                ? user.stats.minor.points + points
                : user.stats.minor.points,
            },
            major: {
              gamesPlayed: !isMinor
                ? user.stats.major.gamesPlayed + gamesPlayed
                : user.stats.major.gamesPlayed,
              wins: !isMinor
                ? user.stats.major.wins + wins
                : user.stats.major.wins,
              points: !isMinor
                ? user.stats.major.points + points
                : user.stats.major.points,
            },
          };

          user.stats = stats;
          await user.save();
        }
      }

      return { message: "Данные сохранены" };
    }
  } catch (error) {
    console.error(error);
    return { message: "Ошибка сервера" };
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
  saveStats,
  updateSettings,
  inviteToBeFriends,
};
