#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const projectName = process.argv[2];

if (!projectName) {
  console.error("Usage: npx create-waygraph <project-name>");
  process.exit(1);
}

const templatesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "templates");
const targetDir = path.resolve(process.cwd(), projectName);

if (fs.existsSync(targetDir)) {
  const stat = fs.statSync(targetDir);
  if (!stat.isDirectory() || fs.readdirSync(targetDir).length > 0) {
    console.error(`create-waygraph: "${targetDir}" already exists - refusing to overwrite it.`);
    process.exit(1);
  }
}

fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(templatesDir, targetDir, { recursive: true });

fs.renameSync(path.join(targetDir, "gitignore"), path.join(targetDir, ".gitignore"));

const packageJsonPath = path.join(targetDir, "package.json");
const packageJson = fs.readFileSync(packageJsonPath, "utf8").replace("__PROJECT_NAME__", projectName);
fs.writeFileSync(packageJsonPath, packageJson);

console.log(`Scaffolded ${projectName}/`);
console.log("");
console.log(`  cd ${projectName}`);
console.log("  npm install");
console.log("  npx playwright install chromium");
console.log("  npm test");
console.log("  npx waygraph check .   # nav + orphan Blocks");
console.log("");
console.log("(Prefer npx waygraph init when waygraph >= 0.7.5 - same scaffold, built into the CLI.)");
