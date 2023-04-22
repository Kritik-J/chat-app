import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";
import Avatar from "./Avatar";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "./Typography";
import { useRouter } from "expo-router";
import useMode from "../hooks/useMode";
import themes from "../constants/themes";

const ChatHeader = ({
  chatName,
  chatImage,
}: {
  chatName: string;
  chatImage: string;
}) => {
  const router = useRouter();
  const mode = useMode();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themes[mode].colors.header },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={() => {
            router.back();
          }}
        />

        <Avatar
          // uri="https://picsum.photos/300/300"
          uri={chatImage}
          size={40}
          style={{ marginHorizontal: 10 }}
        />

        <Typography variant="h3" style={{ color: "white" }}>
          {chatName}
        </Typography>
      </View>

      <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: (StatusBar.currentHeight as number) + 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
