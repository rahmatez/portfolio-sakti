import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { getPreferredTheme, getStoredTheme } from "./theme";

describe("theme helpers", () => {
  it("defaults to dark when nothing is stored", () => {
    expect(getStoredTheme()).toBeNull();
    expect(getPreferredTheme()).toBe("dark");
  });

  it("ships light and dark theme tokens", () => {
    const css = readFileSync("src/components/portfolio.css", "utf8");
    expect(css).toContain('[data-theme="light"]');
    expect(css).toContain('[data-theme="dark"]');
    expect(css).toContain(".pf-theme-toggle");
  });

  it("bootstraps theme before paint", () => {
    const html = readFileSync("index.html", "utf8");
    expect(html).toContain('localStorage.getItem("sakti-theme")');
    expect(html).toContain('data-theme');
  });
});
