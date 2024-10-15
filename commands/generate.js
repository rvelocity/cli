import path from "path";
import { createDirectory, writeFile } from "../utils/fileHelper.js";
import { logger } from "../utils/logger.js";

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

  // Select the appropriate template
  const componentTemplate = isReactNative
    ? reactNativeTemplate(component)
    : reactTemplate(component);
  const stylesTemplate = isReactNative
    ? reactNativeStylesTemplate
    : reactStylesTemplate(component);
  const barrelContent = indexTemplate(component);

  // Create component directory
  createDirectory(componentDir);

  // Write files
  writeFile(componentFilePath, componentTemplate);
  writeFile(styleFilePath, stylesTemplate);
  writeFile(barrelFilePath, barrelContent);

  logger(
    `${component} component for ${
      isReactNative ? "React Native" : "ReactJS"
    } created successfully in ${folder}/${component}.tsx`,
    "green"
  );
}

const indexTemplate = (component) =>
  `export { default } from './${component}';`;

const reactNativeTemplate = (component) => `import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles.ts';

type ${component}Props = {
  // Define props here
};

const ${component}: React.FC<${component}Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>${component} Component</Text>
    </View>
  );
};

export default ${component};
`;

const reactTemplate = (component) => `import React from 'react';
import './styles.css';

type ${component}Props = {
  // Define props here
};

const ${component}: React.FC<${component}Props> = (props) => {
  return (
    <div>
      <h1>${component} Component</h1>
    </div>
  );
};

export default ${component};
`;

const reactNativeStylesTemplate = `import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
`;

const reactStylesTemplate = (component) => `.${component} {
  /* Add styles here */
}
`;
