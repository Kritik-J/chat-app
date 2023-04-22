import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import themes from "../constants/themes";
import useMode from "../hooks/useMode";

export default function NotFoundScreen() {
  const mode = useMode();

  return (
    <>
      <Stack.Screen
        options={{
          header: () => null,
        }}
      />

      <View
        style={[
          styles.container,
          { backgroundColor: themes[mode].colors.background },
        ]}
      >
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
