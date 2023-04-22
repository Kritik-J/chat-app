import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Chat, User, Message } from "../models/index.js";

export const createPrivateChat = catchAsync(async (req, res, next) => {
  const { userId } = req.body;

  const usersId = [req.user._id, userId];

  if (!usersId || usersId.length === 0) {
    return next(new ErrorHandler("Please provide usersId", 400));
  }

  if (usersId.length !== 2) {
    return next(new ErrorHandler("Please provide 2 usersId", 400));
  }

  const chat = await Chat.findOne({
    users: { $all: usersId },
    type: "private",
  });

  if (chat) {
    res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const newChat = await Chat.create({
      users: usersId,
      type: "private",
    });

    if (!newChat) {
      return next(new ErrorHandler("Chat could not be created", 400));
    }

    res.status(201).json({
      success: true,
      chat: newChat,
    });
  }
});

export const createGroupChat = catchAsync(async (req, res, next) => {
  const { userIds, chatName, chatImage } = req.body;

  const newChat = await Chat.create({
    users: userIds,
    chatName,
    chatImage,
    type: "group",
  });

  if (!newChat) {
    return next(new ErrorHandler("Chat could not be created", 400));
  }

  res.status(201).json({
    success: true,
    chat: newChat,
  });
});

export const getChats = catchAsync(async (req, res, next) => {
  const chats = await Chat.find({ users: req.user._id });

  if (!chats) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  const promise = chats.map(async (chat) => {
    const lastMessage = await Message.find({ chat: chat._id })
      .populate({
        path: "sender",
        select: "displayName",
      })
      .sort({ createdAt: -1 })
      .limit(1);

    chat = { ...chat._doc, lastMessage: lastMessage[0] };

    if (chat.type === "private") {
      const otherUserId = chat.users.find(
        (user) => user.toString() !== req.user._id.toString()
      );

      const otherUser = await User.findById(otherUserId);

      chat.chatName = otherUser.displayName;
      chat.chatImage = otherUser.photoURL;

      return chat;
    }
    return chat;
  });

  const myChats = await Promise.all(promise);

  myChats.sort(function (a, b) {
    if (!a.lastMessage && !b.lastMessage) {
      return b.createdAt - a.createdAt;
    } else if (!a.lastMessage) {
      return b.lastMessage.createdAt - a.createdAt;
    } else if (!b.lastMessage) {
      return b.createdAt - a.lastMessage.createdAt;
    } else {
      return b.lastMessage.createdAt - a.lastMessage.createdAt;
    }
  });

  res.status(200).json({
    success: true,
    chats: myChats,
  });
});

export const getChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (chat.type === "private") {
    const otherUserId = chat.users.find(
      (user) => user.toString() !== req.user._id.toString()
    );

    const otherUser = await User.findById(otherUserId);

    if (!otherUser) {
      return next(new ErrorHandler("Chat not found", 404));
    }

    chat.chatName = otherUser.displayName;
    chat.chatImage = otherUser.photoURL;
  }

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  res.status(200).json({
    success: true,
    chat,
  });
});
