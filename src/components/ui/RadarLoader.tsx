import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { C, FONTS } from "../../data/theme";

const { width } = Dimensions.get("window");
const SIZE = Math.min(width * 0.6, 220);

interface RadarLoaderProps {
  onComplete: () => void;
}

export default function RadarLoader({ onComplete }: RadarLoaderProps) {
  const sweep = useRef(new Animated.Value(0)).current;
  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const ring3 = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sweep rotation
    Animated.loop(
      Animated.timing(sweep, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Ring pulses staggered
    const pulseRing = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 1200,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 800,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      ).start();

    pulseRing(ring1, 0);
    pulseRing(ring2, 400);
    pulseRing(ring3, 800);

    // Progress bar fill + fade out
    Animated.sequence([
      Animated.timing(progress, {
        toValue: 1,
        duration: 2400,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => onComplete());
  }, []);

  const spin = sweep.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const makeRingStyle = (anim: Animated.Value, radius: number) => ({
    position: "absolute" as const,
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    borderWidth: 0.5,
    borderColor: C.cyan,
    opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0.06] }),
    top: SIZE / 2 - radius,
    left: SIZE / 2 - radius,
  });

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      {/* Radar circle */}
      <View style={[styles.radarWrap, { width: SIZE, height: SIZE }]}>
        {/* Static rings */}
        {[0.3, 0.55, 0.8].map((ratio, i) => (
          <View
            key={i}
            style={[
              styles.staticRing,
              {
                width: SIZE * ratio,
                height: SIZE * ratio,
                borderRadius: (SIZE * ratio) / 2,
                top: SIZE / 2 - (SIZE * ratio) / 2,
                left: SIZE / 2 - (SIZE * ratio) / 2,
              },
            ]}
          />
        ))}

        {/* Pulse rings */}
        <Animated.View style={makeRingStyle(ring1, SIZE * 0.42)} />
        <Animated.View style={makeRingStyle(ring2, SIZE * 0.42)} />
        <Animated.View style={makeRingStyle(ring3, SIZE * 0.42)} />

        {/* Sweep arm */}
        <Animated.View
          style={[
            styles.sweepArm,
            { width: SIZE / 2, height: SIZE / 2, transform: [{ rotate: spin }] },
          ]}
        >
          <View style={styles.sweepLine} />
        </Animated.View>

        {/* Center dot */}
        <View style={styles.centerDot} />

        {/* Crosshair lines */}
        <View style={[styles.crossH, { width: SIZE, top: SIZE / 2 }]} />
        <View style={[styles.crossV, { height: SIZE, left: SIZE / 2 }]} />
      </View>

      {/* Identity */}
      <Text style={styles.name}>ABDIKARIM</Text>
      <Text style={styles.role}>FRONTEND DEVELOPER</Text>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
      </View>
      <Text style={styles.progressLabel}>INITIALIZING PORTFOLIO SYSTEMS</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.void,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  radarWrap: {
    position: "relative",
    marginBottom: 8,
  },
  staticRing: {
    position: "absolute",
    borderWidth: 0.5,
    borderColor: "rgba(0,240,255,0.12)",
  },
  sweepArm: {
    position: "absolute",
    top: SIZE / 2,
    left: SIZE / 2,
    transformOrigin: "0% 0%",
  },
  sweepLine: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 1,
    backgroundColor: C.cyan,
    opacity: 0.7,
  },
  centerDot: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.cyan,
    top: SIZE / 2 - 3,
    left: SIZE / 2 - 3,
  },
  crossH: {
    position: "absolute",
    height: 0.5,
    backgroundColor: "rgba(0,240,255,0.08)",
  },
  crossV: {
    position: "absolute",
    width: 0.5,
    backgroundColor: "rgba(0,240,255,0.08)",
    top: 0,
  },
  name: {
    fontFamily: FONTS.display,
    fontSize: 20,
    color: C.white,
    letterSpacing: 6,
  },
  role: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    color: C.cyan,
    letterSpacing: 4,
  },
  progressTrack: {
    width: 200,
    height: 1.5,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 1,
    overflow: "hidden",
    marginTop: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: C.cyan,
    borderRadius: 1,
  },
  progressLabel: {
    fontFamily: FONTS.mono,
    fontSize: 8,
    color: C.textMuted,
    letterSpacing: 2,
    marginTop: 4,
  },
});