import { CyanLine, CyberDivider, GlowCard, Label } from "@/components/ui/Atoms";
import { PERSONAL } from "@/data";
import { C, FONTS, RADIUS, SP } from "@/data/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { router } from "expo-router";

import {
  Animated,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const MARQUEE_ITEMS = [
  "REACT",
  "VUE 3",
  "TYPESCRIPT",
  "REACT NATIVE",
  "FIREBASE",
  "TAILWIND",
  "FIGMA",
  "NATIVEWIND",
];

export default function HomeScreen({
  onNavigate,
}: {
  onNavigate: (tab: string) => void;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const marqueeX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Marquee loop
    const totalWidth = MARQUEE_ITEMS.length * 130;
    Animated.loop(
      Animated.timing(marqueeX, {
        toValue: -totalWidth,
        duration: MARQUEE_ITEMS.length * 1800,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const handleLink = (url: string) => Linking.openURL(url);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── HERO ─────────────────────────────────────────── */}
      <Animated.View
        style={[
          styles.hero,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatarRing} />
          <View style={styles.avatarRing2} />
          <Image
            source={require("@/assets/Me.png")}
            style={styles.avatar}
            resizeMode="contain"
            defaultSource={require("@/assets/Me.png")}
          />
          {/* Orbit dot */}
          <View style={styles.orbitDot} />
        </View>

        {/* Name */}
        <View style={styles.nameLine}>
          <CyanLine style={{ width: 28 }} />
          <Text style={styles.nameText}>{PERSONAL.name.toUpperCase()}</Text>
          <CyanLine style={{ width: 28 }} />
        </View>
        <Text style={styles.roleText}>{PERSONAL.role}</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>{PERSONAL.bioShort}</Text>

        {/* CTA Buttons */}
        <View style={styles.ctaRow}>
          <TouchableOpacity
            style={styles.ctaPrimary}
            onPress={() => onNavigate("Projects")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["rgba(0,240,255,0.15)", "rgba(0,240,255,0.05)"]}
              style={styles.ctaGrad}
            >
              <Text style={styles.ctaPrimaryText}>VIEW WORK</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ctaSecondary}
            onPress={() => router.push("/(tabs)/ContactScreen")}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaSecondaryText}>CONTACT</Text>
          </TouchableOpacity>
        </View>

        {/* Social Links */}
        <View style={styles.socials}>
          {[
            { label: "GH", url: PERSONAL.links.github },
            { label: "LI", url: PERSONAL.links.linkedin },
            { label: "TW", url: PERSONAL.links.twitter },
          ].map((s) => (
            <TouchableOpacity
              key={s.label}
              onPress={() => handleLink(s.url)}
              style={styles.socialBtn}
            >
              <Text style={styles.socialLabel}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* ── MARQUEE ───────────────────────────────────────── */}
      <View style={styles.marqueeWrap}>
        <View style={styles.marqueeLine} />
        <View style={styles.marqueeTrack}>
          <Animated.View
            style={[
              styles.marqueeInner,
              { transform: [{ translateX: marqueeX }] },
            ]}
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
              (item, i) => (
                <View key={i} style={styles.marqueeItem}>
                  <Text style={styles.marqueeDot}>◆</Text>
                  <Text style={styles.marqueeText}>{item}</Text>
                </View>
              ),
            )}
          </Animated.View>
        </View>
        <View style={styles.marqueeLine} />
      </View>

      {/* ── STATS ─────────────────────────────────────────── */}
      <View style={styles.statsGrid}>
        {[
          { num: "1+", label: "YEAR EXP" },
          { num: "7", label: "PROJECTS" },
          { num: "15+", label: "TECH STACK" },
          { num: "3", label: "CLIENTS" },
        ].map((s) => (
          <GlowCard key={s.label} style={styles.statCard} glowTop>
            <Text style={styles.statNum}>{s.num}</Text>
            <Label style={{ textAlign: "center", fontSize: 8 }}>
              {s.label}
            </Label>
          </GlowCard>
        ))}
      </View>

      <CyberDivider label="FEATURED WORK" />

      {/* ── FEATURED PROJECT TEASER ───────────────────────── */}
      <GlowCard cyanBorder style={styles.featuredCard}>
        <Label style={{ color: C.cyan, marginBottom: 8 }}>LATEST BUILD</Label>
        <Text style={styles.featuredTitle}>FreshBowl</Text>
        <Text style={styles.featuredSub}>Mobile App UI/UX · React Native</Text>
        <View style={styles.featuredDivider} />
        <Text style={styles.featuredDesc}>
          End-to-end food ordering app with onboarding, checkout, and order
          tracking — designed in Figma, built with React Native.
        </Text>
        <TouchableOpacity
          onPress={() => onNavigate("Projects")}
          style={styles.viewAllBtn}
        >
          <Text style={styles.viewAllText}>VIEW ALL PROJECTS →</Text>
        </TouchableOpacity>
      </GlowCard>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.void },
  content: { paddingHorizontal: SP.pagePad, paddingTop: 60 },

  // Hero
  hero: { alignItems: "center", paddingBottom: SP.xl },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: SP.xl,
  },

  // Avatar
  avatarWrap: {
    width: 310,
    height: 310,
    marginBottom: SP.lg,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarRing: {
    position: "absolute",
    width: 308,
    height: 308,
    borderRadius: 54,
    borderWidth: 1,
    borderColor: C.cyanBorder,
  },
  avatarRing2: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 0.5,
    borderColor: "rgba(0,240,255,0.08)",
  },
  avatar: {
    width: 300,
    height: 300,
    borderRadius: 46,
  },
  orbitDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.cyan,
  },

  // Name
  nameLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 6,
  },
  nameText: {
    fontFamily: FONTS.display,
    fontSize: 22,
    color: C.white,
    letterSpacing: 4,
  },
  roleText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: C.cyan,
    letterSpacing: 3,
    marginBottom: SP.md,
  },
  tagline: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: C.textSecondary,
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: SP.md,
    marginBottom: SP.xl,
  },

  // CTA
  ctaRow: { flexDirection: "row", gap: 12, marginBottom: SP.lg },
  ctaPrimary: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: C.cyanBorder,
    overflow: "hidden",
  },
  ctaGrad: { paddingHorizontal: 24, paddingVertical: 12 },
  ctaPrimaryText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: C.cyan,
    letterSpacing: 2,
  },
  ctaSecondary: {
    borderRadius: RADIUS.md,
    borderWidth: 0.5,
    borderColor: C.border,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  ctaSecondaryText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: C.textSecondary,
    letterSpacing: 2,
  },

  // Socials
  socials: { flexDirection: "row", gap: 12 },
  socialBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    borderWidth: 0.5,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  socialLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: C.textSecondary,
    letterSpacing: 1,
  },

  // Marquee
  marqueeWrap: { marginVertical: SP.lg, overflow: "hidden" },
  marqueeLine: { height: 0.5, backgroundColor: C.border },
  marqueeTrack: { paddingVertical: 14, overflow: "hidden" },
  marqueeInner: { flexDirection: "row", alignItems: "center" },
  marqueeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
    minWidth: 130,
  },
  marqueeDot: { color: C.cyan, fontSize: 8 },
  marqueeText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: C.textSecondary,
    letterSpacing: 2,
  },

  // Stats
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  statCard: {
    width: (width - SP.pagePad * 2 - 30) / 2,
    alignItems: "center",
    gap: 4,
    padding: SP.md,
  },
  statNum: {
    fontFamily: FONTS.display,
    fontSize: 28,
    color: C.cyan,
  },

  // Featured
  featuredCard: { marginTop: 4 },
  featuredTitle: {
    fontFamily: FONTS.display,
    fontSize: 22,
    color: C.white,
    marginBottom: 4,
  },
  featuredSub: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: C.textSecondary,
    letterSpacing: 1,
  },
  featuredDivider: {
    height: 0.5,
    backgroundColor: C.border,
    marginVertical: SP.md,
  },
  featuredDesc: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: C.textSecondary,
    lineHeight: 22,
    marginBottom: SP.md,
  },
  viewAllBtn: { alignSelf: "flex-start" },
  viewAllText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: C.cyan,
    letterSpacing: 2,
  },
});
