import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "wouter";
import { Code, MessageCircle, Linkedin, ExternalLink, ArrowRight, GraduationCap, Briefcase, FileText, Download, Phone, Award, Users } from "lucide-react";
import { usePageMeta } from "../lib/seo";
import { SKILLS, CATEGORIES, type SkillCategory } from "../lib/skills";
import { RESUME_PATH, RESUME_FILENAME } from "../lib/resume";
import { PROJECTS } from "../lib/projects";
import "./portfolio.css";

const MARQUEE_ITEMS = [
  "Software Development", "Web Systems", "Game Development", "Android Applications", "IT Broadcast",
  "Unity • C#", "Java • Kotlin", "PHP • MySQL", "Interactive Experiences", "Structured Problem Solving",
  "Universitas Islam Indonesia", "Fast Learner", "Cross-functional Collaboration", "Technology for Impact",
  "Software Development", "Web Systems", "Game Development", "Android Applications", "IT Broadcast",
  "Unity • C#", "Java • Kotlin", "PHP • MySQL", "Interactive Experiences", "Structured Problem Solving",
  "Universitas Islam Indonesia", "Fast Learner", "Cross-functional Collaboration", "Technology for Impact"
];

const MINI_MARQUEE = [
  "Java", "C#", "Unity", "Kotlin", "Android", "PHP", "JavaScript", "MySQL", "Figma", "vMix", "OBS", "Python",
  "Java", "C#", "Unity", "Kotlin", "Android", "PHP", "JavaScript", "MySQL", "Figma", "vMix", "OBS", "Python"
];

const TONE_CYCLE = ["cyan", "red", "gold", "violet", "steel"] as const;

const TERMINAL_LINES = [
  "> whoami",
  "Sakti Chandra Hanafi",
  "",
  "> education",
  "Bachelor of Informatics @ Universitas Islam Indonesia",
  "",
  "> role",
  "Software Developer",
  "",
  "> currently",
  "Working with IT Broadcast & Core Systems at CNN Indonesia",
  "",
  "> stack",
  "Java • C# • Unity • Kotlin • PHP • MySQL",
  "",
  "> hobbies",
  "Building systems • Game development • Mentoring",
  "",
  "> mission",
  "Create technology that delivers measurable real-world impact.",
  "",
  "> status",
  "Open to software and technology opportunities."
];

type JourneyEntry = {
  kind: "education" | "work";
  logo: string;
  title: string;
  org: string;
  url: string;
  period: string;
  status: "current" | "completed";
  detail: string;
  tags: string[];
};

const JOURNEY: JourneyEntry[] = [
  {
    kind: "work",
    logo: "/brand-mark.svg",
    title: "Internship Development Program — IT Broadcast & Core System",
    org: "CNN Indonesia",
    url: "https://www.cnnindonesia.com/",
    period: "Aug 2026 — Present",
    status: "current",
    detail: "Operating vMix for broadcast production, managing technical setup requests and iNEWS access, and supporting workstations remotely with Radmin.",
    tags: ["vMix", "iNEWS", "Radmin", "Broadcast Systems"],
  },
  {
    kind: "work",
    logo: "/brand-mark.svg",
    title: "Undergraduate Researcher",
    org: "Universitas Islam Indonesia",
    url: "https://www.uii.ac.id/",
    period: "Jul 2025 — Mar 2026",
    status: "completed",
    detail: "Contributed to an Android educational-game research project through data collection, ADDIE-based development, and evaluation using N-Gain and System Usability Scale.",
    tags: ["Research", "Unity", "ADDIE", "SUS"],
  },
  {
    kind: "work",
    logo: "/brand-mark.svg",
    title: "Student Staff — Game Development",
    org: "Universitas Islam Indonesia",
    url: "https://www.uii.ac.id/",
    period: "Feb 2025 — Jul 2025",
    status: "completed",
    detail: "Mentored 31 students across Unity 2D fundamentals, movement, timers, scene transitions, sound, and Android game components.",
    tags: ["Mentoring", "Unity 2D", "C#", "Leadership"],
  },
  {
    kind: "work",
    logo: "/brand-mark.svg",
    title: "Intern — Communication Sales & Marketing",
    org: "PT Indosat Tbk",
    url: "https://ioh.co.id/",
    period: "Jan 2024 — Mar 2024",
    status: "completed",
    detail: "Supported partnership outreach, promotional events, marketing analysis, and sales activity reporting across Yogyakarta.",
    tags: ["Marketing", "Outreach", "Events", "Reporting"],
  },
  {
    kind: "education",
    logo: "/brand-mark.svg",
    title: "Bachelor of Informatics (S.Kom.)",
    org: "Universitas Islam Indonesia",
    url: "https://www.uii.ac.id/",
    period: "Sep 2022 — May 2026",
    status: "completed",
    detail: "Graduated in Informatics with a 3.63/4.00 GPA, developing a foundation across software, web systems, mobile applications, and game development.",
    tags: ["GPA 3.63", "Informatics", "Software Development"],
  },
];

