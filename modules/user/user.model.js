const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "user",
    },
    image: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports= UserModel;
