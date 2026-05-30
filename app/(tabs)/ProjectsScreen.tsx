import { useState } from "react";
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CyberDivider,
  GlowCard,
  SectionNum,
  StackTag,
} from "@/components/ui/Atoms";
import { PROJECTS } from "@/data";
import { C, FONTS, RADIUS, SP } from "@/data/theme";

const { width } = Dimensions.get("window");
const CARD_W = width - SP.pagePad * 2;

const FILTERS = [
  { key: "all", label: "ALL" },
  { key: "client", label: "CLIENT" },
  { key: "public", label: "PUBLIC" },
];

export default function ProjectsScreen() {
  const [filter, setFilter] = useState("all");

  const filtered = PROJECTS.filter(
    (p) => filter === "all" || p.type === filter,
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <SectionNum num="02" />
        <Text style={styles.title}>SELECTED{"\n"}WORK</Text>
        <Text style={styles.subtitle}>
          Client projects and open-source builds — from dashboards to mobile
          apps.
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setFilter(f.key)}
            style={[
              styles.filterBtn,
              filter === f.key && styles.filterBtnActive,
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                filter === f.key && styles.filterTextActive,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <CyberDivider />

      {/* Projects */}
      {filtered.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const isPrivate = project.status === "Private";

  return (
    <GlowCard style={styles.card} cyanBorder={project.featured}>
      {/* Index + Status */}
      <View style={styles.cardTop}>
        <Text style={styles.cardIndex}>
          {String(index + 1).padStart(2, "0")}
        </Text>
        <View
          style={[
            styles.statusBadge,
            isPrivate ? styles.statusPrivate : styles.statusLive,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: isPrivate ? C.textSecondary : C.cyan },
            ]}
          >
            {project.status}
          </Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.cardTitle}>{project.title}</Text>
      <Text style={styles.cardSubtitle}>{project.subtitle}</Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Description */}
      <Text style={styles.cardDesc}>{project.description}</Text>

      {/* Stack Tags */}
      <View style={styles.tagRow}>
        {project.stack.map((tech) => (
          <StackTag key={tech} label={tech} />
        ))}
      </View>

      {/* Link */}
      {project.link && (
        <TouchableOpacity
          onPress={() => Linking.openURL(project.link!)}
          style={styles.linkBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.linkText}>LIVE DEMO →</Text>
        </TouchableOpacity>
      )}

      {isPrivate && (
        <View style={styles.lockRow}>
          <Text style={styles.lockText}>⚿ PRIVATE CLIENT PROJECT</Text>
        </View>
      )}
    </GlowCard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.void },
  content: { paddingHorizontal: SP.pagePad, paddingTop: 60, gap: 16 },

  header: { marginBottom: SP.lg },
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

  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: SP.md,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
    borderWidth: 0.5,
    borderColor: C.border,
  },
  filterBtnActive: {
    backgroundColor: C.cyanGlow,
    borderColor: C.cyanBorder,
  },
  filterText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: C.textMuted,
    letterSpacing: 2,
  },
  filterTextActive: { color: C.cyan },

  card: { gap: 10 },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardIndex: {
    fontFamily: FONTS.display,
    fontSize: 11,
    color: C.textMuted,
    letterSpacing: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    borderWidth: 0.5,
  },
  statusPrivate: {
    borderColor: C.border,
    backgroundColor: "transparent",
  },
  statusLive: {
    borderColor: C.cyanBorder,
    backgroundColor: C.cyanGlowSm,
  },
  statusText: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    letterSpacing: 1.5,
  },
  cardTitle: {
    fontFamily: FONTS.display,
    fontSize: 20,
    color: C.white,
    marginTop: 4,
  },
  cardSubtitle: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: C.textSecondary,
    letterSpacing: 1,
  },
  divider: {
    height: 0.5,
    backgroundColor: C.border,
    marginVertical: 4,
  },
  cardDesc: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: C.textSecondary,
    lineHeight: 21,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },
  linkBtn: {
    alignSelf: "flex-start",
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: C.cyanBorder,
    alignSelf: "stretch",
  },
  linkText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: C.cyan,
    letterSpacing: 2,
  },
  lockRow: { marginTop: 4 },
  lockText: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    color: C.textMuted,
    letterSpacing: 1.5,
  },
});
