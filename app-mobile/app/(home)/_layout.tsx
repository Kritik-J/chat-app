import { Stack, Tabs } from "expo-router";
import useMode from "../../hooks/useMode";

export default function TabLayout() {
  const mode = useMode();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="chats/[_id]" />
      <Stack.Screen name="add-chat" />
    </Stack>
  );
}
