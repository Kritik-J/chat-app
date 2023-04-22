import { StyleSheet, View, StatusBar } from "react-native";
import React from "react";
import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "./Typography";
import useMode from "../hooks/useMode";
import themes from "../constants/themes";

const TabHeader = () => {
  const mode = useMode();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themes[mode].colors.header },
      ]}
    >
      <StatusBar barStyle="light-content" />

      <Typography
        variant="h2"
        style={{ color: "white", fontWeight: "500", fontSize: 22 }}
      >
        ChatApp
      </Typography>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="camera-outline"
          size={24}
          color="white"
          style={{ marginRight: 20 }}
        />

        {/* <Octicons
          name="search"
          size={22}
          color="white"
          style={{ marginRight: 20 }}
        /> */}

        <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
      </View>
    </View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: (StatusBar.currentHeight as number) + 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
