import { TouchableNativeFeedback, StyleSheet, View, Text } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Typography from "./Typography";
import Avatar from "./Avatar";
import useMode from "../hooks/useMode";
import themes from "../constants/themes";
import { useRouter } from "expo-router";
import { IChat } from "../types";
dayjs.extend(relativeTime);

type IChatListItem = {
  isLast: boolean;
  chat: IChat;
};

const ChatListItem = (props: IChatListItem) => {
  const { chat, isLast } = props;
  const mode = useMode();

  const router = useRouter();

  const goToChat = () => {
    router.push(`/chats/${chat._id}`);
  };

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(
        themes[mode].colors.chatListItemRipple,
        false
      )}
      onPress={goToChat}
    >
      <View
        style={[
          styles.container,
          {
            borderBottomWidth: isLast ? 0 : 1,
            borderBottomColor: themes[mode].colors.chatListItemBorder,
          },
        ]}
      >
        <Avatar uri={chat.chatImage} size={48} />

        <View style={styles.center}>
          <Typography variant="h3" textProps={{ numberOfLines: 1 }}>
            {chat.chatName}
          </Typography>

          <View style={{ height: 5 }} />

          {chat.lastMessage && (
            <Typography variant="body1" textProps={{ numberOfLines: 1 }}>
              {chat.lastMessage.text}
            </Typography>
          )}
        </View>

        <View style={styles.right}>
          {chat.lastMessage ? (
            <Typography variant="body2" textProps={{ numberOfLines: 1 }}>
              {dayjs(chat.lastMessage?.createdAt).fromNow()}
            </Typography>
          ) : (
            <Typography variant="body2" textProps={{ numberOfLines: 1 }}>
              {dayjs(chat.createdAt).fromNow()}
            </Typography>
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    padding: 10,
    paddingVertical: 15,
  },

  center: {
    flex: 1,
    paddingHorizontal: 20,
  },

  right: {
    height: "100%",
  },
});
