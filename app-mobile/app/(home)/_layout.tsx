import { Stack } from "expo-router";
import { SocketProvider } from "../../context/socket";

export default function TabLayout() {
  return (
    <SocketProvider>
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
    </SocketProvider>
  );
}
