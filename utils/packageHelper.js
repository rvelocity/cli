import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function detectPackageManager() {
  if (fs.existsSync(path.join(process.cwd(), "yarn.lock"))) {
    return "yarn";
  } else if (fs.existsSync(path.join(process.cwd(), "pnpm-lock.yaml"))) {
    return "pnpm";
  } else if (fs.existsSync(path.join(process.cwd(), "package-lock.json"))) {
    return "npm";
  } else {
    return "yarn";
  }
}

export function packageInstaller(packageManager, packages, isDev = false) {
  let installCommand;

  switch (packageManager) {
    case "npm":
      installCommand = `npm install ${packages.join(" ")}${
        isDev ? " --save-dev" : ""
      }`;
      break;
    case "yarn":
      installCommand = `yarn add ${packages.join(" ")}${isDev ? " -D" : ""}`;
      break;
    case "pnpm":
      installCommand = `pnpm add ${packages.join(" ")}${isDev ? " -D" : ""}`;
      break;
    default:
      console.error("Unsupported package manager.");
      process.exit(1);
  }

  console.log(
    `Installing ${
      isDev ? "dev dependencies" : "dependencies"
    } with ${packageManager}...`
  );
  try {
    execSync(installCommand, { stdio: "inherit" });
  } catch {
    console.log(`Failed to install packages with ${packageManager}`);
    process.exit(1);
  }
}
