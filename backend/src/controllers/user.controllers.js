import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/errorHandler.js";
import APIFeatures from "../utils/apiFeatures.js";
import { User } from "../models/index.js";
import { removeHash } from "../utils/password.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const apiFeature = new APIFeatures(User.find(), req.query)
    .search()
    .filter()
    .paginate();

  const users = await apiFeature.query;

  users.forEach((user) => {
    user = removeHash(user);
  });

  res.status(200).json({
    success: true,
    users,
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
