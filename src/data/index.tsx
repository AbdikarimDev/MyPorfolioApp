// ─── PERSONAL ───────────────────────────────────────────────────────────────
export const PERSONAL = {
  name: "Abdikarim",
  fullName: "Abdikarim",
  role: "Frontend Developer",
  tagline: "Building interfaces that live at the edge of design and technology.",
  status: "Open to work",
  experience: "1+ Year",
  location: "Somalia",
  email: "abdikarim.dev01@gmail.com",
  links: {
    github: "https://github.com/AbdikarimDev",
    linkedin: "https://linkedin.com/in/abdikarim-dev-b6a94b388",
    twitter: "https://x.com/AbdikarimD31284",
  },
  bio: "I craft pixel-perfect, performant frontend experiences. From dashboards to mobile apps — I bridge design systems and real-world functionality with React, Vue 3, React Native, and TypeScript.",
  bioShort: "Frontend Developer crafting pixel-perfect, performant interfaces with React, Vue 3, and React Native.",
};

// ─── EMAILJS ─────────────────────────────────────────────────────────────────
export const EMAILJS = {
  serviceId: "service_xgiqm6j",
  templateId: "template_3ooghfz",
  publicKey: "kr4s2Oa78VlQNVqCR",
};

// ─── SKILLS ──────────────────────────────────────────────────────────────────
export const SKILLS = [
  // Core
  { name: "React", category: "framework", level: 90 },
  { name: "Vue 3", category: "framework", level: 85 },
  { name: "React Native", category: "mobile", level: 82 },
  { name: "TypeScript", category: "language", level: 80 },
  { name: "JavaScript", category: "language", level: 92 },

  // Styling & UI
  { name: "Tailwind CSS", category: "styling", level: 92 },
  { name: "HTML / CSS", category: "styling", level: 95 },
  { name: "NativeWind", category: "styling", level: 78 },

  // Backend & Tools
  { name: "Firebase", category: "backend", level: 80 },
  { name: "Laravel", category: "backend", level: 65 },
  { name: "Pinia", category: "state", level: 82 },
  { name: "Figma", category: "design", level: 75 },
  { name: "Git / GitHub", category: "tooling", level: 85 },
  { name: "Vite", category: "tooling", level: 80 },
  { name: "Postman", category: "tooling", level: 72 },
];

export const SKILL_CATEGORIES = [
  { key: "all", label: "ALL" },
  { key: "framework", label: "FRAMEWORK" },
  { key: "mobile", label: "MOBILE" },
  { key: "language", label: "LANGUAGE" },
  { key: "styling", label: "STYLING" },
  { key: "backend", label: "BACKEND" },
  { key: "tooling", label: "TOOLING" },
];

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
export const PROJECTS = [
  // Featured (Client)
  {
    id: "client-dashboard",
    title: "Client Dashboard",
    subtitle: "Metrics & Contributions Manager",
    description:
      "Full CRUD dashboard with real-time Firebase sync, filterable history, and secure authentication. Built for internal client operations.",
    stack: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
    type: "client",
    featured: true,
    status: "Private",
    image: require("@/assets/projects/client-dashboard.png"),
  },
  {
    id: "dailytrack",
    title: "DailyTrack",
    subtitle: "Expense & Inventory System",
    description:
      "Real-time tracking system with full CRUD, dynamic filters, live cost totals, dark mode, and fully responsive layout.",
    stack: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
    type: "client",
    featured: true,
    status: "Private",
    image: require("@/assets/projects/dailyTrack.png"),
  },
  {
    id: "freshbowl",
    title: "FreshBowl",
    subtitle: "Mobile App UI/UX",
    description:
      "End-to-end food ordering mobile app with onboarding flow, checkout, and order tracking — designed in Figma, built in React Native.",
    stack: ["React Native", "TypeScript", "Tailwind CSS", "Figma"],
    type: "client",
    featured: true,
    status: "Private",
    image: require("@/assets/projects/freshbowl.jpg"),
  },
  // Public
  {
    id: "novapos",
    title: "NovaPOS",
    subtitle: "Point of Sale System",
    description:
      "Browser-based POS with product catalog, cart management, transaction history, and Firebase sync.",
    stack: ["Vue 3", "Firebase", "Tailwind CSS"],
    type: "public",
    featured: false,
    status: "Live",
    link: "https://calculation-proj.vercel.app",
    image: require("@/assets/projects/novapos.png"),
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    subtitle: "Real-Time Task Manager",
    description:
      "Persistent cross-device task manager with favorites, instant Firebase updates, and Pinia state management.",
    stack: ["Vue 3", "Pinia", "Firebase", "Tailwind CSS"],
    type: "public",
    featured: false,
    status: "Live",
    link: "https://pinia-todo-list-three.vercel.app",
    image: require("@/assets/projects/taskflow.png"),
  },
  {
    id: "moshify",
    title: "Moshify",
    subtitle: "SaaS Landing Page",
    description:
      "Production-level SaaS site rebuild — responsive layout, clean component architecture, performance-focused.",
    stack: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
    type: "public",
    featured: false,
    status: "Live",
    link: "https://moshify-tau.vercel.app",
    image: require("@/assets/projects/moshify.png"),
  },
  {
    id: "whitepace",
    title: "Whitepace",
    subtitle: "SaaS Landing Page UI",
    description:
      "Modern responsive marketing page with mobile navigation and well-structured content hierarchy.",
    stack: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
    type: "public",
    featured: false,
    status: "Live",
    link: "https://whitespace12.vercel.app",
    image: require("@/assets/projects/whitepace.png"),
  },
];

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    id: "freelance",
    role: "Freelance Frontend Developer",
    company: "Self-Employed",
    period: "2024 — Present",
    duration: "1+ Year",
    description:
      "Building full-stack frontend solutions for clients — dashboards, mobile apps, and marketing sites. Handling everything from design system to deployment.",
    highlights: [
      "Delivered 3 client projects from concept to production",
      "Specialized in React, Vue 3, Firebase, and React Native",
      "End-to-end: Figma design → responsive implementation",
    ],
    current: true,
  },
];

// ─── NAV TABS ─────────────────────────────────────────────────────────────────
export const NAV_TABS = [
  { key: "home", label: "HOME", icon: "home" },
  { key: "projects", label: "WORK", icon: "grid" },
  { key: "skills", label: "STACK", icon: "cpu" },
  { key: "about", label: "ABOUT", icon: "user" },
  { key: "contact", label: "CONTACT", icon: "mail" },
];