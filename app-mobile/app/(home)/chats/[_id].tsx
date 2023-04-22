import {
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  StatusBar,
  TextInput,
} from "react-native";
import React from "react";
import themes from "../../../constants/themes";
import useMode from "../../../hooks/useMode";
import { MaterialIcons } from "@expo/vector-icons";
import ChatHeader from "../../../components/ChatHeader";
import Message from "../../../components/Message";
import Typography from "../../../components/Typography";
import dayjs from "dayjs";
import { useSearchParams } from "expo-router";
import { useAppDispatch } from "../../../hooks/useReduce";
import { getMyMessages, sendMessage } from "../../../redux/messageSlice";
import useMessage from "../../../hooks/useMessage";
import axios from "axios";
import Constants from "expo-constants";
import { IChat } from "../../../types";

const Chat = () => {
  const mode = useMode();
  const dispatch = useAppDispatch();
  const { _id } = useSearchParams();
  const { loading, messages } = useMessage();
  const [text, setText] = React.useState("");
  const [loadingChat, setLoadingChat] = React.useState(false);
  const [chat, setChat] = React.useState<IChat | null>(null);
  const apiUrl = Constants.expoConfig?.extra?.apiUrl;

  const handleSendMessage = () => {
    dispatch(
      sendMessage({
        chatId: _id as string,
        text,
      })
    );
    setText("");
  };

  React.useEffect(() => {
    const fetchMessages = async () => {
      setLoadingChat(true);

      try {
        const response = await axios.get(`${apiUrl}/chats/${_id}?page=1`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.success) {
          setChat(response.data.chat);
        }
      } catch (error) {
        // console.log(error);
      }

      setLoadingChat(false);
    };

    fetchMessages();
  }, [_id]);

  React.useEffect(() => {
    dispatch(getMyMessages({ chatId: _id as string }));
  }, [_id]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themes[mode].colors.background },
      ]}
    >
      <ChatHeader
        chatName={chat ? chat.chatName : "Loading..."}
        chatImage={chat ? chat.chatImage : "https://picsum.photos/200"}
      />

      <ImageBackground
        source={
          mode === "light"
            ? require("../../../assets/images/wa_chat_light.jpg")
            : require("../../../assets/images/wa_chat_dark.jpg")
        }
        style={styles.image}
      >
        <FlatList
          contentContainerStyle={styles.list}
          data={messages}
          inverted
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <>
              {!loadingChat && !loading ? (
                <>
                  <Message message={item} index={index} />

                  {index === messages.length - 1 ||
                  dayjs(messages[index + 1].createdAt).format("DD/MM/YYYY") !==
                    dayjs(messages[index].createdAt).format("DD/MM/YYYY") ? (
                    <View style={styles.dateHeader}>
                      <Typography
                        variant="body2"
                        style={[
                          styles.dateHeaderText,
                          {
                            color: themes[mode].colors.text,
                            backgroundColor: themes[mode].colors.chatDateHeader,
                          },
                        ]}
                      >
                        {dayjs(item.createdAt).format("DD MMMM YYYY")}
                      </Typography>
                    </View>
                  ) : null}
                </>
              ) : null}
            </>
          )}
        />

        <View style={styles.inputBox}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: themes[mode].colors.bottomTabBar,
                color: themes[mode].colors.textInputFontColor,
              },
            ]}
            placeholderTextColor={themes[mode].colors.textInputFontColor}
            placeholder="Type a message"
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleSendMessage}
          />

          <MaterialIcons
            name="send"
            style={[styles.sendIcon]}
            onPress={handleSendMessage}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: (StatusBar.currentHeight as number) + 10,
  },

  image: {
    flex: 1,
  },

  list: {
    padding: 10,
  },

  dateHeader: {
    alignItems: "center",
    marginBottom: 10,
  },

  dateHeaderText: {
    fontWeight: "700",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },

  inputBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },

  input: {
    flex: 1,
    padding: 8,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginRight: 10,
  },

  sendIcon: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#25D366",
    color: "white",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
