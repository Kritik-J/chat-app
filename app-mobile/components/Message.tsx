import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Typography from "./Typography";
import dayjs from "dayjs";
import { IMessage, IUser } from "../types";
import themes from "../constants/themes";
import useMode from "../hooks/useMode";
import useAuth from "../hooks/useAuth";

type MessageProps = {
  message: IMessage;
  index: number;
};

const Message = ({ message, index }: MessageProps) => {
  const mode = useMode();
  const { user } = useAuth() as { user: IUser };

  const isMe = user._id;

  return (
    <View
      style={[
        styles.message,
        {
          backgroundColor:
            message.sender._id === isMe
              ? themes[mode].colors.chatMyMessageBackgroundColor
              : themes[mode].colors.chatMessageBackgroundColor,
          alignSelf: message.sender._id === isMe ? "flex-end" : "flex-start",
          marginBottom: index === 0 ? 0 : 10,
        },
      ]}
    >
      <Typography variant="body1">{message.text}</Typography>

      <Typography
        variant="body2"
        style={{
          textAlign: message.sender._id === "u1" ? "right" : "left",
          marginTop: 5,
        }}
      >
        {dayjs(message.createdAt).format("h:mm A")}
      </Typography>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
