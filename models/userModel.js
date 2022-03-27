const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const statSchema = mongoose.Schema(
  {
    gamesPlayed: {
      type: Number,
      default: 0,
    },
    wins: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const friendSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      default: "toBeApproved",
    },
  },
  {
    timestamps: true,
  }
);

const settingsSchema = mongoose.Schema({
  musicVolume: {
    type: String,
    required: true,
    default: "40",
  },
  effectsVolume: {
    type: String,
    required: true,
    default: "100",
  },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    friends: [
      // {
      //   user: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "User",
      //   },
      // },
      friendSchema,
    ],
    stats: {
      total: statSchema,
      major: statSchema,
      minor: statSchema,
    },
    settings: settingsSchema,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = User = mongoose.model("User", userSchema);
