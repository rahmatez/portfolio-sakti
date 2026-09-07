import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const SITE_URL = "https://saktihanafi.vercel.app";

describe("site metadata", () => {
  it("uses the production domain in every static SEO entry point", () => {
    for (const file of ["index.html", "public/robots.txt", "public/sitemap.xml", "src/lib/seo.ts"]) {
      const content = readFileSync(file, "utf8");
      expect(content, file).toContain(SITE_URL);
      expect(content, file).not.toContain("rathodram.vercel.app");
    }
  });

  it("publishes the supplied resume and social preview", () => {
    const sourceResume = readFileSync("Sakti Chandra Hanafi_Resume.pdf");
    const resume = readFileSync("public/resume/Sakti_Chandra_Hanafi_Resume.pdf");
    const socialCard = readFileSync("public/social-card.png");

    expect(resume.subarray(0, 4).toString()).toBe("%PDF");
    expect(resume.length).toBeGreaterThan(100_000);
    expect(resume.equals(sourceResume)).toBe(true);
    expect(socialCard.length).toBeGreaterThan(10_000);
  });

  it("keeps structured data and deployment configuration valid", () => {
    const html = readFileSync("index.html", "utf8");
    const structuredData = [...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    )];
    const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));

    expect(structuredData.length).toBe(2);
    for (const [, json] of structuredData) {
      expect(() => JSON.parse(json)).not.toThrow();
    }
    expect(vercel.rewrites).toContainEqual({
      source: "/resume",
      destination: "/resume/Sakti_Chandra_Hanafi_Resume.pdf",
    });
  });

  it("keeps every local static asset referenced by index.html available", () => {
    const html = readFileSync("index.html", "utf8");
    const localAssets = [...html.matchAll(/(?:href|src)="(\/[^"#?]+)"/g)]
      .map(([, asset]) => asset)
      .filter((asset) => !asset.startsWith("/src/"));

    for (const asset of localAssets) {
      expect(existsSync(`public${asset}`), asset).toBe(true);
    }
  });
});
