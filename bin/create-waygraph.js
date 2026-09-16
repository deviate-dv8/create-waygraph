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
const packageJson = fs.readFileSync(packageJsonPath, "utf8").replaceAll("__PROJECT_NAME__", path.basename(targetDir));
fs.writeFileSync(packageJsonPath, packageJson);

console.log(`Scaffolded ${path.basename(targetDir)}/`);
console.log("");
console.log(`  cd ${projectName}`);
console.log("  npm install");
console.log("  npx playwright install chromium");
console.log("  npm test");
console.log("  npx waygraph list");
console.log("  npx waygraph check");
console.log("  npx waygraph auto              # headed panel");
console.log("  npx waygraph demo src/flows/example.flow.ts");
console.log("");
console.log("(Same offline scaffold as: npx waygraph init <name> - waygraph >= 0.10.6.)");
console.log("(Live saucedemo: npx waygraph try auto | try demo - temp dir, not a scaffold.)");
