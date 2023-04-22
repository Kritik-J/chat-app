import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Chat, Message } from "../models/index.js";

export const sendMessage = catchAsync(async (req, res, next) => {
  const { chatId, text } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  const message = await Message.create({
    sender: req.user._id,
    text,
    chat: chatId,
  });

  if (!message) {
    return next(new ErrorHandler("Message could not be sent", 400));
  }

  res.status(201).json({
    success: true,
    message: {
      ...message._doc,
      sender: {
        _id: req.user._id,
        displayName: req.user.displayName,
      },
    },
  });
});

export const getMessagesByChatId = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const messages = await Message.find({ chat: chatId })
    .populate({
      path: "sender",
      select: "displayName",
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (!messages) {
    return next(new ErrorHandler("Messages not found", 404));
  }

  res.status(200).json({
    success: true,
    messages,
  });
});
