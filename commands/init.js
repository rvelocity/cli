import fs from "fs";
import { downloadTemplate } from "giget";
import open from "open";
import { downloadFile, moveFile } from "../utils/fileHelper.js";
import { logger } from "../utils/logger.js";
import {
  detectPackageManager,
  packageInstaller,
} from "../utils/packageHelper.js";

export default function (platform) {
  const projectRoot = process.cwd();
  const projectRootSrc = `${projectRoot}/src`;

  // As of now we will overwrite src folder, So commenting this check
  // if (fs.existsSync(projectRootSrc)) {
  //   logger("Project already initialized.", "yellow");
  //   return;
  // }

  const config = getPlatformConfig(platform);

  if (!config) {
    logger(
      "Unsupported platform. Supported platforms are 'react' and 'react-native'.",
      "red"
    );
    return;
  }

  initProject(config, projectRoot, platform);
}

function getPlatformConfig(platform) {
  const configs = {
    "react-native": {
      repoUrl: "github:rvelocity/react-native-template",
      rawRepoUrl:
        "https://raw.githubusercontent.com/rvelocity/react-native-template/main",
      dependencies: rnDependencies,
      devDependencies: rnDevDependencies,
      docsUrl:
        "https://github.com/rvelocity/cli/blob/main/docs/REACTNATIVE_INIT.md",
    },
    react: {
      repoUrl: "github:rvelocity/react-template",
      rawRepoUrl:
        "https://raw.githubusercontent.com/rvelocity/react-template/main",
      dependencies: rDependencies,
      devDependencies: rDevDependencies,
      docsUrl: "https://github.com/rvelocity/cli/blob/main/docs/REACT_INIT.md",
    },
  };

  return configs[platform] || null;
}

async function initProject(config, projectRoot, platform) {
  const foldersToCopy = createFoldersToCopy(
    config.repoUrl,
    projectRoot,
    platform
  );
  const filesToCopy = createFilesToCopy(
    config.rawRepoUrl,
    projectRoot,
    platform
  );

  logger(
    `Initializing ${config.repoUrl.includes("react-native") ? "React Native" : "React"} project...`,
    "blue"
  );

  try {
    await downloadFolders(foldersToCopy);

    // Move React Native App.tsx into the src folder for React Native (or appropriate file for React)
    const sourceAppRootPath = `${projectRoot}/App.tsx`;
    const targetAppSrcPath = `${projectRoot}/src/App.tsx`;
    platform === "react-native" &&
      moveFile(sourceAppRootPath, targetAppSrcPath);

    filesToCopy.length && (await downloadFiles(filesToCopy));
    logger(
      `${config.repoUrl.includes("react-native") ? "React Native" : "React"} project initialized successfully.`,
      "green"
    );

    await installDependencies(config.dependencies, config.devDependencies);

    open(config.docsUrl);
  } catch (error) {
    logger("Project initialization failed", "red");
    console.error("Error:", error);
  }
}

async function downloadFolders(folders) {
  try {
    for (const folder of folders) {
      const { path, dest } = folder;
      await downloadTemplate(path, { dir: dest, force: true });
    }
  } catch (error) {
    logger(`Error downloading folder: ${error}`, "red");
    throw error;
  }
}

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

async function installDependencies(dependencies, devDependencies) {
  try {
    const packageManager = detectPackageManager();
    dependencies.length &&
      (await packageInstaller(packageManager, dependencies));
    devDependencies.length &&
      (await packageInstaller(packageManager, devDependencies, true));
  } catch (error) {
    throw error;
  }
}

