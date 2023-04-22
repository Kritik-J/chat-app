import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },

    about: {
      type: String,
    },

    photoURL: {
      type: String,
      default: "https://api.dicebear.com/6.x/big-ears-neutral/png?seed=default",
    },

    salt: {
      type: String,
      required: true,
    },

    hash: {
      type: String,
      required: true,
    },

    iterations: {
      type: Number,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
