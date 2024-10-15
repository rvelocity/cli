import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { logger } from "./logger.js";

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
      logger("Unsupported package manager.", "red");
      process.exit(1);
  }

  logger(
    `Installing ${
      isDev ? "dev dependencies" : "dependencies"
    } with ${packageManager}...`,
    "blue"
  );

  try {
    execSync(installCommand, { stdio: "inherit" });
  } catch {
    logger(
      `Failed to install packages with ${packageManager}, Please try again!`,
      "red"
    );
    process.exit(1);
  }
}

// Utility function to determine the platform (React or React Native)
export function determinePlatform(isReactNative) {
  return isReactNative ? "react-native" : "react";
}
