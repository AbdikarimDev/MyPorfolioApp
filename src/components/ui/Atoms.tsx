import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { C, FONTS, RADIUS, SP } from "../../data/theme";

// ─── LABEL (mono, uppercase, tracked) ────────────────────────────────────────
interface LabelProps {
  children: string;
  color?: string;
  style?: TextStyle;
}
export const Label = ({ children, color = C.textSecondary, style }: LabelProps) => (
  <Text style={[styles.label, { color }, style]}>{children}</Text>
);

// ─── CYBER DIVIDER ────────────────────────────────────────────────────────────
interface DividerProps {
  label?: string;
  style?: ViewStyle;
}
export const CyberDivider = ({ label, style }: DividerProps) => (
  <View style={[styles.dividerRow, style]}>
    <View style={styles.dividerLine} />
    {label && (
      <>
        <Label style={styles.dividerLabel}>{label}</Label>
        <View style={styles.dividerLine} />
      </>
    )}
  </View>
);

// ─── GLOW CARD ────────────────────────────────────────────────────────────────
interface GlowCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glowTop?: boolean;
  cyanBorder?: boolean;
}
export const GlowCard = ({ children, style, glowTop, cyanBorder }: GlowCardProps) => (
  <View
    style={[
      styles.glowCard,
      cyanBorder && styles.glowCardCyan,
      glowTop && styles.glowCardTop,
      style,
    ]}
  >
    {children}
  </View>
);

// ─── STACK TAG ────────────────────────────────────────────────────────────────
interface TagProps {
  label: string;
  style?: ViewStyle;
}
export const StackTag = ({ label, style }: TagProps) => (
  <View style={[styles.tag, style]}>
    <Text style={styles.tagText}>{label}</Text>
  </View>
);

// ─── SECTION NUMBER ───────────────────────────────────────────────────────────
interface SectionNumProps {
  num: string;
}
export const SectionNum = ({ num }: SectionNumProps) => (
  <Text style={styles.sectionNum}>{num}</Text>
);

// ─── STATUS DOT ───────────────────────────────────────────────────────────────
interface StatusDotProps {
  active?: boolean;
  label?: string;
}
export const StatusDot = ({ active = true, label }: StatusDotProps) => (
  <View style={styles.statusRow}>
    <View style={[styles.dot, active ? styles.dotActive : styles.dotInactive]} />
    {label && <Label style={styles.statusLabel}>{label}</Label>}
  </View>
);

// ─── CYAN LINE (accent) ───────────────────────────────────────────────────────
export const CyanLine = ({ style }: { style?: ViewStyle }) => (
  <View style={[styles.cyanLine, style]} />
);

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
interface ProgressProps {
  value: number; // 0-100
  style?: ViewStyle;
}
export const CyberProgress = ({ value, style }: ProgressProps) => (
  <View style={[styles.progressTrack, style]}>
    <LinearGradient
      colors={[C.cyan, C.cyanDim]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.progressFill, { width: `${value}%` as any }]}
    />
  </View>
);

const styles = StyleSheet.create({
  label: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: C.textSecondary,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: SP.lg,
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: C.border,
  },
  dividerLabel: {
    fontSize: 9,
    letterSpacing: 4,
    color: C.textMuted,
  },
  glowCard: {
    backgroundColor: C.surface,
    borderWidth: 0.5,
    borderColor: C.border,
    borderRadius: RADIUS.lg,
    padding: SP.lg,
  },
  glowCardCyan: {
    borderColor: C.cyanBorder,
  },
  glowCardTop: {
    borderTopWidth: 1,
    borderTopColor: C.cyanBorder,
  },
  tag: {
    backgroundColor: "rgba(0,240,255,0.08)",
    borderWidth: 0.5,
    borderColor: C.cyanBorder,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: C.cyan,
    letterSpacing: 0.5,
  },
  sectionNum: {
    fontFamily: FONTS.display,
    fontSize: 11,
    color: C.cyanBorder,
    letterSpacing: 2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: C.cyan,
  },
  dotInactive: {
    backgroundColor: C.textMuted,
  },
  statusLabel: {
    color: C.cyan,
    fontSize: 10,
  },
  cyanLine: {
    height: 1,
    backgroundColor: C.cyanBorder,
    width: 40,
  },
  progressTrack: {
    height: 2,
    backgroundColor: C.border,
    borderRadius: 1,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 1,
  },
});