const OSS_PRS: any[] = [];

function useCounter(target: number, suffix: string, isVisible: boolean): string {
  const [val, setVal] = useState("0" + suffix);
  const started = useRef(false);
  const prevTarget = useRef(target);

  useEffect(() => {
    if (!isVisible) return;
    if (started.current && prevTarget.current === target) return;
    started.current = true;
    prevTarget.current = target;

    const duration = 1800;
    let startTs: number | null = null;
    let raf: number;
    function step(ts: number) {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target) + suffix);
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, target, suffix]);
  return val;
}

function MetricCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const numMatch = value.match(/^(\d+)(.*)$/);
  const num = numMatch ? parseInt(numMatch[1]) : 0;
  const suffix = numMatch ? numMatch[2] : "";
  const isStatic = !numMatch;
  const counted = useCounter(num, suffix, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => { setVisible(true); setRevealed(true); }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="pf-metric-card"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <span className="pf-metric-value">{isStatic ? value : counted}</span>
      <span className="pf-metric-label">{label}</span>
    </div>
  );
}

function ProjectShowcase() {
  return (
    <div className="pf-project-showcase">
      <div className="pf-project-list">
        {PROJECTS.slice(0, 5).map((p, i) => {
          const tone = TONE_CYCLE[i % TONE_CYCLE.length];
          const index = String(i + 1).padStart(2, "0");
          return (
            <article
              key={p.name}
              className="pf-project-row"
              data-tone={tone}
              data-reveal="true"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="pf-project-index">{index}</span>
              <div className="pf-project-main">
                <span className="pf-project-eyebrow">{p.category}</span>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="pf-project-tags">
                  {p.stack.slice(0, 4).map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
              {p.image && (
                <img
                  className="pf-project-image"
                  src={p.image}
                  alt={`${p.name} project preview`}
                  loading="lazy"
                />
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function SkillCarousel() {
  const [filter, setFilter] = useState<SkillCategory | "All">("All");
  const filtered = filter === "All" ? SKILLS : SKILLS.filter((s) => s.category === filter);
  const loop = [...filtered, ...filtered];

  return (
    <div className="pf-skill-deck">
      <div className="pf-skill-filters" data-reveal="true">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            type="button"
            className={`pf-skill-filter${filter === c ? " is-active" : ""}`}
            onClick={() => setFilter(c)}
            data-cursor-link
          >
            {c}
          </button>
        ))}
      </div>
      <div className="pf-skill-carousel" data-reveal="true">
        <div className="pf-skill-carousel-track" key={filter}>
          {loop.map((s, i) => {
            const duplicate = i >= filtered.length;
            return (
            <div key={`${s.name}-${i}`} className="pf-skill-chip" title={s.name} aria-hidden={duplicate}>
              <div className="pf-skill-chip-icon">
                <img
                  src={s.icon}
                  alt={duplicate ? "" : s.name}
                  width={48}
                  height={48}
                  draggable={false}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0.25";
                  }}
                />
              </div>
              <span className="pf-skill-chip-name">{s.name}</span>
              <span className="pf-skill-chip-cat">{s.category}</span>
            </div>
          )})}
        </div>
      </div>
      <div className="pf-skill-carousel pf-skill-carousel-reverse" data-reveal="true" aria-hidden="true">
        <div className="pf-skill-carousel-track pf-skill-carousel-track-reverse" key={`r-${filter}`}>
          {[...loop].reverse().map((s, i) => (
            <div key={`r-${s.name}-${i}`} className="pf-skill-chip pf-skill-chip-mini">
              <div className="pf-skill-chip-icon">
                <img
                  src={s.icon}
                  alt=""
                  width={36}
                  height={36}
                  draggable={false}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0.25";
                  }}
                />
              </div>
              <span className="pf-skill-chip-name">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function JourneyTimeline() {
  return (
    <div className="pf-journey">
      <div className="pf-journey-spine" aria-hidden="true" />
      {JOURNEY.map((j, i) => (
        <article
          key={`${j.org}-${j.period}`}
          className={`pf-journey-entry pf-journey-${j.kind}${j.status === "current" ? " is-current" : ""}`}
          data-reveal="true"
          style={{ transitionDelay: `${i * 0.08}s` }}
        >
          <div className="pf-journey-node" aria-hidden="true">
            {j.kind === "education" ? <GraduationCap size={14} /> : <Briefcase size={14} />}
          </div>
          <div className="pf-journey-period">
            <span>{j.period}</span>
            {j.status === "current" && <span className="pf-journey-current-dot" />}
          </div>
          <a
            href={j.url}
            target="_blank"
            rel="noreferrer"
            className="pf-journey-card"
            data-cursor-link
          >
            <div className="pf-journey-card-head">
              <div className="pf-journey-logo">
                <img src={j.logo} alt={j.org} draggable={false} />
              </div>
              <div className="pf-journey-meta">
                <span className="pf-journey-kind">{j.kind === "education" ? "Education" : "Work"}</span>
                <h3 className="pf-journey-title">{j.title}</h3>
                <span className="pf-journey-org">{j.org}</span>
              </div>
              <ExternalLink size={14} className="pf-journey-link-icon" />
            </div>
            <p className="pf-journey-detail">{j.detail}</p>
            <div className="pf-journey-tags">
              {j.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState<boolean[]>(Array(TERMINAL_LINES.length).fill(false));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          TERMINAL_LINES.forEach((_, i) => {
            setTimeout(() => {
              setRevealed((prev) => { const n = [...prev]; n[i] = true; return n; });
            }, 120 + i * 160);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="pf-terminal-panel" data-reveal="true">
      <div className="pf-terminal-topline">
        <Code size={16} aria-hidden="true" />
        <span>SAKTI_CONSOLE</span>
      </div>
      <div className="pf-terminal-lines">
        {TERMINAL_LINES.map((line, i) => (
          <span key={i} className={`pf-terminal-line${revealed[i] ? " is-visible" : ""}`}>
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      onDone();
      return;
    }

    let start: number | null = null;
    const duration = 650;
    let raf: number;
    function step(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      setPct(Math.round(eased * 100));
      if (progress < 1) { raf = requestAnimationFrame(step); }
      else { setTimeout(() => { setDone(true); setTimeout(onDone, 250); }, 100); }
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className={`pf-preloader${done ? " is-done" : ""}`} aria-hidden="true">
      <div className="pf-preloader-panel pf-preloader-panel-left" />
      <div className="pf-preloader-panel pf-preloader-panel-right" />
      <div className="pf-preloader-grid" />
      <div className="pf-preloader-grain" />
      <div className="pf-preloader-scan" />
      <div className="pf-preloader-accent pf-preloader-accent-red" />
      <div className="pf-preloader-accent pf-preloader-accent-cyan" />
      <div className="pf-preloader-content">
        <div className="pf-preloader-meta">
          <span>SOFTWARE DEVELOPER</span>
          <span>INFORMATICS • UII</span>
        </div>
        <div className="pf-preloader-brand-wrap">
          <div className="pf-preloader-brand">SAKTI</div>
        </div>
        <div className="pf-preloader-meta" style={{ flexDirection: "column" as const, alignItems: "flex-end" }}>
          <span>PATI, INDONESIA</span>
          <span>ONLINE</span>
        </div>
        <div className="pf-preloader-status-row">
          <span>INITIALIZING CORE</span>
          <span className="pf-preloader-percentage">{String(pct).padStart(3, "0")}%</span>
        </div>
        <div className="pf-preloader-mini-marquee">
          <div className="pf-preloader-mini-marquee-inner">
            {MINI_MARQUEE.map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>
        <div className="pf-preloader-progress-bottom">
          <div className="pf-preloader-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

export function Cursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const gx = { cur: -100, target: -100 };
    const gy = { cur: -100, target: -100 };
    let raf: number;

    function move(e: MouseEvent) {
      gx.target = e.clientX; gy.target = e.clientY;
      const s = `translateX(${e.clientX}px) translateY(${e.clientY}px)`;
      if (scopeRef.current) scopeRef.current.style.transform = s;
      if (dotRef.current) dotRef.current.style.transform = s;
    }

    function animate() {
      gx.cur += (gx.target - gx.cur) * 0.14;
      gy.cur += (gy.target - gy.cur) * 0.14;
      if (glowRef.current) glowRef.current.style.transform = `translateX(${gx.cur}px) translateY(${gy.cur}px)`;
      raf = requestAnimationFrame(animate);
    }

    function onOver(e: MouseEvent) {
      if ((e.target as Element).closest("a,button,[data-cursor-link]") && glowRef.current)
        glowRef.current.classList.add("is-link");
    }
    function onOut(e: MouseEvent) {
      if ((e.target as Element).closest("a,button,[data-cursor-link]") && glowRef.current)
        glowRef.current.classList.remove("is-link");
    }

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="pf-cursor-glow" aria-hidden="true" style={{ transform: "translateX(-100px) translateY(-100px)" }} />
      <div ref={scopeRef} className="pf-cursor-scope" aria-hidden="true" style={{ transform: "translateX(-100px) translateY(-100px)" }}>
        <span className="pf-cursor-scope-ring" />
        <span className="pf-cursor-scope-core" />
        <span className="pf-cursor-scope-line pf-cursor-scope-line-x" />
        <span className="pf-cursor-scope-line pf-cursor-scope-line-y" />
        <span className="pf-cursor-blade pf-cursor-blade-a" />
        <span className="pf-cursor-blade pf-cursor-blade-b" />
      </div>
      <div ref={dotRef} className="pf-cursor-dot" aria-hidden="true" style={{ transform: "translateX(-100px) translateY(-100px)" }} />
    </>
  );
}

function OssSection() {
  const achievements = [
    { title: "2nd Place — Information System Development", org: "Informatics Expo UII", year: "2024" },
    { title: "English Proficiency Test — Score 476", org: "CILACS UII", year: "2025" },
    { title: "Networking Basics & IPv6", org: "APNIC Academy", year: "2024" },
    { title: "Study in Germany & Scholarship Opportunities", org: "International Affairs UII", year: "2025" },
    { title: "Moonton Student Leader", org: "Supported 148 new members", year: "2025" },
    { title: "Literasi Digital Nasional", org: "KOMINFO & SiberKreasi", year: "2021" },
  ];

  return (
    <div className="pf-oss-grid">
      {achievements.map((item) => (
        <article
          key={item.title}
          className="pf-oss-card"
          data-reveal="true"
        >
          <div className="pf-oss-header">
            <span className="pf-oss-project">{item.org}</span>
            <span className="pf-oss-badge">{item.year}</span>
          </div>
          <p className="pf-oss-desc">{item.title}</p>
          <div className="pf-oss-footer">
            <span className="pf-oss-pr">Achievement</span>
            <Award size={14} aria-hidden="true" />
          </div>
        </article>
      ))}
    </div>
  );
}

export function Portfolio() {
  usePageMeta({
    title: "Sakti Chandra Hanafi — Software Developer",
    description: "Portfolio of Sakti Chandra Hanafi, an Informatics graduate building web systems, mobile applications, educational games, and technology-driven solutions.",
    path: "/",
  });
  const [ready, setReady] = useState(false);
  const [activeChapter, setActiveChapter] = useState("hero");
  const navLinksRef = useRef<HTMLDivElement>(null);
  const navProgressRef = useRef<HTMLSpanElement>(null);
  const heroWordRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const onPreloaderDone = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!ready) return;
    const word = heroWordRef.current;
    const sub = heroSubRef.current;
    if (word) {
      requestAnimationFrame(() => {
        word.style.transition = "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)";
        word.style.opacity = "1";
        word.style.transform = "none";
      });
    }
    if (sub) {
      setTimeout(() => {
        sub.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.18s";
        sub.style.opacity = "1";
        sub.style.transform = "none";
      }, 60);
    }
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    let rafScheduled = false;
    function updateProgress() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      if (navProgressRef.current) navProgressRef.current.style.width = pct + "%";
    }
    function onScroll() {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(() => {
        updateProgress();
        rafScheduled = false;
      });
    }
    function onAnchorClick(e: MouseEvent) {
      const a = (e.target as Element).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: "smooth" });
    }

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onAnchorClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onAnchorClick);
    };
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const sections = document.querySelectorAll("[data-chapter]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveChapter((e.target as HTMLElement).dataset.chapter || "");
        });
      },
      { threshold: 0.25 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [ready]);

  useEffect(() => {
    const container = navLinksRef.current;
    if (!container) return;
    const active = container.querySelector<HTMLAnchorElement>("a.is-active");
    if (!active) return;
    const cRect = container.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();
    const offset = aRect.left - cRect.left - (cRect.width / 2 - aRect.width / 2);
    container.scrollTo({ left: container.scrollLeft + offset, behavior: "smooth" });
  }, [activeChapter]);

  useEffect(() => {
    if (!ready) return;
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    els.forEach((el) => {
      const parent = el.parentElement;
      if (!parent) return;
      const siblings = Array.from(parent.querySelectorAll(":scope > [data-reveal]"));
      const idx = siblings.indexOf(el as Element);
      const existing = parseFloat((el as HTMLElement).style.transitionDelay || "0") * 1000;
      if (idx > 0 && existing === 0) {
        (el as HTMLElement).style.transitionDelay = `${idx * 0.12}s`;
      }
    });
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }); },
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ready]);

  const chapters = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "numbers", label: "Numbers" },
    { id: "live", label: "Leadership" },
    { id: "projects", label: "Projects" },
    { id: "oss", label: "Awards" },
    { id: "journey", label: "Journey" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="pf-root">
      <a href="#about" className="pf-skip-link">Skip to main content</a>
      <Preloader onDone={onPreloaderDone} />
      <Cursor />

      <nav className={`pf-chapter-nav${ready ? " is-ready" : ""}`} aria-label="Chapter navigation">
        <a href="#hero" className="pf-chapter-nav-brand" data-cursor-link>
          <img src="/brand-mark.svg" alt="Sakti Chandra Hanafi" />
          <span>SAKTI</span>
        </a>
        <div className="pf-chapter-nav-links" ref={navLinksRef}>
          {chapters.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={activeChapter === c.id ? "is-active" : ""}
              data-cursor-link
            >
              <span>{String(i).padStart(2, "0")}</span>
              <span>{c.label}</span>
            </a>
          ))}
        </div>
        <a
          href={RESUME_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="pf-chapter-nav-cta"
          data-cursor-link
          title="Resume"
        >
          <FileText size={12} aria-hidden="true" />
          <span>Resume</span>
        </a>
        <span
          ref={navProgressRef}
          className="pf-chapter-nav-progress"
          aria-hidden="true"
        />
      </nav>

      <main className={`pf-shell${ready ? " is-ready" : ""}`}>
        <div className="pf-noise-overlay" />
        <div className="pf-command-grid" />

        <section id="hero" data-chapter="hero" className="pf-hero">
          <div className="pf-hero-kicker" data-reveal="true">
            <span>Sakti Chandra Hanafi</span>
            <span>Pati, Indonesia</span>
          </div>
          <div className="pf-hero-layout">
            <div className="pf-hero-copy">
              <h1
                ref={heroWordRef}
                className="pf-hero-word"
                aria-label="Sakti Chandra Hanafi"
                style={{ opacity: 0, transform: "translateY(80px) rotateX(16deg)" }}
              >
                SAKTI
              </h1>
              <p
                ref={heroSubRef}
                className="pf-hero-subtitle"
                style={{ opacity: 0, transform: "translateY(30px)" }}
              >
                Software Developer <span>•</span> Web, Systems &amp; Interactive Applications
              </p>
            </div>
            <div className="pf-hero-visual">
              <div className="pf-portrait-readout" style={{ position: "static", textAlign: "right" }}>
                <span>CORE ONLINE</span>
                <span>INFORMATICS • UII</span>
              </div>
            </div>
          </div>
          <div className="pf-marquee" aria-hidden="true">
            <div className="pf-marquee-track">
              {MARQUEE_ITEMS.map((s, i) => <span key={i}>{s}</span>)}
            </div>
          </div>
        </section>

        <section id="about" data-chapter="about" className="pf-chapter pf-about-section">
          <div className="pf-section-shell">
            <p className="pf-chapter-label" data-reveal="true">01 / About</p>
            <div className="pf-about-grid">
              <h2 data-reveal="true">BUILDING DIGITAL PRODUCTS FROM SCRATCH.</h2>
              <div className="pf-about-copy" data-reveal="true">
                <p>I'm Sakti Chandra Hanafi, an Informatics graduate from Universitas Islam Indonesia with hands-on experience across software development, web systems, game development, and IT broadcast.</p>
                <p>I turn operational needs and ideas into structured digital experiences. I thrive in cross-functional collaboration, learn quickly, and aim to create technology that delivers measurable business and social impact.</p>
              </div>
            </div>
            <Terminal />
          </div>
        </section>

        <section id="numbers" data-chapter="numbers" className="pf-chapter pf-numbers-section">
          <div className="pf-section-shell">
            <p className="pf-chapter-label" data-reveal="true">02 / Numbers</p>
            <div className="pf-metrics-grid">
              <MetricCard value="7" label="Portfolio Projects" delay={0} />
              <MetricCard value="GPA 3.63" label="Undergraduate Score / 4.00" delay={100} />
              <MetricCard value="31" label="Students Mentored" delay={200} />
              <MetricCard value="4" label="Professional Experiences" delay={300} />
            </div>
          </div>
        </section>

        <section id="live" data-chapter="live" className="pf-chapter pf-live-section">
          <div className="pf-section-shell">
            <p className="pf-chapter-label" data-reveal="true">03 / Leadership</p>
            <h2 className="pf-live-heading" data-reveal="true">LEARNING, MENTORING &amp; BUILDING COMMUNITY.</h2>
            <div className="pf-live-grid">
              <div className="pf-live-card" data-reveal="true">
                <div className="pf-live-header"><span className="pf-live-eyebrow">Game Development Mentor</span><Users size={18} /></div>
                <span className="pf-highlight-total">31</span>
                <p className="pf-journey-detail">Students guided through Unity 2D, movement, scenes, sound, timers, and Android game development at Universitas Islam Indonesia.</p>
              </div>
              <div className="pf-live-card" data-reveal="true">
                <div className="pf-live-header"><span className="pf-live-eyebrow">Moonton Student Leader</span><Users size={18} /></div>
                <span className="pf-highlight-total">148</span>
                <p className="pf-journey-detail">New members welcomed into a supportive campus esports environment that encouraged participation and community.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" data-chapter="projects" className="pf-chapter">
          <div className="pf-section-shell">
            <div className="pf-section-heading">
              <p className="pf-chapter-label" data-reveal="true">04 / Projects</p>
              <h2 data-reveal="true">SYSTEMS, GAMES &amp; EXPERIENCES BUILT FOR IMPACT.</h2>
            </div>
            <ProjectShowcase />
            <div className="pf-projects-cta" data-reveal="true">
              <Link href="/projects" className="pf-projects-cta-btn" data-cursor-link>
                <span>See All Projects</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section id="oss" data-chapter="oss" className="pf-chapter pf-about-section">
          <div className="pf-section-shell">
            <p className="pf-chapter-label" data-reveal="true">05 / Achievements</p>
            <h2 data-reveal="true">MILESTONES ALONG THE WAY.</h2>
            <OssSection />
          </div>
        </section>

        <section id="journey" data-chapter="journey" className="pf-chapter pf-journey-section">
          <div className="pf-section-shell">
            <div className="pf-section-heading">
              <p className="pf-chapter-label" data-reveal="true">06 / Journey</p>
              <h2 data-reveal="true">EDUCATION &amp; WORK - TRAJECTORY ON RECORD.</h2>
            </div>
            <JourneyTimeline />
          </div>
        </section>

        <section id="skills" data-chapter="skills" className="pf-chapter pf-skills-section">
          <div className="pf-section-shell">
            <p className="pf-chapter-label" data-reveal="true">07 / Skills</p>
            <div className="pf-skill-layout">
              <h2 data-reveal="true">TOOLS FOR SOFTWARE, GAMES, MOBILE &amp; BROADCAST.</h2>
              <div className="pf-lang-stats" data-reveal="true">
                <span className="pf-lang-stats-eyebrow">Working Languages</span>
                <p className="pf-journey-detail">Indonesian — Native</p>
                <p className="pf-journey-detail">English — Intermediate working proficiency</p>
              </div>
            </div>
            <SkillCarousel />
          </div>
        </section>

        <section id="contact" data-chapter="contact" className="pf-contact-section">
          <div className="pf-contact-panel" data-reveal="true">
            <p className="pf-chapter-label">08 / Contact</p>
            <h2>LET'S BUILD SOMETHING TOGETHER</h2>
            <div className="pf-contact-actions">
              <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" data-cursor-link>
                <FileText size={18} aria-hidden="true" style={{ color: "#39e8ff" }} />
                <span>Resume</span>
              </a>
              <a href={RESUME_PATH} download={RESUME_FILENAME} data-cursor-link>
                <Download size={18} aria-hidden="true" style={{ color: "#22c55e" }} />
                <span>Download Resume</span>
              </a>
              <a href="https://linkedin.com/in/saktich" target="_blank" rel="noreferrer" data-cursor-link>
                <Linkedin size={18} aria-hidden="true" style={{ color: "#0A66C2" }} />
                <span>LinkedIn</span>
              </a>
              <a href="mailto:sarsusakti@gmail.com" data-cursor-link>
                <MessageCircle size={18} aria-hidden="true" style={{ color: "#EA4335" }} />
                <span>Email</span>
              </a>
              <a href="tel:+6281515845666" data-cursor-link>
                <Phone size={18} aria-hidden="true" style={{ color: "#22c55e" }} />
                <span>Phone</span>
              </a>
            </div>
            <p className="pf-contact-username">sarsusakti@gmail.com • Pati, Indonesia</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Portfolio;
