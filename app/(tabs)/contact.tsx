import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import { EMAILJS, PERSONAL } from "@/data";
import { C, FONTS, RADIUS, SP } from "@/data/theme";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactScreen() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("FILL ALL REQUIRED FIELDS");
      return;
    }
    setError(null);
    setSending(true);

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS.serviceId,
          template_id: EMAILJS.templateId,
          user_id: EMAILJS.publicKey,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject || "Portfolio Contact",
            message: form.message,
          },
        }),
      });

      if (res.ok) {
        setSent(true);
        setForm(INITIAL_FORM);
      } else {
        setError("TRANSMISSION FAILED — TRY AGAIN");
      }
    } catch (e) {
      setError("NETWORK ERROR — CHECK CONNECTION");
    } finally {
      setSending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <SectionNum num="05" />
          <Text style={styles.title}>LET'S{"\n"}CONNECT</Text>
          <Text style={styles.subtitle}>
            Open to freelance work, collaborations, and new opportunities.
          </Text>
        </View>

        {/* Status */}
        <GlowCard style={styles.statusCard} cyanBorder>
          <StatusDot label="CURRENTLY AVAILABLE FOR WORK" />
          <View style={styles.divider} />
          <View style={styles.emailRow}>
            <Label>DIRECT EMAIL</Label>
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:${PERSONAL.email}`)}
            >
              <Text style={styles.emailLink}>{PERSONAL.email}</Text>
            </TouchableOpacity>
          </View>
        </GlowCard>

        <CyberDivider label="SEND MESSAGE" />

        {/* Form */}
        {sent ? (
          <GlowCard style={styles.successCard} cyanBorder>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.successTitle}>MESSAGE SENT</Text>
            <Text style={styles.successSub}>
              Transmission received. I'll get back to you soon.
            </Text>
            <TouchableOpacity
              onPress={() => setSent(false)}
              style={styles.resetBtn}
            >
              <Text style={styles.resetText}>SEND ANOTHER →</Text>
            </TouchableOpacity>
          </GlowCard>
        ) : (
          <GlowCard style={styles.formCard}>
            {/* Name */}
            <View style={styles.fieldGroup}>
              <Label style={styles.fieldLabel}>NAME *</Label>
              <TextInput
                style={[
                  styles.input,
                  focused === "name" && styles.inputFocused,
                ]}
                value={form.name}
                onChangeText={(t) => setForm((f) => ({ ...f, name: t }))}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                placeholder="Your name"
                placeholderTextColor={C.textMuted}
                selectionColor={C.cyan}
              />
            </View>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Label style={styles.fieldLabel}>EMAIL *</Label>
              <TextInput
                style={[
                  styles.input,
                  focused === "email" && styles.inputFocused,
                ]}
                value={form.email}
                onChangeText={(t) => setForm((f) => ({ ...f, email: t }))}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="your@email.com"
                placeholderTextColor={C.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                selectionColor={C.cyan}
              />
            </View>

            {/* Subject */}
            <View style={styles.fieldGroup}>
              <Label style={styles.fieldLabel}>SUBJECT</Label>
              <TextInput
                style={[
                  styles.input,
                  focused === "subject" && styles.inputFocused,
                ]}
                value={form.subject}
                onChangeText={(t) => setForm((f) => ({ ...f, subject: t }))}
                onFocus={() => setFocused("subject")}
                onBlur={() => setFocused(null)}
                placeholder="Project inquiry, collaboration..."
                placeholderTextColor={C.textMuted}
                selectionColor={C.cyan}
              />
            </View>

            {/* Message */}
            <View style={styles.fieldGroup}>
              <Label style={styles.fieldLabel}>MESSAGE *</Label>
              <TextInput
                style={[
                  styles.input,
                  styles.textarea,
                  focused === "message" && styles.inputFocused,
                ]}
                value={form.message}
                onChangeText={(t) => setForm((f) => ({ ...f, message: t }))}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="Tell me about your project or idea..."
                placeholderTextColor={C.textMuted}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                selectionColor={C.cyan}
              />
            </View>

            {/* Error */}
            {error && <Text style={styles.errorText}>⚠ {error}</Text>}

            {/* Submit */}
            <TouchableOpacity
              onPress={handleSend}
              style={[styles.submitBtn, sending && styles.submitBtnDisabled]}
              activeOpacity={0.8}
              disabled={sending}
            >
              {sending ? (
                <ActivityIndicator size="small" color={C.cyan} />
              ) : (
                <Text style={styles.submitText}>TRANSMIT MESSAGE →</Text>
              )}
            </TouchableOpacity>
          </GlowCard>
        )}

        <CyberDivider label="SOCIALS" />

        {/* Social links */}
        <View style={styles.socialsGrid}>
          {[
            {
              label: "GITHUB",
              value: "AbdikarimDev",
              url: PERSONAL.links.github,
            },
            {
              label: "LINKEDIN",
              value: "abdikarim-dev",
              url: PERSONAL.links.linkedin,
            },
            {
              label: "TWITTER/X",
              value: "@AbdikarimD31284",
              url: PERSONAL.links.twitter,
            },
          ].map((s) => (
            <TouchableOpacity
              key={s.label}
              onPress={() => Linking.openURL(s.url)}
              style={styles.socialCard}
              activeOpacity={0.7}
            >
              <Label>{s.label}</Label>
              <Text style={styles.socialHandle}>{s.value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
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

  statusCard: { gap: 12 },
  divider: { height: 0.5, backgroundColor: C.border },
  emailRow: { gap: 6 },
  emailLink: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    color: C.cyan,
  },

  formCard: { gap: 16 },
  fieldGroup: { gap: 8 },
  fieldLabel: { fontSize: 9, letterSpacing: 2.5 },
  input: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    color: C.white,
    borderWidth: 0.5,
    borderColor: C.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  inputFocused: {
    borderColor: C.cyanBorder,
    backgroundColor: C.cyanGlowSm,
  },
  textarea: {
    minHeight: 120,
    paddingTop: 12,
  },
  errorText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: "#ff4444",
    letterSpacing: 1.5,
    marginTop: -8,
  },
  submitBtn: {
    backgroundColor: C.cyanGlow,
    borderWidth: 1,
    borderColor: C.cyanBorder,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  submitBtnDisabled: { opacity: 0.5 },
  submitText: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: C.cyan,
    letterSpacing: 2,
  },

  successCard: { alignItems: "center", gap: 12, paddingVertical: SP.xxl },
  successIcon: {
    fontFamily: FONTS.mono,
    fontSize: 32,
    color: C.cyan,
  },
  successTitle: {
    fontFamily: FONTS.display,
    fontSize: 20,
    color: C.white,
    letterSpacing: 3,
  },
  successSub: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: C.textSecondary,
    textAlign: "center",
    lineHeight: 21,
  },
  resetBtn: { marginTop: 8 },
  resetText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: C.cyan,
    letterSpacing: 2,
  },

  socialsGrid: { gap: 8 },
  socialCard: {
    backgroundColor: C.surface,
    borderWidth: 0.5,
    borderColor: C.border,
    borderRadius: RADIUS.lg,
    padding: SP.md,
    gap: 6,
  },
  socialHandle: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    color: C.textPrimary,
  },
});
