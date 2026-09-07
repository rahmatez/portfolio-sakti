export type PortfolioProject = {
  name: string;
  category: string;
  stack: string[];
  description: string;
  highlights: string[];
  image?: string;
};

export const PROJECTS: PortfolioProject[] = [
  {
    name: "ACTONT",
    category: "Community Service Desktop App",
    stack: ["Java", "Scene Builder"],
    description:
      "A community-service application that connects citizens with volunteer communities to coordinate environmental initiatives in areas needing attention.",
    highlights: [
      "Environmental project reporting and location tracking",
      "Equipment requests, activity scheduling, and donation support",
    ],
  },
  {
    name: "Story",
    category: "Tourism & Culture Web Platform",
    stack: ["HTML", "PHP", "JavaScript", "MySQL"],
    description:
      "A web platform for discovering tourism villages in Yogyakarta, exploring destination details, and sharing reviews and ratings.",
    highlights: [
      "Destination, culinary, and tourism-package discovery",
      "Interactive categorization and review workflows",
    ],
    image: "/projects/story.png",
  },
  {
    name: "GlowRX",
    category: "Skincare Management & AI Analytics",
    stack: ["PHP", "CSS", "JavaScript", "MySQL", "Groq AI"],
    description:
      "A skincare business management platform combining sales analytics, financial reporting, and an AI-powered product recommendation chatbot.",
    highlights: [
      "AI recommendations based on market and consumer data",
      "Sales dashboard, chatbot, and financial reporting",
    ],
    image: "/projects/glowrx.png",
  },
  {
    name: "Clash Arena: Win or Die",
    category: "2D Multiplayer Fighting Game",
    stack: ["Unity", "C#"],
    description:
      "A local 1v1 fighting game with full controller support and multiple arenas featuring distinct environmental hazards.",
    highlights: [
      "Local multiplayer combat mechanics",
      "Jungle, underground, frozen, and chainfire arenas",
    ],
    image: "/projects/clash-arena.png",
  },
  {
    name: "Kisah Teladan Rasul",
    category: "Android Educational Game",
    stack: ["Unity", "C#", "Android"],
    description:
      "A game-based learning experience that helps elementary students understand exemplary character traits through interactive stories and decisions.",
    highlights: [
      "Modules for Shidiq, Tabligh, Fathonah, and Amanah",
      "Scenario-based choices and a final evaluation",
    ],
    image: "/projects/kisah-teladan-rasul.png",
  },
  {
    name: "Ayo Belajar!",
    category: "Inclusive Mobile App Design",
    stack: ["Figma", "UI/UX"],
    description:
      "An accessible learning application concept for children with speech and hearing impairments, aligned with Kurikulum Merdeka 2022.",
    highlights: [
      "Multi-sensory lessons and therapy support tools",
      "Accessible discussion features and offline mode",
    ],
  },
  {
    name: "E-Cycle",
    category: "Campus Second-Hand Marketplace",
    stack: ["Kotlin", "Java", "Android Studio"],
    description:
      "A peer-to-peer mobile marketplace where university students can buy and sell second-hand items within their campus community.",
    highlights: [
      "Listings, search, categorization, and user ratings",
      "Direct transactions supporting affordability and reuse",
    ],
  },
];
