export type Skill = { name: string; icon: string; category: SkillCategory };

export type SkillCategory =
  | "Languages"
  | "Web & Database"
  | "Game Development"
  | "Mobile"
  | "Broadcast & Systems"
  | "Design & Tools";

const dev = (slug: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`;
const si = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

export const SKILLS: Skill[] = [
  { category: "Languages", name: "Java", icon: dev("java") },
  { category: "Languages", name: "C#", icon: dev("csharp") },
  { category: "Languages", name: "JavaScript", icon: dev("javascript") },
  { category: "Languages", name: "Python", icon: dev("python") },
  { category: "Languages", name: "PHP", icon: dev("php") },
  { category: "Languages", name: "SQL", icon: si("sqlite") },

  { category: "Web & Database", name: "HTML5", icon: dev("html5") },
  { category: "Web & Database", name: "CSS3", icon: dev("css3") },
  { category: "Web & Database", name: "MySQL", icon: dev("mysql") },
  { category: "Web & Database", name: "Full-Stack Web", icon: si("htmx") },
  { category: "Web & Database", name: "Groq AI API", icon: si("groq") },

  { category: "Game Development", name: "Unity", icon: dev("unity") },
  { category: "Game Development", name: "Unity 2D/3D", icon: dev("unity") },
  { category: "Game Development", name: "Game Design", icon: si("unity") },

  { category: "Mobile", name: "Kotlin", icon: dev("kotlin") },
  { category: "Mobile", name: "Android Studio", icon: dev("androidstudio") },
  { category: "Mobile", name: "Android", icon: dev("android") },

  { category: "Broadcast & Systems", name: "vMix", icon: si("livestream") },
  { category: "Broadcast & Systems", name: "OBS Studio", icon: si("obsstudio") },
  { category: "Broadcast & Systems", name: "iNEWS", icon: si("windows") },
  { category: "Broadcast & Systems", name: "Radmin", icon: si("anydesk") },

  { category: "Design & Tools", name: "Figma", icon: dev("figma") },
  { category: "Design & Tools", name: "Git", icon: dev("git") },
  { category: "Design & Tools", name: "Microsoft Excel", icon: si("microsoftexcel") },
  { category: "Design & Tools", name: "Microsoft Office", icon: si("microsoft") },
];

export const CATEGORIES: SkillCategory[] = [
  "Languages",
  "Web & Database",
  "Game Development",
  "Mobile",
  "Broadcast & Systems",
  "Design & Tools",
];
