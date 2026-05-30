import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CyberDivider,
  GlowCard,
  Label,
  SectionNum,
} from "@/components/ui/Atoms";
import { SKILLS, SKILL_CATEGORIES } from "@/data";
import { C, FONTS, RADIUS, SP } from "@/data/theme";

const { width } = Dimensions.get("window");

export default function SkillsScreen() {
  const [activeCategory, setActiveCategory] = useState("all");
  const progressAnims = useRef<Record<string, Animated.Value>>({});

  // Init progress animations
  SKILLS.forEach((s) => {
    if (!progressAnims.current[s.name]) {
      progressAnims.current[s.name] = new Animated.Value(0);
    }
  });

  const filtered =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  useEffect(() => {
    // Animate all visible bars
    filtered.forEach((skill, i) => {
      Animated.timing(progressAnims.current[skill.name], {
        toValue: skill.level / 100,
        duration: 800,
        delay: i * 60,
        useNativeDriver: false,
      }).start();
    });

    // Reset hidden bars
    SKILLS.forEach((skill) => {
      if (!filtered.find((f) => f.name === skill.name)) {
        progressAnims.current[skill.name].setValue(0);
      }
    });
  }, [activeCategory]);

  const BAR_W = width - SP.pagePad * 2 - SP.lg * 2;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <SectionNum num="03" />
        <Text style={styles.title}>TECH{"\n"}STACK</Text>
        <Text style={styles.subtitle}>
          Tools, frameworks, and languages I build with.
        </Text>
      </View>

      {/* Category Filter - horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {SKILL_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            onPress={() => setActiveCategory(cat.key)}
            style={[
              styles.filterChip,
              activeCategory === cat.key && styles.filterChipActive,
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                activeCategory === cat.key && styles.filterTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <CyberDivider />

      {/* Skills List */}
      <GlowCard style={styles.skillsCard}>
        {filtered.map((skill, i) => (
          <View key={skill.name}>
            <View style={styles.skillRow}>
              {/* Name + Category */}
              <View style={styles.skillMeta}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Label style={styles.skillCat}>{skill.category}</Label>
              </View>

              {/* Level */}
              <Text style={styles.skillLevel}>{skill.level}%</Text>
            </View>

            {/* Animated Progress Bar */}
            <View style={[styles.track, { width: BAR_W }]}>
              <Animated.View
                style={[
                  styles.fill,
                  {
                    width: progressAnims.current[skill.name].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, BAR_W],
                    }),
                  },
                ]}
              >
                <LinearGradient
                  colors={[C.cyan, C.cyanDim]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1 }}
                />
              </Animated.View>
            </View>

            {i < filtered.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </GlowCard>

      {/* Legend */}
      <View style={styles.legend}>
        {[
          { range: "90–100%", label: "EXPERT" },
          { range: "75–89%", label: "PROFICIENT" },
          { range: "60–74%", label: "FAMILIAR" },
        ].map((l) => (
          <View key={l.label} style={styles.legendItem}>
            <View style={styles.legendDot} />
            <Label>{l.range}</Label>
            <Label style={{ color: C.textMuted }}> · {l.label}</Label>
          </View>
        ))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.void },
  content: { paddingHorizontal: SP.pagePad, paddingTop: 60 },

  header: { marginBottom: SP.xl },
  title: {
    fontFamily: FONTS.display,
    fontSize: 34,
    color: C.white,
    lineHeight: 42,
    marginVertical: 8,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: C.textSecondary,
    lineHeight: 22,
  },

  filterScroll: {
    gap: 8,
    paddingVertical: 4,
    marginTop: SP.md,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.pill,
    borderWidth: 0.5,
    borderColor: C.border,
  },
  filterChipActive: {
    backgroundColor: C.cyanGlow,
    borderColor: C.cyanBorder,
  },
  filterText: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    color: C.textMuted,
    letterSpacing: 2,
  },
  filterTextActive: { color: C.cyan },

  skillsCard: { gap: 0, padding: SP.lg, marginTop: 8 },

  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  skillMeta: { gap: 2 },
  skillName: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: C.white,
    fontWeight: "600",
  },
  skillCat: {
    fontSize: 8,
    letterSpacing: 2,
    color: C.textMuted,
  },
  skillLevel: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: C.cyan,
  },

  track: {
    height: 2,
    backgroundColor: C.border,
    borderRadius: 1,
    overflow: "hidden",
    marginBottom: 16,
  },
  fill: {
    height: "100%",
    borderRadius: 1,
    overflow: "hidden",
  },

  divider: {
    height: 0.5,
    backgroundColor: C.border,
    marginBottom: 16,
  },

  legend: {
    marginTop: SP.lg,
    gap: 6,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.cyan,
    marginRight: 4,
  },
});
