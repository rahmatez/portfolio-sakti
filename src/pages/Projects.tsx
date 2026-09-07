import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Search } from "lucide-react";
import "../components/portfolio.css";
import { Cursor } from "../components/Portfolio";
import { usePageMeta } from "../lib/seo";
import { PROJECTS } from "../lib/projects";

export default function ProjectsPage() {
  usePageMeta({
    title: "Projects — Sakti Chandra Hanafi",
    description:
      "Selected software, web, game, mobile, and inclusive design projects by Sakti Chandra Hanafi.",
    path: "/projects",
  });

  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return PROJECTS;
    return PROJECTS.filter((project) =>
      [project.name, project.category, project.description, ...project.stack, ...project.highlights]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  return (
    <div className="pf-root pf-projects-root">
      <Cursor />
      <div className="pf-shell is-ready">
        <div className="pf-noise-overlay" />
        <div className="pf-command-grid" />

        <header className="pf-projects-header">
          <Link href="/" className="pf-projects-back" data-cursor-link>
            <ArrowLeft size={14} />
            <span>Back to portfolio</span>
          </Link>
          <span className="pf-projects-github">Sakti Chandra Hanafi</span>
        </header>

        <section className="pf-projects-hero">
          <p className="pf-chapter-label" data-reveal="true">Archive / Selected Work</p>
          <h1 className="pf-projects-title" data-reveal="true">
            PROJECTS BUILT FOR <span className="pf-projects-title-accent">IMPACT.</span>
          </h1>
          <p className="pf-projects-sub" data-reveal="true">
            A curated collection spanning environmental action, tourism, business analytics,
            educational games, inclusive design, and mobile commerce.
          </p>
          <div className="pf-projects-stats" data-reveal="true">
            <div><span>{PROJECTS.length}</span><label>Selected Projects</label></div>
            <div><span>5</span><label>Project Domains</label></div>
            <div><span>10+</span><label>Technologies Used</label></div>
          </div>
        </section>

        <section className="pf-projects-controls">
          <div className="pf-projects-search">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search projects, technologies, or domains…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              data-cursor-link
            />
          </div>
        </section>

        <section className="pf-repo-grid">
          {filtered.length === 0 && (
            <p className="pf-repo-loading">No projects match “{query}”.</p>
          )}
          {filtered.map((project) => (
            <article key={project.name} className="pf-repo-card is-visible" data-reveal="true">
              <div className="pf-repo-card-head">
                <span className="pf-repo-card-name">{project.name}</span>
                <span className="pf-project-eyebrow">{project.category}</span>
              </div>
              <p className="pf-repo-card-desc">{project.description}</p>
              <div className="pf-repo-card-topics">
                {project.stack.map((item) => (
                  <span key={item} className="pf-repo-topic">{item}</span>
                ))}
              </div>
              <div className="pf-repo-card-foot">
                <span>{project.highlights.join(" • ")}</span>
              </div>
            </article>
          ))}
        </section>

        <footer className="pf-projects-footer">
          <Link href="/" className="pf-projects-footer-link" data-cursor-link>
            ← Return to main portfolio
          </Link>
          <span>Pati, Indonesia</span>
        </footer>
      </div>
    </div>
  );
}