// Helper function to create folders to copy based on platform
function createFoldersToCopy(repoUrl, projectRoot, platform) {
  const targetSrcPath = `${projectRoot}/src`; // Target path for the project
  const sourceSrcPath = `${repoUrl}/src`; // Base path for repo folders

  // Define platform-specific folder configurations
  const platformFolders = {
    "react-native": [
      {
        key: "assets",
        path: `${repoUrl}/assets`,
        dest: `${projectRoot}/assets`,
      }, // No /src for assets
      {
        key: "api",
        path: `${sourceSrcPath}/api`,
        dest: `${targetSrcPath}/api`,
      },
      {
        key: "config",
        path: `${sourceSrcPath}/config`,
        dest: `${targetSrcPath}/config`,
      },
      {
        key: "constants",
        path: `${sourceSrcPath}/constants`,
        dest: `${targetSrcPath}/constants`,
      },
      {
        key: "hooks",
        path: `${sourceSrcPath}/hooks`,
        dest: `${targetSrcPath}/hooks`,
      },
      {
        key: "i18n",
        path: `${sourceSrcPath}/i18n`,
        dest: `${targetSrcPath}/i18n`,
      },
      {
        key: "navigation",
        path: `${sourceSrcPath}/navigation`,
        dest: `${targetSrcPath}/navigation`,
      },
      {
        key: "screens",
        path: `${sourceSrcPath}/screens`,
        dest: `${targetSrcPath}/screens`,
      },
      {
        key: "services",
        path: `${sourceSrcPath}/services`,
        dest: `${targetSrcPath}/services`,
      },
      {
        key: "store",
        path: `${sourceSrcPath}/store`,
        dest: `${targetSrcPath}/store`,
      },
      {
        key: "theme",
        path: `${sourceSrcPath}/theme`,
        dest: `${targetSrcPath}/theme`,
      },
      {
        key: "types",
        path: `${sourceSrcPath}/types`,
        dest: `${targetSrcPath}/types`,
      },
      {
        key: "utils",
        path: `${sourceSrcPath}/utils`,
        dest: `${targetSrcPath}/utils`,
      },
    ],
    react: [
      // We will copy whole src folder from react-template
      {
        key: "src",
        path: `${sourceSrcPath}`,
        dest: `${targetSrcPath}`,
      },
    ],
  };

  // Return combined common and platform-specific folders
  return [...(platformFolders[platform] || [])];
}

// Helper function to create files to copy based on platform
function createFilesToCopy(rawRepoUrl, projectRoot, platform) {
  const targetSrcPath = `${projectRoot}/src`; // Target path for the project
  const sourceSrcPath = `${rawRepoUrl}/src`; // Base path for repo files

  // Define platform-specific file configurations
  const platformFiles = {
    "react-native": [
      {
        key: "App.tsx",
        path: `${sourceSrcPath}/App.tsx`,
        dest: `${targetSrcPath}/App.tsx`,
      },
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
    ],
    react: [
      // Add React-specific files here if necessary
    ],
  };

  // Common files for both platforms

  // Return combined common and platform-specific files
  return [...(platformFiles[platform] || [])];
}

const rnDependencies = [
  "@react-native-community/netinfo",
  "react-native-unistyles",
  "@tanstack/react-query",
  "@tanstack/react-query-persist-client",
  "@tanstack/query-sync-storage-persister",
  "react-native-mmkv",
  "zustand",
  "axios",
  "react-native-svg",
  "react-hook-form",
  "@hookform/resolvers",
  "zod",
  "i18next",
  "react-i18next",
  "react-native-vector-icons",
  "@react-navigation/native",
  "react-native-screens",
  "react-native-safe-area-context",
  "@react-navigation/native-stack",
  "date-fns",
  "lottie-react-native",
  "react-native-gesture-handler",
  "react-native-reanimated",
  "react-native-linear-gradient",
  "@shopify/flash-list",
];

const rnDevDependencies = [
  "babel-plugin-module-resolver",
  "react-native-svg-transformer",
  "@types/react-native-vector-icons",
  "@storybook/addon-ondevice-actions",
  "@storybook/addon-ondevice-backgrounds",
  "@storybook/addon-ondevice-controls",
  "@storybook/addon-ondevice-notes",
  "@storybook/react-native",
  "@gorhom/bottom-sheet@^4.6.4",
  "@react-native-async-storage/async-storage",
  "@react-native-community/slider",
  "@react-native-community/datetimepicker",
];

const rDependencies = [
  "@tanstack/react-query",
  "@tanstack/react-query-persist-client",
  "@tanstack/query-sync-storage-persister",
  "zustand",
  "axios",
  "react-hook-form",
  "@hookform/resolvers",
  "zod",
  "i18next",
  "react-i18next",
  "date-fns",
];

const rDevDependencies = [];
