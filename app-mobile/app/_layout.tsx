import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store, { persistor } from "../redux/store";
import { useColorScheme } from "react-native";
import { useAppDispatch } from "../hooks/useReduce";
import { setMode } from "../redux/uiSlice";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import useAuth from "../hooks/useAuth";
import { loadProfile } from "../redux/authSlice";
import { PersistGate } from "redux-persist/integration/react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <RootLayoutNav />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const segments = useSegments();

  const { isAuth } = useAuth();

  useEffect(() => {
    if (colorScheme) {
      dispatch(setMode(colorScheme));
    }
  }, [colorScheme]);

  useEffect(() => {
    dispatch(loadProfile());
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuth && !inAuthGroup) {
      router.replace("(auth)");
    }

    if (isAuth && inAuthGroup) {
      router.replace("(home)/(tabs)");
    }
  }, [isAuth, segments]);

  return (
    <Stack screenOptions={{ animation: "none" }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
