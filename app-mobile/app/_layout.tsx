import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
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

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          {!loaded && <SplashScreen />}
          {loaded && <RootLayoutNav />}
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, isAuth } = useAuth();

  React.useEffect(() => {
    if (colorScheme) {
      dispatch(setMode(colorScheme));
    }
  }, [colorScheme]);

  React.useEffect(() => {
    dispatch(loadProfile());
  }, [dispatch]);

  const segments = useSegments();

  const inAuthGroup = segments[0] === "(auth)";

  React.useEffect(() => {
    if (!loading) {
      if (!isAuth && !inAuthGroup) {
        router.replace("(auth)");
      } else if (isAuth && inAuthGroup) {
        router.replace("(home)");
      }
    }
  }, [isAuth, loading, segments]);

  return (
    <Stack screenOptions={{ animation: "none" }}>
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
