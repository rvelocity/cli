import path, { dirname } from "path";
import { fileURLToPath } from "url";
import {
  createDirectory,
  readTemplate,
  writeFile,
} from "../utils/fileHelper.js";
import { logger } from "../utils/logger.js";

// Utility to manage __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generates a component based on user input
 * @param {string[]} args - Command line arguments
 */
export default function generateComponent(args) {
  const [folder, component, platform] = args;

  if (!folder || !component) {
    logger(
      "Please provide folder and component name: rc g <folder> <component> [-rn]",
      "red"
    );
    process.exit(1);
  }

  const isReactNative = platform === "react-native";

  // Paths setup
  const componentDir = path.join(process.cwd(), "src", folder, component);
  const componentFilePath = path.join(componentDir, `${component}.tsx`);
  const styleFilePath = path.join(
    componentDir,
    isReactNative ? "styles.ts" : "styles.css"
  );
  const barrelFilePath = path.join(componentDir, "index.ts");

  // Templates
  const templateDir = path.join(__dirname, "..", "templates");
  const componentTemplatePath = path.join(
    templateDir,
    isReactNative ? "react-native.tsx" : "react.tsx"
  );
  const stylesTemplatePath = path.join(
    templateDir,
    isReactNative ? "styles.ts" : "styles.css"
  );

  // Create component directory
  createDirectory(componentDir);

  // Read template content
  const componentTemplate = readTemplate(componentTemplatePath);
  const stylesTemplate = readTemplate(stylesTemplatePath);

  // Replace placeholder in templates
  const componentContent = componentTemplate.replace(
    /__COMPONENT_NAME__/g,
    component
  );
  const stylesContent = stylesTemplate.replace(
    /__COMPONENT_NAME__/g,
    component
  );

  // Barrel file content
  const barrelContent = `export { default } from './${component}';`;

  // Write files
  writeFile(componentFilePath, componentContent);
  writeFile(styleFilePath, stylesContent);
  writeFile(barrelFilePath, barrelContent);

  logger(
    `${component} component for ${
      isReactNative ? "React Native" : "ReactJS"
    } created successfully in ${folder}/${component}.tsx`,
    "green"
  );
}
