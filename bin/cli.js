#!/usr/bin/env node
import { program } from "commander";
import open from "open";
import generateCommand from "../commands/generate.js";
// import initCommand from "../commands/init.js";

const figlet = `
  ____            _            _ _            ____ _     ___ 
 |  _ \__   _____| | ___   ___(_) |_ _   _   / ___| |   |_ _|
 | |_) \ \ / / _ \ |/ _ \ / __| | __| | | | | |   | |    | | 
 |  _ < \ V /  __/ | (_) | (__| | |_| |_| | | |___| |___ | | 
 |_| \_\ \_/ \___|_|\___/ \___|_|\__|\__, |  \____|_____|___|
`;

// program
//   .command("init")
//   .description("Initialize a new React or React Native project")
//   .option("-rn, --react-native", "Initialize a React Native project")
//   .action((options) => {
//     const platform = options.reactNative ? "react-native" : "react";
//     initCommand(platform);
//   });

program
  .command("g <folder> <component>")
  .description("Generate a new component for React or React Native")
  .option("-rn, --react-native", "Generate a component for React Native")
  .action((folder, component, options) => {
    const platform = options.reactNative ? "react-native" : "react";
    generateCommand([folder, component, platform]);
  });

program
  .command("docs")
  .description("Open CLI documentation")
  .action(() => {
    open("https://github.com/rvelocity/cli");
  });

program.parse(process.argv);
