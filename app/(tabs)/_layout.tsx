import { Tabs } from "expo-router";
import { C, FONTS } from "@/src/data/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#02020a",
          borderTopWidth: 0.5,
          borderTopColor: "rgba(0,240,255,0.15)",
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: "#00f0ff",
        tabBarInactiveTintColor: "#44445a",
        tabBarLabelStyle: {
          fontFamily: "IBMPlexMono_400Regular",
          fontSize: 9,
          letterSpacing: 1.5,
        },
      }}
    >
      <Tabs.Screen name="home" options={{ title: "HOME" }} />
      <Tabs.Screen name="projects" options={{ title: "WORK" }} />
      <Tabs.Screen name="skills" options={{ title: "STACK" }} />
      <Tabs.Screen name="about" options={{ title: "ABOUT" }} />
      <Tabs.Screen name="contact" options={{ title: "CONTACT" }} />
    </Tabs>
  );
}