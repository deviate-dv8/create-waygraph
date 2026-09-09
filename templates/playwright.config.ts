import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    launchOptions: {
      // If CHROME_PATH/CHROMIUM_PATH is set (e.g. a Flatpak/system Chromium),
      // use it instead of downloading Playwright's own bundled binary.
      // Falls through to Playwright's default when unset - safe either way.
      executablePath: process.env.CHROME_PATH || process.env.CHROMIUM_PATH,
    },
  },
});
