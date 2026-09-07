import { describe, expect, it } from "vitest";
import { PROJECTS } from "./projects";
import { CATEGORIES, SKILLS } from "./skills";

describe("portfolio project data", () => {
  it("contains the seven documented Sakti projects", () => {
    expect(PROJECTS.map((project) => project.name)).toEqual([
      "ACTONT",
      "Story",
      "GlowRX",
      "Clash Arena: Win or Die",
      "Kisah Teladan Rasul",
      "Ayo Belajar!",
      "E-Cycle",
    ]);
  });

  it("keeps every project complete and uniquely named", () => {
    expect(new Set(PROJECTS.map((project) => project.name)).size).toBe(PROJECTS.length);

    for (const project of PROJECTS) {
      expect(project.category.trim()).not.toBe("");
      expect(project.description.trim()).not.toBe("");
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.highlights.length).toBeGreaterThan(0);
    }
  });
});

describe("portfolio skill data", () => {
  it("uses only declared categories", () => {
    for (const skill of SKILLS) {
      expect(CATEGORIES).toContain(skill.category);
    }
  });

  it("keeps skill names unique and icons web-safe", () => {
    expect(new Set(SKILLS.map((skill) => skill.name)).size).toBe(SKILLS.length);

    for (const skill of SKILLS) {
      expect(skill.icon).toMatch(/^https:\/\//);
    }
  });
});
