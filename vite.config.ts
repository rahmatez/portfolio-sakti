import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = Number(process.env.PORT ?? 5173);
const basePath = process.env.BASE_PATH ?? "/";

function resumeScannerPlugin(): Plugin {
  const syncResume = () => {
    const resumeDir = path.resolve(__dirname, "public/resume");
    if (!fs.existsSync(resumeDir)) return;
    const files = fs.readdirSync(resumeDir).filter((f) => f.toLowerCase().endsWith(".pdf"));
    if (files.length === 0) return;

    files.sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" }));
    const latestFile = files[0];
    const resumePath = `/resume/${latestFile}`;
    const resumeTsFile = path.resolve(__dirname, "src/lib/resume.ts");

    const content = `// Auto-generated from public/resume directory. Do not edit directly.\nexport const RESUME_PATH = ${JSON.stringify(resumePath)};\nexport const RESUME_FILENAME = ${JSON.stringify(latestFile)};\n`;

    if (!fs.existsSync(resumeTsFile) || fs.readFileSync(resumeTsFile, "utf-8") !== content) {
      fs.writeFileSync(resumeTsFile, content, "utf-8");
    }

    const vercelConfigPath = path.resolve(__dirname, "vercel.json");
    if (fs.existsSync(vercelConfigPath)) {
      try {
        const vercelJson = JSON.parse(fs.readFileSync(vercelConfigPath, "utf-8"));
        if (Array.isArray(vercelJson.rewrites)) {
          const rule = vercelJson.rewrites.find((r: any) => r.source === "/resume");
          if (rule && rule.destination !== resumePath) {
            rule.destination = resumePath;
            fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelJson, null, 2) + "\n", "utf-8");
          }
        }
      } catch {}
    }
  };

  return {
    name: "resume-scanner",
    buildStart() {
      syncResume();
    },
    configureServer(server) {
      syncResume();
      const resumeDir = path.resolve(__dirname, "public/resume");
      server.watcher.add(resumeDir);
      server.watcher.on("all", (_event, filePath) => {
        if (filePath.startsWith(resumeDir) && filePath.toLowerCase().endsWith(".pdf")) {
          syncResume();
        }
      });
      server.middlewares.use((req, res, next) => {
        if (req.url === "/resume" || req.url === "/resume/") {
          const resumeDir = path.resolve(__dirname, "public/resume");
          if (fs.existsSync(resumeDir)) {
            const files = fs.readdirSync(resumeDir).filter((f) => f.toLowerCase().endsWith(".pdf"));
            if (files.length > 0) {
              files.sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" }));
              res.writeHead(302, { Location: `/resume/${files[0]}` });
              res.end();
              return;
            }
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    resumeScannerPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
