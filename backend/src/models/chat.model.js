import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
    },

    chatImage: {
      type: String,
    },

    type: {
      type: String,
      enum: ["private", "group"],
      default: "private",
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
