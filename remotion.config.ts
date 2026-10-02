/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import fs from "node:fs";
import path from "node:path";
import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// In Claude Code cloud sessions remotion.media is not reachable, so Remotion
// cannot download its own Chrome Headless Shell. Use the preinstalled
// Playwright one when present. REMOTION_BROWSER_EXECUTABLE overrides it.
const findLocalHeadlessShell = (): string | null => {
  const fromEnv = process.env.REMOTION_BROWSER_EXECUTABLE;
  if (fromEnv) {
    return fromEnv;
  }

  const root = process.env.PLAYWRIGHT_BROWSERS_PATH ?? "/opt/pw-browsers";
  if (!fs.existsSync(root)) {
    return null;
  }

  for (const dir of fs.readdirSync(root)) {
    if (!dir.startsWith("chromium_headless_shell-")) {
      continue;
    }
    for (const sub of fs.readdirSync(path.join(root, dir))) {
      const candidate = path.join(root, dir, sub, "headless_shell");
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }

  return null;
};

const browserExecutable = findLocalHeadlessShell();
if (browserExecutable) {
  Config.setBrowserExecutable(browserExecutable);
}
