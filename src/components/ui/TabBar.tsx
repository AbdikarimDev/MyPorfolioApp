import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import { C, FONTS, SP } from "../../data/theme";

const ICONS: Record<string, string> = {
  home: "⌂",
  grid: "▦",
  cpu: "◈",
  user: "◉",
  mail: "✉",
};

const NAV_ITEMS = [
  { key: "Home", label: "HOME", icon: "home" },
  { key: "Projects", label: "WORK", icon: "grid" },
  { key: "Skills", label: "STACK", icon: "cpu" },
  { key: "About", label: "ABOUT", icon: "user" },
  { key: "Contact", label: "CONTACT", icon: "mail" },
];

interface TabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export default function CyberTabBar({ activeTab, onTabPress }: TabBarProps) {
  return (
    <View style={styles.wrapper}>
      <BlurView intensity={60} tint="dark" style={styles.blur}>
        <View style={styles.bar}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => onTabPress(item.key)}
                style={styles.tab}
                activeOpacity={0.7}
              >
                <View style={[styles.tabInner, isActive && styles.tabInnerActive]}>
                  {isActive && <View style={styles.activeLine} />}
                  <Text
                    style={[styles.icon, isActive ? styles.iconActive : styles.iconInactive]}
                  >
                    {ICONS[item.icon]}
                  </Text>
                  <Text
                    style={[
                      styles.label,
                      isActive ? styles.labelActive : styles.labelInactive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0,240,255,0.15)",
  },
  blur: {
    paddingBottom: Platform.OS === "ios" ? 24 : 8,
  },
  bar: {
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: SP.sm,
    backgroundColor: "rgba(2,2,10,0.7)",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  tabInner: {
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 8,
    minWidth: 52,
    position: "relative",
  },
  tabInnerActive: {
    backgroundColor: "rgba(0,240,255,0.07)",
  },
  activeLine: {
    position: "absolute",
    top: 0,
    left: "20%",
    right: "20%",
    height: 1,
    backgroundColor: C.cyan,
    borderRadius: 1,
  },
  icon: {
    fontSize: 16,
    marginBottom: 3,
  },
  iconActive: {
    color: C.cyan,
  },
  iconInactive: {
    color: C.textMuted,
  },
  label: {
    fontFamily: FONTS.mono,
    fontSize: 8,
    letterSpacing: 1.5,
  },
  labelActive: {
    color: C.cyan,
  },
  labelInactive: {
    color: C.textMuted,
  },
});