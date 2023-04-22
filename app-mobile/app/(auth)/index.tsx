import { StyleSheet, Image, View, StatusBar, Dimensions } from "react-native";
import React from "react";
import themes from "../../constants/themes";
import useMode from "../../hooks/useMode";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import { useRouter } from "expo-router";

const welcome = () => {
  const mode = useMode();
  const router = useRouter();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themes[mode].colors.background,
        },
      ]}
    >
      <Image
        source={require("../../assets/images/wa.png")}
        style={{
          width: Dimensions.get("window").width - 30,
          height: Dimensions.get("window").width - 30,
        }}
      />

      <View style={{ height: 30 }} />

      <Typography variant="h2" style={{ color: themes[mode].colors.text }}>
        Welcome to ChatApp
      </Typography>

      <View style={{ height: 15 }} />

      <Typography variant="body1" style={{ textAlign: "center" }}>
        Read our{" "}
        <Typography variant="body1" style={{ color: themes[mode].colors.link }}>
          Privacy Policy
        </Typography>
        . Tap "Agree and continue" to accept the{" "}
        <Typography variant="body1" style={{ color: themes[mode].colors.link }}>
          Terms of Service
        </Typography>
      </Typography>

      <View style={{ height: 20 }} />

      <Button
        title="Agree and  continue"
        onPress={() => {
          router.push("login");
        }}
        borderRadius={40}
        backgroundColor={themes[mode].colors.highlight}
        fontColor="white"
        borderWidth={0}
        buttonStyle={{
          height: 42,
          width: "80%",
        }}
      />
    </View>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: (StatusBar.currentHeight as number) + 20,
  },
});
