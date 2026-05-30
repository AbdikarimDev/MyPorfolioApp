/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        void: "#02020a",
        "void-1": "#05050f",
        "void-2": "#0a0a1a",
        "void-3": "#0f0f22",
        cyan: {
          DEFAULT: "#00f0ff",
          dim: "#00b8cc",
          glow: "rgba(0,240,255,0.15)",
          "glow-sm": "rgba(0,240,255,0.08)",
        },
        surface: {
          DEFAULT: "rgba(255,255,255,0.04)",
          hover: "rgba(255,255,255,0.07)",
          border: "rgba(255,255,255,0.08)",
          "border-cyan": "rgba(0,240,255,0.25)",
        },
        text: {
          primary: "#ffffff",
          secondary: "#8888aa",
          muted: "#44445a",
          cyan: "#00f0ff",
        },
      },
      fontFamily: {
        unbounded: ["Unbounded_700Bold"],
        "unbounded-regular": ["Unbounded_400Regular"],
        mono: ["IBMPlexMono_400Regular"],
        "mono-medium": ["IBMPlexMono_500Medium"],
        syne: ["Syne_400Regular"],
        "syne-bold": ["Syne_700Bold"],
      },
      fontSize: {
        "hero": [48, { lineHeight: 52, letterSpacing: -1 }],
        "hero-sm": [32, { lineHeight: 38, letterSpacing: -0.5 }],
        "section": [28, { lineHeight: 34 }],
        "card-title": [18, { lineHeight: 24 }],
        "label": [10, { lineHeight: 16, letterSpacing: 3 }],
        "mono-sm": [11, { lineHeight: 16 }],
        "mono-md": [13, { lineHeight: 20 }],
      },
      spacing: {
        "screen": "100%",
        "18": 72,
        "22": 88,
      },
      borderWidth: {
        "0.5": 0.5,
      },
    },
  },
  plugins: [],
};