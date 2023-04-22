import catchAsync from "../utils/catchAsync.js";
import { User } from "../models/index.js";

import { generateHash, verifyHash } from "../utils/password.js";
import createSendToken from "../utils/createSendToken.js";
import ErrorHandler from "../utils/errorHandler.js";

export const register = catchAsync(async (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (
    !displayName ||
    !email ||
    !password ||
    !displayName.trim() ||
    !email.trim() ||
    !password.trim()
  ) {
    return next(new ErrorHandler("Please fill in all the fields", 400));
  }

  const user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const hash = await generateHash(password);

  const photoURL = `https://api.dicebear.com/6.x/big-ears-neutral/png?seed=${email}`;

  const newUser = await User.create({
    displayName,
    email,
    photoURL,
    hash: hash.hash,
    salt: hash.salt,
    iterations: hash.iterations,
  });

  createSendToken(newUser, 201, req, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || !email.trim() || !password.trim()) {
    return next(new ErrorHandler("Please fill in all the fields", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  const isVerified = await verifyHash(
    password,
    user.salt,
    user.hash,
    user.iterations
  );

  if (!isVerified) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  createSendToken(user, 200, req, res);
});

export const logout = catchAsync(async (req, res, next) => {
  res.cookie("jwttoken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export const getProfile = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new ErrorHandler("Please login to access the resource", 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
