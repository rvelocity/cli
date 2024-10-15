import fs from "fs";
import { downloadTemplate } from "giget";
import open from "open";
import { rnDependencies, rnDevDependencies } from "../constants/rnLib.js";
import { downloadFile, moveFile } from "../utils/fileHelper.js";
import { logger } from "../utils/logger.js";
import {
  detectPackageManager,
  packageInstaller,
} from "../utils/packageHelper.js";

// Main function to initialize the project based on the platform
export default function (platform) {
  const projectRoot = process.cwd();
  const projectRootSrc = `${projectRoot}/src`;

  if (fs.existsSync(projectRootSrc)) {
    logger("Project already initialized.", "yellow");
    return;
  }

  const isReactNative = platform === "react-native";
  if (isReactNative) {
    initReactNativeProject(projectRoot);
  } else {
    initReactProject(projectRoot);
  }
}

// Helper function to download folders
async function downloadFolders(folders) {
  try {
    for (const folder of folders) {
      const { path, dest } = folder;
      await downloadTemplate(path, { dir: dest });
    }
  } catch (error) {
    logger(`Error downloading folder: ${error}`, "red");
    throw error;
  }
}

// Helper function to download files
async function downloadFiles(files) {
  try {
    for (const file of files) {
      const { path, dest } = file;
      await downloadFile(path, dest);
    }
  } catch (error) {
    logger(`Error downloading file: ${error}`, "red");
    throw error;
  }
}

// React Native project initialization
async function initReactNativeProject(projectRoot) {
  const repoUrl = "github:rvelocity/react-native-template";
  const rawRepoUrl =
    "https://raw.githubusercontent.com/rvelocity/react-native-template/main";

  const foldersToCopy = createFoldersToCopy(repoUrl, projectRoot);
  const filesToCopy = createFilesToCopy(rawRepoUrl, projectRoot);

  logger("Initializing React Native project...", "blue");

  try {
    await downloadFolders(foldersToCopy);

    // Move App.tsx into the src folder
    const sourceAppRootPath = `${projectRoot}/App.tsx`;
    const targetAppSrcPath = `${projectRoot}/src/App.tsx`;
    moveFile(sourceAppRootPath, targetAppSrcPath);

    await downloadFiles(filesToCopy);
    logger("React Native project initialized successfully.", "green");

    await installDependencies();

    open("https://github.com/rvelocity/cli/blob/main/docs/REACTNATIVE_INIT.md");
  } catch (error) {
    logger("Project initialization failed", "red");
    console.error("Error:", error);
  }
}

// Helper function to create folders to copy
function createFoldersToCopy(repoUrl, projectRoot) {
  const srcPath = `${projectRoot}/src`;
  return [
    { key: "api", path: `${repoUrl}/src/api`, dest: `${srcPath}/api` },
    { key: "config", path: `${repoUrl}/src/config`, dest: `${srcPath}/config` },
    {
      key: "constants",
      path: `${repoUrl}/src/constants`,
      dest: `${srcPath}/constants`,
    },
    { key: "hooks", path: `${repoUrl}/src/hooks`, dest: `${srcPath}/hooks` },
    { key: "i18n", path: `${repoUrl}/src/i18n`, dest: `${srcPath}/i18n` },
    {
      key: "navigation",
      path: `${repoUrl}/src/navigation`,
      dest: `${srcPath}/navigation`,
    },
    {
      key: "screens",
      path: `${repoUrl}/src/screens`,
      dest: `${srcPath}/screens`,
    },
    {
      key: "services",
      path: `${repoUrl}/src/services`,
      dest: `${srcPath}/services`,
    },
    { key: "store", path: `${repoUrl}/src/store`, dest: `${srcPath}/store` },
    { key: "theme", path: `${repoUrl}/src/theme`, dest: `${srcPath}/theme` },
    { key: "types", path: `${repoUrl}/src/types`, dest: `${srcPath}/types` },
    { key: "utils", path: `${repoUrl}/src/utils`, dest: `${srcPath}/utils` },
    { key: "assets", path: `${repoUrl}/assets`, dest: `${projectRoot}/assets` },
  ];
}

// Helper function to create files to copy
function createFilesToCopy(rawRepoUrl, projectRoot) {
  return [
    {
      key: "index.js",
      path: `${rawRepoUrl}/index.js`,
      dest: `${projectRoot}/index.js`,
    },
    {
      key: "metro.config.js",
      path: `${rawRepoUrl}/metro.config.js`,
      dest: `${projectRoot}/metro.config.js`,
    },
    {
      key: "App.tsx",
      path: `${rawRepoUrl}/src/App.tsx`,
      dest: `${projectRoot}/src/App.tsx`,
    },
  ];
}

// Install dependencies for the React Native project
async function installDependencies() {
  try {
    const packageManager = detectPackageManager();
    await packageInstaller(packageManager, rnDependencies);
    await packageInstaller(packageManager, rnDevDependencies, true);
  } catch (error) {
    throw error;
  }
}

// React project initialization (currently a placeholder)
function initReactProject(projectRoot) {
  // Your logic for initializing a React project here
}
