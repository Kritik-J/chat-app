import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import useMode from "../../../hooks/useMode";
import themes from "../../../constants/themes";
import ChatListItem from "../../../components/ChatListItem";
import { Octicons } from "@expo/vector-icons";
import Typography from "../../../components/Typography";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../../../hooks/useReduce";
import { fetchChats } from "../../../redux/chatSlice";
import useChat from "../../../hooks/useChat";
import useAuth from "../../../hooks/useAuth";

export default function Chats() {
  const mode = useMode();
  const router = useRouter();
  const { chats, loading } = useChat();
  const { user } = useAuth();

  const dispatch = useAppDispatch();

  const fetchUsersChats = () => {
    dispatch(fetchChats());
  };

  React.useEffect(() => {
    fetchUsersChats();
  }, [user]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themes[mode].colors.background },
      ]}
    >
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            size="large"
            color={themes[mode].colors.highlight}
          />
        </View>
      ) : (
        <>
          {chats && chats.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" style={{}}>
                No chats yet
              </Typography>
            </View>
          ) : (
            <FlatList
              data={chats}
              renderItem={({ item, index }) => (
                <ChatListItem
                  key={index}
                  chat={item}
                  isLast={index === chats.length - 1}
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={fetchUsersChats}
                />
              }
            />
          )}
        </>
      )}
      <Pressable
        style={[
          styles.plusIcon,
          {
            backgroundColor: themes[mode].colors.header,
          },
        ]}
        onPress={() => {
          router.push("add-chat");
        }}
      >
        <Octicons name="plus" size={28} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  plusIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
