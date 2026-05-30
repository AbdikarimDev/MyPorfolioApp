import { Dimensions } from "react-native";

export const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

// ─── COLORS ───────────────────────────────────────────────────────────────────
export const C = {
  void: "#02020a",
  void1: "#05050f",
  void2: "#0a0a1a",
  void3: "#0f0f22",

  cyan: "#00f0ff",
  cyanDim: "#00b8cc",
  cyanGlow: "rgba(0,240,255,0.15)",
  cyanGlowSm: "rgba(0,240,255,0.08)",
  cyanBorder: "rgba(0,240,255,0.25)",
  cyanBorderFull: "rgba(0,240,255,0.5)",

  surface: "rgba(255,255,255,0.04)",
  surfaceHover: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.08)",
  borderMed: "rgba(255,255,255,0.14)",

  white: "#ffffff",
  textPrimary: "#ffffff",
  textSecondary: "#8888aa",
  textMuted: "#44445a",
  textCyan: "#00f0ff",
};

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────
export const FONTS = {
  display: "Unbounded_700Bold",
  displayReg: "Unbounded_400Regular",
  mono: "IBMPlexMono_400Regular",
  monoMed: "IBMPlexMono_500Medium",
  body: "Syne_400Regular",
  bodyBold: "Syne_700Bold",
};

// ─── SPACING ──────────────────────────────────────────────────────────────────
export const SP = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  pagePad: 24,
};

// ─── ANIMATION ────────────────────────────────────────────────────────────────
export const DUR = {
  fast: 200,
  med: 350,
  slow: 600,
  xslow: 1000,
};

// ─── BORDER RADIUS ────────────────────────────────────────────────────────────
export const RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 100,
};