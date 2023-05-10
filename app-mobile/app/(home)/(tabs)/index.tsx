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
import useAuth from "../../../hooks/useAuth";
import { IChat } from "../../../types";
import axios from "axios";
import Constants from "expo-constants";

export default function Chats() {
  const apiUrl = Constants.expoConfig?.extra?.apiUrl;

  const mode = useMode();
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [chats, setChats] = React.useState<IChat[]>([]);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiUrl}/chats`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setChats(data.chats);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchChats();
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
                <RefreshControl refreshing={loading} onRefresh={fetchChats} />
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
