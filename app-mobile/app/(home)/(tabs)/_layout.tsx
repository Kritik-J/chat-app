import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import TabHeader from "../../../components/TabHeader";
import useMode from "../../../hooks/useMode";
import themes from "../../../constants/themes";

export default function TabLayout() {
  const mode = useMode();

  return (
    <Tabs
      screenOptions={{
        header: () => <TabHeader />,

        tabBarStyle: {
          backgroundColor: themes[mode].colors.bottomTabBar,
          borderTopColor: themes[mode].colors.bottomTabBar,
        },

        tabBarActiveTintColor: themes[mode].colors.bottomTabBarActive,
        tabBarInactiveTintColor: themes[mode].colors.bottomTabBarInactive,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => (
            <AntDesign size={24} name="message1" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <AntDesign size={24} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
