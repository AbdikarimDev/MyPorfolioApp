import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  Unbounded_400Regular,
  Unbounded_700Bold,
} from "@expo-google-fonts/unbounded";
import {
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
} from "@expo-google-fonts/ibm-plex-mono";
import {
  Syne_400Regular,
  Syne_700Bold,
} from "@expo-google-fonts/syne";
import RadarLoader from "@/components/ui/RadarLoader";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Unbounded_400Regular,
    Unbounded_700Bold,
    IBMPlexMono_400Regular,
    IBMPlexMono_500Medium,
    Syne_400Regular,
    Syne_700Bold,
  });

  if (!fontsLoaded || !ready) {
    return <RadarLoader onComplete={() => setReady(true)} />;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#02020a" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}