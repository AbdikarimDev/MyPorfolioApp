import {
  Image,
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
  Label,
  SectionNum,
  StatusDot,
} from "@/components/ui/Atoms";
import { EXPERIENCE, PERSONAL } from "@/data";
import { C, FONTS, RADIUS, SP } from "@/data/theme";

const QUICK_INFO = [
  { label: "ROLE", value: PERSONAL.role },
  { label: "EXPERIENCE", value: PERSONAL.experience },
  { label: "LOCATION", value: PERSONAL.location },
  { label: "STATUS", value: PERSONAL.status, isCyan: true },
  { label: "EMAIL", value: PERSONAL.email, isEmail: true },
];

const LINKS = [
  { label: "GITHUB", handle: "AbdikarimDev", url: PERSONAL.links.github },
  { label: "LINKEDIN", handle: "abdikarim-dev", url: PERSONAL.links.linkedin },
  { label: "TWITTER", handle: "@AbdikarimD31284", url: PERSONAL.links.twitter },
];

export default function AboutScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <SectionNum num="04" />
        <Text style={styles.title}>ABOUT{"\n"}ME</Text>
      </View>

      {/* Avatar + Status */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarRing} />
          <Image source={require("@/assets/Me.png")} resizeMode="contain" style={styles.avatar} />
        </View>
        <View style={styles.avatarInfo}>
          <Text style={styles.name}>{PERSONAL.name}</Text>
          <Text style={styles.role}>{PERSONAL.role}</Text> 
        </View>
      </View>

      <CyberDivider label="BIOGRAPHY" />

      {/* Bio */}
      <GlowCard style={styles.bioCard} glowTop>
        <Label style={{ color: C.cyan, marginBottom: 12 }}>WHO I AM</Label>
        <Text style={styles.bio}>{PERSONAL.bio}</Text>
      </GlowCard>

      <CyberDivider label="QUICK INFO" />

      {/* Info Grid */}
      <GlowCard>
        {QUICK_INFO.map((info, i) => (
          <View key={info.label}>
            <View style={styles.infoRow}>
              <Label>{info.label}</Label>
              {info.isEmail ? (
                <TouchableOpacity
                  onPress={() => Linking.openURL(`mailto:${info.value}`)}
                >
                  <Text style={styles.infoEmail}>{info.value}</Text>
                </TouchableOpacity>
              ) : (
                <Text
                  style={[styles.infoValue, info.isCyan && { color: C.cyan }]}
                >
                  {info.value}
                </Text>
              )}
            </View>
            {i < QUICK_INFO.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </GlowCard>

      <CyberDivider label="EXPERIENCE" />

      {/* Experience Timeline */}
      {EXPERIENCE.map((exp) => (
        <View key={exp.id} style={styles.expWrap}>
          {/* Timeline indicator */}
          <View style={styles.timeline}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineLine} />
          </View>

          <GlowCard style={styles.expCard} cyanBorder={exp.current}>
            {/* Period badge */}
            <View style={styles.expPeriodRow}>
              <Label style={{ color: C.cyan }}>{exp.period}</Label>
              {exp.current && (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentText}>CURRENT</Text>
                </View>
              )}
            </View>

            <Text style={styles.expRole}>{exp.role}</Text>
            <Text style={styles.expCompany}>{exp.company}</Text>

            <View style={styles.divider} />

            <Text style={styles.expDesc}>{exp.description}</Text>

            {/* Highlights */}
            <View style={styles.highlights}>
              {exp.highlights.map((h, i) => (
                <View key={i} style={styles.highlightRow}>
                  <Text style={styles.highlightDot}>▸</Text>
                  <Text style={styles.highlightText}>{h}</Text>
                </View>
              ))}
            </View>
          </GlowCard>
        </View>
      ))}

      <CyberDivider label="FIND ME" />

      {/* Social Links */}
      <View style={styles.linksCol}>
        {LINKS.map((link) => (
          <TouchableOpacity
            key={link.label}
            onPress={() => Linking.openURL(link.url)}
            style={styles.linkCard}
            activeOpacity={0.7}
          >
            <View>
              <Label>{link.label}</Label>
              <Text style={styles.linkHandle}>{link.handle}</Text>
            </View>
            <Text style={styles.linkArrow}>→</Text>
          </TouchableOpacity>
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

  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: SP.lg,
    marginBottom: SP.md,
  },
  avatarWrap: {
    position: "relative",
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarRing: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: C.cyanBorder,
  },
  avatar: {
    width: 120,
    height: 120, 
  },
  avatarInfo: { flex: 1, gap: 4 },
  name: {
    fontFamily: FONTS.display,
    fontSize: 18,
    color: C.white,
    letterSpacing: 2,
  },
  role: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: C.textSecondary,
    letterSpacing: 1,
    marginBottom: 4,
  },

  bioCard: { gap: 0 },
  bio: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: C.textSecondary,
    lineHeight: 24,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoValue: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: C.textPrimary,
  },
  infoEmail: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: C.cyan,
  },
  divider: { height: 0.5, backgroundColor: C.border },

  // Experience
  expWrap: {
    flexDirection: "row",
    gap: SP.md,
    marginBottom: SP.lg,
  },
  timeline: {
    alignItems: "center",
    width: 12,
    paddingTop: SP.lg,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.cyan,
    marginBottom: 4,
  },
  timelineLine: {
    flex: 1,
    width: 0.5,
    backgroundColor: C.cyanBorder,
  },
  expCard: { flex: 1, gap: 8 },
  expPeriodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentBadge: {
    backgroundColor: C.cyanGlowSm,
    borderWidth: 0.5,
    borderColor: C.cyanBorder,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  currentText: {
    fontFamily: FONTS.mono,
    fontSize: 8,
    color: C.cyan,
    letterSpacing: 1.5,
  },
  expRole: {
    fontFamily: FONTS.display,
    fontSize: 15,
    color: C.white,
    lineHeight: 22,
  },
  expCompany: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: C.textSecondary,
    letterSpacing: 1,
  },
  expDesc: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: C.textSecondary,
    lineHeight: 21,
  },
  highlights: { gap: 6, marginTop: 4 },
  highlightRow: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  highlightDot: { color: C.cyan, fontSize: 10, marginTop: 3 },
  highlightText: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: C.textSecondary,
    flex: 1,
    lineHeight: 20,
  },

  // Links
  linksCol: { gap: 8 },
  linkCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: C.surface,
    borderWidth: 0.5,
    borderColor: C.border,
    borderRadius: RADIUS.lg,
    padding: SP.md,
  },
  linkHandle: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    color: C.textPrimary,
    marginTop: 4,
  },
  linkArrow: {
    fontFamily: FONTS.mono,
    fontSize: 16,
    color: C.cyan,
  },
});
