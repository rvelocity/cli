#!/usr/bin/env node
import { program } from "commander";
import { createRequire } from "module";
import open from "open";
import updateNotifier from "update-notifier";
import generateCommand from "../commands/generate.js";
import initCommand from "../commands/init.js";
import { determinePlatform } from "../utils/packageHelper.js";

const require = createRequire(import.meta.url);
const pkg = require("../package.json");

// Initialize update notifier
const notifier = updateNotifier({ pkg });
if (notifier.update) {
  notifier.notify();
}

// Init command
program
  .command("init")
  .description("Initialize a new React or React Native project")
  .option("-rn, --react-native", "Initialize a React Native project")
  .action((options) => {
    const platform = determinePlatform(options.reactNative);
    initCommand(platform);
  });

// Generate component command
program
  .command("g <folder> <component>")
  .description("Generate a new component for React or React Native")
  .option("-rn, --react-native", "Generate a component for React Native")
  .action((folder, component, options) => {
    const platform = determinePlatform(options.reactNative);
    generateCommand([folder, component, platform]);
  });

// Documentation command
program
  .command("docs")
  .description("Open CLI documentation")
  .action(() => {
    open("https://github.com/rvelocity/cli");
  });

// Parse the command-line arguments
program.parse(process.argv);
